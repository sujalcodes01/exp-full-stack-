const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/info", (_req, res) => {
  res.json({
    experiment: "3.2.3",
    aim: "AWS deployment with load balancing and auto-scaling",
    hostname: os.hostname(),
    awsRegion: process.env.AWS_REGION || "unknown",
    environment: process.env.NODE_ENV || "production"
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
