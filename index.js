const app = require("express")();
const { getVersions, getLatest } = require("./versions");

const ts = () => parseInt(+new Date() / 1000);

app.get("/", async (req, res, next) => {
  try {
    const versions = await getVersions();
    const latest = getLatest(versions);
    res.json({ ts: ts(), latest, versions });
  } catch (err) {
    next(err);
  }
});

app.get("/latest", async (req, res, next) => {
  try {
    const versions = await getVersions();
    const latest = getLatest(versions);
    res.type("text").send(latest);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, err) => {
  res.status(500).json({ error: err.message ? err.message : "Unknown error" });
});

app.listen(5000);
