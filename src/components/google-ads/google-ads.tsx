import { useEffect } from "react";

export type GoogleAdsProps = {
  slot: string;
  style: React.CSSProperties | undefined;
  fullWidthResponsive?: boolean;
  format?: "auto";
};

const CLIENT_ID = "ca-pub-6777086735488213";

export const GoogleAds: React.VFC<GoogleAdsProps> = ({
  format,
  fullWidthResponsive,
  slot,
  style,
}) => {
  useEffect(() => {
    // @ts-ignore
    (adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive}
      ></ins>
    </div>
  );
};
