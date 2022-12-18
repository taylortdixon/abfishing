import { Helmet } from "react-helmet";

type SeoHeadProps = {
  title: string;
  description: string;
};

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title} | AB Fishing</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} data-react-helmet="true" />
      <meta
        property="og:description"
        content={description}
        data-react-helmet="true"
      />
    </Helmet>
  );
};
