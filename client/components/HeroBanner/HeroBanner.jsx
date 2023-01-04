import React, { useState } from "react";
import s from "./HeroBanner.module.css";
import dynamic from "next/dynamic";
import _ from "lodash";
import MediaWrapper from "../MediaWrapper";
import { mediaWrapperFieldStripper } from "../../lib/product/helpers";
import Link from "next/link";
import Image from "next/image";

const Xray = dynamic(() => import("../Xray"), { ssr: false });

export default function HeroBanner(entry) {
  const entryId = _.get(entry, "sys.id");
  const contentTypeFromSysId = _.get(entry, "sys.contentType.sys.id");
  const contentType = contentTypeFromSysId
    ? contentTypeFromSysId
    : _.get(entry, "sys.type");

  const fields = _.get(entry, "fields");
  const headline = _.get(fields, "headline");
  const subline = _.get(fields, "subline");
  const ctaText = _.get(fields, "ctaText");
  const image = _.get(fields, "image");
  const targetPage = _.get(fields, "targetPage");

  const entryTitle = headline ? headline : _.get(entry, "fields.internalName");

  const imageFields = mediaWrapperFieldStripper(image);
  const MINIMUM_HERO_HEIGHT = "500px";

  return (
    <>
      <div className="relative min-w-full bg-blau h-full lg:h-[550px] p-8 md:p-20 flex flex-row aspect-video">
        <Image
          style={{ height: MINIMUM_HERO_HEIGHT }}
          className={`z-0 `}
          height={imageFields.height || "100%"}
          width={imageFields.width || "100%"}
          src={`${imageFields.url}?fm=webp`}
          alt={``}
          layout="fill"
          objectFit="cover"
          objectPosition={"center"}
          quality={80}
          priority={true}
        />
        <div className="z-10 relative w-full lg:w-1/2 text-whitex  bg-opacity-90 bg-white  rounded-xl flex flex-col space-y-2 justify-items-center items-center justify-evenly text-center shadow-lg p-8">
          <h2 className="font-bold text-4xl">{headline}</h2>

          <p className="">{subline}</p>

          <Link href={"/"}>
            <a>
              <div className="bg-blaux bg-red-500 shadow-lg px-4 p-2 rounded-xl text-white">
                {ctaText}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div
      style={{ height: MINIMUM_HERO_HEIGHT }}
      className={`w-full  py-8x bg-blau `}
    >
      <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
        <div
          style={{
            width: "100%",
            height: MINIMUM_HERO_HEIGHT,
            backgroundImage: `url(${imageFields.url})`,
          }}
          className={`bg-blau   bg-contain bg-center min-h-fit bg-fixed flex flex-row text-center p-8 md:p-20`}
        >
          <div className="w-full lg:w-1/2 text-whitex  bg-opacity-90 bg-white  rounded-xl flex flex-col justify-items-center items-center justify-evenly text-center shadow-lg p-8">
            <h2 className="font-bold text-4xl">{headline}</h2>

            <h6 className="">{subline}</h6>

            <Link href={"/"}>
              <a>
                <div className="bg-blaux bg-red-500 shadow-lg px-4 p-2 rounded-xl text-white">
                  {ctaText}
                </div>
              </a>
            </Link>
          </div>
        </div>
      </Xray>
    </div>
  );
}
