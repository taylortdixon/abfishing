import { useRouter } from "next/router";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import App from "../../components/app/app";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { WaterbodyDetailsContent } from "./waterbody-details-content";

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
