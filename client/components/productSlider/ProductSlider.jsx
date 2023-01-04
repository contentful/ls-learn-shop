import get from "lodash/get";
import dynamic from "next/dynamic";
import React from "react";
import Carousel from "./Carousel";

const Xray = dynamic(() => import("../Xray"), { ssr: false });

export default function ProductSlider(entry) {
  const entryId = get(entry, "sys.id");
  const contentTypeFromSysId = get(entry, "sys.contentType.sys.id");
  const contentType = contentTypeFromSysId
    ? contentTypeFromSysId
    : get(entry, "sys.type");

  const fields = get(entry, "fields");
  const headline = get(fields, "headline");
  const products = get(fields, "products");

  const entryTitle = headline ? headline : get(entry, "fields.internalName");

  if (!products) {
    return "";
  }
  return (
    <div className="p-4 flex flex-col overflow-hidden  ">
      <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
        <div className="relative w-full overflow-hidden  ">
          {/* {JSON.stringify(products)} */}

          <Carousel title={headline} items={products} />
        </div>
      </Xray>
    </div>
  );
}
