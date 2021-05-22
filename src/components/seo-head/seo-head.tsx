import { Helmet } from "react-helmet";
import { useSelectedWaterbody } from "../../utils/hooks";

export const SeoHead: React.VFC<{ selectedId: string | undefined }> = ({
  selectedId,
}) => {
  const selectedWaterbody = useSelectedWaterbody(selectedId);

  if (!selectedWaterbody) {
    return (
      <Helmet>
        <title>Alberta Fishing Regulations | AB Fishing</title>
        <meta
          name="description"
          content="Search the fishing regulations for any lake or river in Alberta."
        />
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>
        {selectedWaterbody.waterbody} - {selectedWaterbody.fish_management_zone}{" "}
        | AB Fishing
      </title>
      <meta
        name="description"
        content={`Search the fishing regulations for ${selectedWaterbody.waterbody}. ${selectedWaterbody.season}. ${selectedWaterbody.waterbody_detail}`}
      />
    </Helmet>
  );
};

export default SeoHead;
