const app = require("express")();
const getVersions = require("./versions");

app.get("/", async (_, res, next) => {
  try {
    const versions = await getVersions();
    res.json({ latest: versions[0], versions });
  } catch (err) {
    console.log(err);
    next();
  }
});

app.get("/latest", async (_, res, next) => {
  try {
    const versions = await getVersions();
    res.type("text").send(versions[0]);
  } catch (err) {
    console.error(err);
    next();
  }
});

app.use((_, res) => {
  res.status(500).json({ error: "Unknown error" });
});

app.listen(5000);
