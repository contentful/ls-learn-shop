import get from "lodash/get";
import { useEffect, useState } from "react";
import Image from "next/image";

const MediaWrapper = (props) => {
  const classes = get(props, "classes");
  const contentType = get(props, "sys.contentType.sys.id");

  const fields = get(props, "fields");
  const asset = get(fields, "asset");
  const altText = get(fields, "altText");

  const assetUrl = get(asset, "fields.file.url");
  const assetWidth = get(asset, "fields.file.details.image.width");
  const assetHeight = get(asset, "fields.file.details.image.height");
  const assetType = get(asset, "fields.file.contentType");

  const [isImage, setIsImage] = useState(false);
  useEffect(() => {
    try {
      if (assetType.startsWith("image")) {
        setIsImage(true);
      }
    } catch (error) {}

    return () => {
      setIsImage(false);
    };
  }, [assetType]);
  if (!assetUrl) {
    return "..";
  }

  return (
    <div className="relative w-full h-full  min-w-full  p-2x overflow-hidden">
      {isImage ? (
        <div className="flex justify-center h-full ">
          <div className="rounded-lg   max-w-sm h-full ">
            {/* <img className={`${classes} `} src={`https:${assetUrl}`} alt="" /> */}
            <Image
              itemProp="image"
              className={`${classes} `}
              src={`https:${assetUrl}`}
              alt={altText}
              width={assetWidth}
              height={assetHeight}
              // layout="fill"
              // objectFit="contain"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MediaWrapper;
