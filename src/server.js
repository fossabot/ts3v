const app = require("express")();
const getVersions = require("./versions");

app.get("/", async (_, res, next) => {
  try {
    const versions = await getVersions();
    res.json({ latest: versions[0], versions });
  } catch (err) {
    next(err);
  }
});

app.get("/latest", async (_, res, next) => {
  try {
    const versions = await getVersions();
    res.type("text").send(versions[0]);
  } catch (err) {
    next(err);
  }
});

app.use((_, res, err) => {
  console.error(err);
  res.status(500).json({ error: "Unknown error" });
});

app.listen(5000);
