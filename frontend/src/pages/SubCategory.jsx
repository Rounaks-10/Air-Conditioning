import { useParams } from "react-router-dom";
import Split_AC from "./Split_AC";
import Window_AC from "./Window_AC";
import Industrial_AC from "./Industrial_AC";
import Desert_air_purifiers from "./Desert_air_purifiers";
import Window_air_purifiers from "./Window_air_purifiers";
import Personal_air_purifiers from "./Personal_air_purifiers";
import Deep_ref from "./Deep_ref";
import Visi_ref from "./Visi_ref";
import Refrigerators from "./Refrigerators";

const SubCategory = () => {
  const { subcategory } = useParams();

  if (subcategory === "split-ac") return <Split_AC />;
  if (subcategory === "window-ac") return <Window_AC />;
  if (subcategory === "industrial-ac") return <Industrial_AC />;
  if (subcategory === "desert-air-coolers") return <Desert_air_purifiers />;
  if (subcategory === "window-air-coolers") return <Window_air_purifiers />;
  if (subcategory === "personal-air-coolers") return <Personal_air_purifiers />;
  if (subcategory === "deep-freezers") return <Deep_ref/>;
  if (subcategory === "visi-freezers") return <Visi_ref/>;
  if (subcategory === "refrigerators") return <Refrigerators/>;

  return <div>Category Not Found</div>;
};

export default SubCategory;