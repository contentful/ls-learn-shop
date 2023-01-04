import get from "lodash/get";

import dynamic from "next/dynamic";
import ImageGallery from "../ImageGallery";
// import FaqItem from "../faqItem/FaqItem";
// import { ProductSlider } from "../productSlider";
import HeroBanner from "../HeroBanner/HeroBanner";
import SplitScreen from "../SplitScreen/SplitScreen";

const ProductSlider = dynamic(() => import("../productSlider/ProductSlider"), {
  ssr: false,
});

const FaqItem = dynamic(() => import("../faqItem/FaqItem"), {
  ssr: false,
});

// map content types to React components
const componentMap = {
  faqItem: { element: FaqItem },
  productSlider: { element: ProductSlider },
  heroBanner: { element: HeroBanner },
  splitScreen: { element: SplitScreen },
};

const Xray = dynamic(() => import("../Xray"), { ssr: false });
const FieldRenderer = (props) => {
  const entry = get(props, "entry");
  const entryId = get(entry, "sys.id");
  const contentTypeFromSysId = get(entry, "sys.contentType.sys.id");
  const contentType = contentTypeFromSysId
    ? contentTypeFromSysId
    : get(entry, "sys.type");
  const entryTitle = get(entry, "fields.title")
    ? get(entry, "fields.title")
    : get(entry, "fields.internalName");
  const fields = get(entry, "fields");
  const sections = get(fields, "sections");

  const Component = componentMap[contentType];

  if (!Component) {
    return null;
  }

  return (
    <>
      <div className="w-full h-full">
        <Component.element {...entry} />
      </div>
    </>
  );
};

export default FieldRenderer;
