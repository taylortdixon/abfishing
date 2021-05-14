import { Waterbody } from "../../src/types/waterbody.type";

type StructuredDataColumn = {
  "csvw:name": string;
  "csvw:datatype": "string";
  "csvw:cells": Array<{
    "csvw:value": string;
    "csvw:primaryKey": string;
  }>;
};

type ColumnDefinition = {
  key: keyof Waterbody;
  name: string;
};

const columnDefinitions: ColumnDefinition[] = [
  {
    key: "waterbody",
    name: "Name",
  },
  {
    key: "waterbody_detail",
    name: "Description",
  },
  {
    key: "fish_management_zone",
    name: "Fish Management Zone",
  },
];

export const generateStructuredData = (
  version: string,
  regulations: Waterbody[]
) => {
  const columns = columnDefinitions.map<StructuredDataColumn>((definition) => ({
    "csvw:name": definition.name,
    "csvw:datatype": "string",
    "csvw:cells": regulations.map((reg) => ({
      "csvw:primaryKey": reg.id,
      "csvw:value": reg[definition.key].toString(),
    })),
  }));

  return {
    "@context": ["https://schema.org", { csvw: "http://www.w3.org/ns/csvw#" }],
    "@type": "Dataset",
    version: version,
    name: "Alberta Fishing Regulations",
    description:
      "Detailed 2021 fishing regulations for the province of Alberta for most named waterbodies.",
    mainEntity: {
      "@type": "csvw:Table",
      "csvw:tableSchema": {
        "csvw:columns": columns,
      },
    },
  };
};
