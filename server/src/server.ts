import app from "./app";

const PORT = 3001;

const server = app.listen(PORT, () => {
  if (!server) {
    console.error(`Failed running the server on http://localhost:${PORT}/`);
  }

  console.log(`Server running on http://localhost:${PORT}/`);
});
