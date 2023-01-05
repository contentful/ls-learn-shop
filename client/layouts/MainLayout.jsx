import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSharedState } from "../context/state";
import _ from "lodash";
import { Switch, Select } from "@contentful/f36-components";

const countryResolver = (code) => {
  switch (code) {
    case "en-US":
      return "English";
      break;
    case "de":
      return "German";
      break;
    case "fr":
      return "French";
      break;
    case "pcm":
      return "Pidgin English";
      break;

    default:
      return "English";
      break;
  }
};

const MainLayout = (props) => {
  const [showLocalePicker, setShowLocalePicker] = useState(false);
  const router = useRouter();
  const { locales, locale: activeLocale, pathname, query, asPath } = router;

  const [otherLocales, setOtherLocales] = useState(["en-US"]);

  const sharedContext = useSharedState();
  const setXrayMode = _.get(sharedContext, "setXrayMode");
  const xrayMode = _.get(sharedContext, "xrayMode");
  const [selectLocale, setSelectLocale] = useState("");

  // const preview = _.get(props, "preview");
  const preview = props?.children?.props?.preview;

  useEffect(() => {
    setOtherLocales(locales.filter((locale) => locale !== activeLocale));

    return () => {};
  }, [activeLocale, locales]);

  const changeLocale = useCallback((e) => {
    e.preventDefault();
    router.push({ pathname, query }, asPath, {
      locale: e.target.value,
    });
  }, []);

  console.log("useSharedState", props);
  const handleExitPreview = () => {
    router.push("/api/exit-preview");
  };
  const handlesetXrayMode = () => {
    setXrayMode((prev) => !prev);
  };

  const toggleLocalePicker = () => {
    setShowLocalePicker(!showLocalePicker);
  };

  return (
    <>
      <div className="mt-4x  bg-opacity-90 bg-blau4 top-0 z-50 w-full lg:fixed text-white flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between p-4 border-b-2">
        <Link href="/">Home</Link>

        <div className="flex flex-row space-x-2">
          {preview ? (
            <div className="bg-white p-2 rounded-lg shadow-lg ">
              <Switch
                name="toggle-xray-mode"
                id="toggle-xray-mode"
                isChecked={preview}
                onClick={handleExitPreview}
              >
                Preview mode
              </Switch>
            </div>
          ) : (
            ""
          )}
          <div className="">
            <LocaleSelector
              id={"nav-top-selector"}
              locales={locales}
              activeLocale={activeLocale}
              changeLocale={changeLocale}
            />
          </div>
          <div className="bg-white p-2 rounded-lg shadow-lg ">
            <Switch
              name="toggle-xray-mode"
              id="toggle-xray-mode"
              isChecked={xrayMode}
              onClick={handlesetXrayMode}
            >
              Xray
            </Switch>
          </div>
        </div>
      </div>

      <main>
        <div className="top-0 pb-40 lg:mt-16  min-h-[800px] relative">
          {" "}
          {props.children}
        </div>
      </main>
      <div className="mt-4 p-2  bg-blau text-white flex flex-row justify-between  px-10 overflow-hiddenx">
        <a
          href="https://training.contentful.com"
          target="_blank"
          rel="noreferrer"
        >
          Contentful Learning Services
        </a>

        <div className="">
          <LocaleSelector
            id={"nav-bottom-selector"}
            locales={locales}
            activeLocale={activeLocale}
            changeLocale={changeLocale}
          />
        </div>
      </div>
    </>
  );
};

const LocaleSelector = ({ locales, activeLocale, changeLocale, id }) => {
  return (
    <Select
      id={id}
      name="locale-select-controlled"
      value={activeLocale}
      onChange={changeLocale}
    >
      {locales.map((loc) => {
        return (
          <Select.Option key={loc} value={loc}>
            {countryResolver(loc)}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default MainLayout;
