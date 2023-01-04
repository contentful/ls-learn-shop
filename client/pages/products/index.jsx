import React from "react";

function index() {
  return <div>product list/catalogue </div>;
}
export const getStaticProps = ({ locale, locales }) => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export default index;
