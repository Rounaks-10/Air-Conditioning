import { useParams } from "react-router-dom";
import Split_AC from "./Split_AC";
import Window_AC from "./Window_AC";
import Industrial_AC from "./Industrial_AC";

const SubCategory = () => {
  const { subcategory } = useParams();

  if (subcategory === "split-ac") return <Split_AC />;
  if (subcategory === "window-ac") return <Window_AC />;
  if (subcategory === "industrial-ac") return <Industrial_AC />;

  return <div>Category Not Found</div>;
};

export default SubCategory;