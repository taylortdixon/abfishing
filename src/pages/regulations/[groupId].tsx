import { useRouter } from "next/router";
import { Suspense } from "react";
import App from "../../components/app/app";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { WaterbodyGroupDetailsContent } from "../../components/waterbody-group-details-content/waterbody-group-details-content";
import { waterbodyGroups } from "../../fishing-regulations";

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

// This function gets called at build time
export async function getStaticPaths() {
  const groupIds = Object.keys(waterbodyGroups);

  const paths = groupIds.map((groupId) => ({ params: { groupId } }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({}) {
  // Pass post data to the page via props
  return { props: {} };
}
