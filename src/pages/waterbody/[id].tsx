import { useRouter } from "next/router";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import App from "../../components/app/app";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { WaterbodyDetailsContent } from "../../components/waterbody-details-content/waterbody-details-content";
import { regulations } from "../../fishing-regulations";

export default () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <App>
      <Suspense fallback={<SiteLoader />}>
        {id && <WaterbodyDetailsContent waterbodyId={id} />}
      </Suspense>
    </App>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  const waterbodyIds = regulations.map((regulation) => regulation.id);

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
