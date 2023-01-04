import React, { useState } from "react";
import s from "./FaqItem.module.css";
import dynamic from "next/dynamic";
import _ from "lodash";
import Spacing from "../../layouts/Spacing";
const Xray = dynamic(() => import("../Xray"), { ssr: false });

const Collapse = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  if (!question) {
    return "";
  }

  return (
    <div
      className="w-full  flex flex-col border-2 rounded-md 
       text-black hover:bg-gray-50 dark:hover:bg-gray-100"
    >
      <div className="">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="flex justify-between items-center p-5 w-full font-medium text-left  "
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <span>{question}</span>
          <div
            className={`${open ? "rotate-180" : ""} transition-all delay-200 `}
          >
            <svg
              data-accordion-icon
              className="w-6 h-6 rotate-180 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>

      <div
        className={`${open ? "" : "hidden"} transition-all w-full h-full`}
        aria-labelledby=""
      >
        <div className="p-5   ">
          <p className="mb-2 text-black ">{answer}</p>
        </div>
      </div>
    </div>
  );
};
export default function FaqItem(entry) {
  const entryId = _.get(entry, "sys.id");
  const contentTypeFromSysId = _.get(entry, "sys.contentType.sys.id");
  const contentType = contentTypeFromSysId
    ? contentTypeFromSysId
    : _.get(entry, "sys.type");

  const fields = _.get(entry, "fields");
  const question = _.get(fields, "question");
  const answer = _.get(fields, "answer");

  const entryTitle = question ? question : _.get(entry, "fields.internalName");

  return (
    <Spacing>
      <div>
        <Xray
          contentType={contentType}
          entryId={entryId}
          entryTitle={entryTitle}
        >
          <div className="w-full   ">
            <Collapse question={question} answer={answer} />
          </div>
        </Xray>
      </div>
    </Spacing>
  );
}
