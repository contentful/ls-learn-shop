import React from "react";
import get from "lodash/get";
import MediaWrapper from "../MediaWrapper";
import Link from "next/link";
import Spacing from "../../layouts/Spacing";
import Xray from "../Xray";

function SplitScreen(entry) {
  const headline = get(entry, "fields.headline");
  const subline = get(entry, "fields.subline");
  const contentAlignment = get(entry, "fields.contentAlignment");

  const ctaText = get(entry, "fields.ctaText");
  const ctaTarget = get(entry, "fields.ctaTarget");
  const image = get(entry, "fields.image");
  const additionalImage = get(entry, "fields.additionalImage");

  const entryId = get(entry, "sys.id");
  const contentTypeFromSysId = get(entry, "sys.contentType.sys.id");
  const contentType = contentTypeFromSysId
    ? contentTypeFromSysId
    : get(entry, "sys.type");

  const entryTitle = get(entry, "fields.internalName");

  if (false) {
    return <div> EMpty </div>;
  }
  return (
    <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
      <Spacing>
        <div className="hidden lg:block overflow-hidden mt-20 w-full  bg-rot bg-opacity-40 shadow-lg h-full ">
          {/* {JSON.stringify(additionalImage)} */}
          <div className="w-full h-[450px] flex flex-row justify-evenly items-center justify-items-center ">
            <div className="">
              <div className="w-80 ">
                <MediaWrapper {...image} />
              </div>
            </div>
            <div
              className={`w-fullx flex-1 ${
                contentAlignment === "right"
                  ? "order-last"
                  : contentAlignment === "left"
                  ? "order-first"
                  : ""
              }  flex-grow text-center flex flex-col justify-evenly space-y-4`}
            >
              <p className="text-3xl font-bold ">{headline}</p>
              {subline ? <p className="">{subline}</p> : ""}

              {ctaTarget ? (
                <Link href={`${ctaTarget}`}>
                  <span className="p-2 bg-blau text-white rounded-lg shadow-lg animate-bounce">
                    {ctaText}
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>
            {additionalImage ? (
              <div className="">
                <div className="w-80">
                  <MediaWrapper {...additionalImage} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* on mobile */}
        <div className="lg:hidden flex flex-col justify-around  items-center rounded-xl shadow-xl overflow-hidden bg-rot">
          <div className="h-full">
            <div className="w-60x">
              <MediaWrapper {...image} />
            </div>
          </div>
          <div className="h-full flex flex-col w-full  space-y-2 items-center text-white">
            <p className="text-2xl font-bold ">{headline}</p>
            <p className="">{subline}</p>
            <div className="p-6">
              <Link href={`${ctaTarget}`}>
                <span className="p-2 bg-blau text-white rounded-lg shadow-lg animate-bounce">
                  {ctaText}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Spacing>
    </Xray>
  );
}

export default SplitScreen;
