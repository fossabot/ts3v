const app = require("express")();
const getVersions = require("./versions");

app.use((_, res, next) => {
  res.set('Cache-Control', 's-maxage=1800, stale-while-revalidate');
  next();
});

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

app.use((_, res, __, err) => {
  console.error(err);
  res.status(500).json({ error: "Unknown error" });
});

app.listen(5000);
