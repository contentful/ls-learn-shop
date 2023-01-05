import "keen-slider/keen-slider.min.css";
import "../styles/globals.css";
import { AppContextProvider } from "../context/state";

import _ from "lodash";
import ErrorBoundary from "../components/shared/ErrorBoundary";

// const MainLayout = dynamic(() => import("../layouts/MainLayout"), {
//   ssr: false,
// });

if (process.env.NODE_ENV === "production") {
  console.log("ENVIRONMENT", process.env.NODE_ENV);
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

function MyApp(props) {
  const { Component, pageProps } = props;

  const preview = _.get(pageProps, "preview");
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppContextProvider>
      <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
    </AppContextProvider>
  );
}

export default MyApp;
