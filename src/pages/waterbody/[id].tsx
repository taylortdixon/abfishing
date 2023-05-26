import { useRouter } from "next/router";
import App from "../../components/app/app";
import { waterbodyIds } from "../../waterbody-ids";
import dynamic from "next/dynamic";

const DynamicWaterbodyDetailsContent = dynamic(
  () =>
    import(
      "../../components/waterbody-details-content/waterbody-details-content"
    ),
  {
    loading: () => null,
  }
);

export default () => {
  const router = useRouter();
  const id = router.query.id as string;

  return <App>{id && <DynamicWaterbodyDetailsContent waterbodyId={id} />}</App>;
};

// This function gets called at build time
export async function getStaticPaths() {
  const paths = waterbodyIds.map((id) => ({ params: { id } }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({}) {
  // Pass post data to the page via props
  return { props: {} };
}
