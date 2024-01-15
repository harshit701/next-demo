import bodyParser from "body-parser";
import express from "express";
import newsRouter from "./api/news.js";
import eventRouter from "./api/event.js";
import postRouter from "./api/post.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/news", newsRouter);
app.use("/event", eventRouter);
app.use("/post", postRouter);

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT}`);
});
