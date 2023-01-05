import React from "react";
import dynamic from "next/dynamic";

import MainLayout from "@layouts/MainLayout";

const Page = () => {
  return <div>product list/catalogue </div>;
};
export const getStaticProps = ({ locale, locales }) => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

Page.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
