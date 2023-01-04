import { AppContextProvider } from "../context/state";
import "keen-slider/keen-slider.min.css";
// import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import _ from "lodash";
import ErrorBoundary from "../components/shared/ErrorBoundary";

const MainLayout = dynamic(() => import("../layouts/MainLayout"), {
  ssr: false,
});

if (process.env.NODE_ENV === "production") {
  console.log("ENVIRONMENT", process.env.NODE_ENV);
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

function MyApp(props) {
  const { Component, pageProps } = props;

  const preview = _.get(pageProps, "preview");

  return (
    <AppContextProvider>
      <ErrorBoundary>
        <MainLayout preview={preview}>
          <Component {...pageProps} />
        </MainLayout>
      </ErrorBoundary>
    </AppContextProvider>
  );
}

export default MyApp;
