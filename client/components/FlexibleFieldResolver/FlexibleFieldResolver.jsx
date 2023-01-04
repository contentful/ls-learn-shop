import get from "lodash/get";
// import Xray from "./Xray";
import dynamic from "next/dynamic";
import FieldRenderer from "./FieldRenderer";

const Xray = dynamic(() => import("../Xray"), { ssr: false });
const FlexibleFieldResolver = (props) => {
  const field = get(props, "field");

  return (
    <>
      <div className="space-y-4 w-full  min-h-max ">
        {Array.isArray(field)
          ? field.map((entry, index) => {
              const entryId = get(entry, "sys.id");
              console.log("FieldRenderer", entry);
              return (
                <FieldRenderer key={`key-${entryId}-${index}`} entry={entry} />
              );
            })
          : ""}
      </div>
    </>
  );
};

export default FlexibleFieldResolver;
