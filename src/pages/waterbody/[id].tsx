import { useRouter } from "next/router";
import App from "../../components/app/app";
import { waterbodyIds } from "../../waterbody-ids";
import dynamic from "next/dynamic";
import { Waterbody, WaterbodyGroup } from "../../types/waterbody.type";

const DynamicWaterbodyDetailsContent = dynamic(
  () =>
    import(
      "../../components/waterbody-details-content/waterbody-details-content"
    ),
  {
    loading: () => null,
  }
);

type Props = {
  waterbody: Waterbody;
  waterbodyGroup: WaterbodyGroup;
};

export default (props: Props) => {
  return (
    <App>
      {props.waterbody && (
        <DynamicWaterbodyDetailsContent
          waterbody={props.waterbody}
          waterbodyGroup={props.waterbodyGroup}
        />
      )}
    </App>
  );
};

type PathParams = { params: { id: string } };

// This function gets called at build time
export async function getStaticPaths() {
  const regulations = await import("../../fishing-regulations").then(
    (module) => module.regulations
  );

  const paths = regulations.map<PathParams>((regulation) => ({
    params: { id: regulation.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: PathParams) {
  const regulations = await import("../../fishing-regulations").then(
    (module) => module.regulations
  );

  const waterbodyGroups = await import("../../fishing-waterbody-groups").then(
    (module) => module.waterbodyGroups
  );

  const waterbody = regulations.find(
    (regulation) => regulation.id === params.id
  );

  if (!waterbody) {
    throw new Error(`Cannot find waterbody by param id ${params.id}`);
  }

  const [_, waterbodyGroup] =
    Object.entries(waterbodyGroups).find(
      ([_waterbodyGroupId, waterbodyGroup]) =>
        waterbodyGroup.waterbodies.some(
          (waterbodyGroupWaterbody) =>
            waterbodyGroupWaterbody.id === waterbody.id
        )
    ) || [];

  if (!waterbodyGroup) {
    throw new Error(`Unmatched waterbody group by id ${waterbody.id}`);
  }

  // Pass post data to the page via props
  return { props: { waterbody, waterbodyGroup } };
}
