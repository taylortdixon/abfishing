import Head from "next/head";

type SeoHeadProps = {
  title: string;
  description: string;
  canonicalHref?: string;
};

export const SeoHead: React.FC<SeoHeadProps> = ({
  canonicalHref,
  title,
  description,
}) => {
  const fullTitle = `${title} | AB Fishing`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
    </Head>
  );
};
