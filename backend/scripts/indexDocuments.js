import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import qdrant from "../vector-db/qdrant.js";
import { createEmbedding } from "../services/embedding.service.js";

function chunkText(text, chunkSize = 500) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}

async function extractPdfText(filePath) {
  const data = new Uint8Array(
    fs.readFileSync(filePath)
  );

  const pdf = await pdfjsLib.getDocument({
    data,
  }).promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const content =
      await page.getTextContent();

    const pageText = content.items
      .map((item) => item.str)
      .join(" ");

    text += pageText + "\n";
  }

  return text;
}

async function indexDocuments() {
  const documentsFolder =
    path.join(process.cwd(), "documents");

  const files =
    fs.readdirSync(documentsFolder);

  const points = [];

  for (const file of files) {
    if (!file.endsWith(".pdf")) continue;

    console.log(`Reading ${file}`);

    const filePath =
      path.join(documentsFolder, file);

    const text =
      await extractPdfText(filePath);

    const chunks =
      chunkText(text);

    console.log(
      `${file}: ${chunks.length} chunks`
    );

    for (const chunk of chunks) {
      if (!chunk.trim()) continue;

      const vector =
        await createEmbedding(chunk);

      points.push({
        id: uuidv4(),

        vector,

        payload: {
          type: "document",
          source: file,
          text: chunk,
        },
      });
    }
  }

  console.log(
    "Total chunks:",
    points.length
  );

  if (points.length === 0) {
    console.log(
      "No document chunks found"
    );
    return;
  }

  await qdrant.upsert(
    "ac_knowledge",
    {
      points,
    }
  );

  console.log(
    "Documents Indexed Successfully"
  );
}

indexDocuments()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });