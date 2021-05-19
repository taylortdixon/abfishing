import { Helmet } from "react-helmet";
import { Waterbody } from "../../types/waterbody.type";

export const SeoHead: React.VFC<{ selectedWaterbody: Waterbody | undefined }> =
  ({ selectedWaterbody }) => {
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
          {selectedWaterbody.waterbody} -{" "}
          {selectedWaterbody.fish_management_zone} | AB Fishing
        </title>
        <meta
          name="description"
          content={`Search the fishing regulations for ${selectedWaterbody.waterbody}. ${selectedWaterbody.season}. ${selectedWaterbody.waterbody_detail}`}
        />
      </Helmet>
    );
  };
