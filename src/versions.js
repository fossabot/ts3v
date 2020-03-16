const fetch = require("node-fetch");
const { load } = require("cheerio");
const { rcompare } = require("semver");

const HTTP_MIRROR = "https://files.teamspeak-services.com/releases/server/";

module.exports = async () => {
  const response = await fetch(HTTP_MIRROR);
  if (!response.ok) {
    throw new Error("Could not access mirror.");
  }
  const html = await response.text();
  const $ = load(html);

  const versionElements = Array.from($('[href^="3."]'));
  if (!versionElements || !versionElements.length) {
    throw new Error("Could not read version list.");
  }

  const versions = versionElements
    .map(v =>
      $(v)
        .text()
        .replace(/\//g, "")
    )
    .sort(rcompare);

  return versions;
};
