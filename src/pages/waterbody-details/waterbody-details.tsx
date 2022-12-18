import { Suspense } from "react";
import { useParams } from "react-router-dom";
import SeoHead from "../../components/seo-head/seo-head";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { WaterbodyDetailsContent } from "./waterbody-details-content";

type UrlParams = {
  id?: string;
};

export const WaterbodyDetailsPage = () => {
  const params = useParams<UrlParams>();

  return (
    <>
      <Suspense fallback={<SiteLoader />}>
        {params.id && <WaterbodyDetailsContent waterbodyId={params.id} />}
      </Suspense>
      <Suspense fallback={<SiteLoader />}>
        <SeoHead selectedId={params.id} waterbodyGroupId={undefined} />
      </Suspense>
    </>
  );
};
