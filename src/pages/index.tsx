import dynamic from "next/dynamic";
import App from "../components/app/app";
import { SiteLoader } from "../components/site-loader/site-loader";

const DynamicWaterbodyListPage = dynamic(
  () => import("../components/waterbody-list/waterbody-list"),
  {
    loading: SiteLoader,
  }
);

export default () => (
  <App>
    <DynamicWaterbodyListPage />
  </App>
);
