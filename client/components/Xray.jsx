import { Badge, Card, Menu } from "@contentful/f36-components";

import get from "lodash/get";
import { useRouter } from "next/router";
import { useSharedState } from "../context/state";
const Xray = (props) => {
  const sharedContext = useSharedState();
  console.log("sharedContext", sharedContext);

  const xrayMode = get(sharedContext, "xrayMode"); //xray mode? from shared state
  const router = useRouter();

  // if not xray mode
  if (!xrayMode) {
    return <>{props.children}</>;
  }

  const entryId = get(props, "entryId");
  const contentType = get(props, "contentType");
  const entryTitle = get(props, "entryTitle");

  let url = `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_ENVIRONMENT}`;

  url = `${url}/entries/${entryId}`;
  return (
    <div
      key={entryId}
      className="lg:p-8 bg-gray-100 mb-4 w-full flex flex-col 
    items-center"
    >
      <Card
        title={contentType}
        isHovered
        badge={<Badge variant="primary">{entryTitle}</Badge>}
        actions={[
          <Menu.Item as="a" href={url} target="_blank" key="view">
            View in Contentful
          </Menu.Item>,
        ]}
      >
        {props.children}
      </Card>
    </div>
  );
};

export default Xray;
