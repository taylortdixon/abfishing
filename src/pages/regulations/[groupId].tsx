import { useRouter } from "next/router";
import { Suspense } from "react";
import App from "../../components/app/app";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { WaterbodyGroupDetailsContent } from "./waterbody-group-details-content";

export default () => {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  return (
    <App>
      <Suspense fallback={<SiteLoader />}>
        {groupId && <WaterbodyGroupDetailsContent waterbodyGroupId={groupId} />}
      </Suspense>
    </App>
  );
};
