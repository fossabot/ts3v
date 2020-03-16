const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { rcompare } = require("semver");

const FTP_MIRROR = "https://files.teamspeak-services.com/releases/server/";

module.exports = {
  getVersions: async () => {
    const response = await fetch(FTP_MIRROR);
    if (!response.ok) {
      throw new Error("Could not access mirror.");
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const versions = Array.from($('[href^="3."]'))
      .map(v =>
        $(v)
          .text()
          .replace(/\//g, "")
      )
      .sort(rcompare);
    if (!versions || !versions.length) {
      throw new Error("Could not read version list.");
    }

    return versions;
  },
  getLatest: versions => (versions && versions.length ? versions.sort(rcompare)[0] : null)
};
