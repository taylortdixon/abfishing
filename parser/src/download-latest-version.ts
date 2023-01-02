import { createWriteStream } from "fs";
import { get } from "https";

const REMOTE_URL = "https://albertaregulations.ca/fishingregs";

export const downloadLatestVersion = (
  versionFileName: string,
  regulationsFolder: string
) => {
  return new Promise((resolve, reject) => {
    const remoteFileLocation = `${REMOTE_URL}/${versionFileName}`;
    const localFilePath = `${regulationsFolder}/${versionFileName}`;

    get(remoteFileLocation, (res) => {
      if (res.statusCode !== 200) {
        return reject(`Regulations file not found: ${remoteFileLocation}`);
      }

      const stream = createWriteStream(localFilePath);

      res.pipe(stream);
      stream.on("finish", () => {
        stream.close();
        resolve(true);
      });

      stream.on("error", () => {
        stream.close();
        reject(`Encountered error writing file: ${localFilePath}`);
      });
    });
  });
};
