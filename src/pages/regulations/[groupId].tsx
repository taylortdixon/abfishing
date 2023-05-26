import { useRouter } from "next/router";
import App from "../../components/app/app";
import { waterbodyGroupIds } from "../../waterbody-group-ids";
import dynamic from "next/dynamic";

const DynamicWaterbodyGroupDetailsContent = dynamic(
  () =>
    import(
      "../../components/waterbody-group-details-content/waterbody-group-details-content"
    ),
  {
    loading: () => null,
  }
);

export default () => {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  return (
    <App>
      {groupId && (
        <DynamicWaterbodyGroupDetailsContent waterbodyGroupId={groupId} />
      )}
    </App>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  const paths = waterbodyGroupIds.map((groupId) => ({ params: { groupId } }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({}) {
  // Pass post data to the page via props
  return { props: {} };
}
