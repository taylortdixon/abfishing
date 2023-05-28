import { useRouter } from "next/router";
import App from "../../components/app/app";
import dynamic from "next/dynamic";
import { WaterbodyGroup } from "../../types/waterbody.type";

const DynamicWaterbodyGroupDetailsContent = dynamic(
  () =>
    import(
      "../../components/waterbody-group-details-content/waterbody-group-details-content"
    ),
  {
    loading: () => null,
  }
);

type Props = {
  waterbodyGroup: WaterbodyGroup;
};

export default (props: Props) => {
  return (
    <App>
      {props.waterbodyGroup && (
        <DynamicWaterbodyGroupDetailsContent
          waterbodyGroup={props.waterbodyGroup}
        />
      )}
    </App>
  );
};

type PathParams = { params: { groupId: string } };

// This function gets called at build time
export async function getStaticPaths() {
  const waterbodyGroups = await import("../../fishing-waterbody-groups").then(
    (module) => module.waterbodyGroups
  );

  const paths = Object.keys(waterbodyGroups).map<PathParams>((groupId) => ({
    params: { groupId },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: PathParams) {
  const waterbodyGroups = await import("../../fishing-waterbody-groups").then(
    (module) => module.waterbodyGroups
  );

  // Pass post data to the page via props
  return { props: { waterbodyGroup: waterbodyGroups[params.groupId] } };
}
