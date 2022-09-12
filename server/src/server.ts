import express from "express";

// ECMAScript

const app = express();

const PORT = 3001;

app.get("/ads", (req, res) => {
  return res.send("Acessou Ads!");
});

const server = app.listen(PORT, () => {
  if (!server) {
    console.error(`Failed running the server on http://localhost:${PORT}/`);
  }

  console.log(`Server running on http://localhost:${PORT}/`);
});
