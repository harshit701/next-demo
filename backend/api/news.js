import fs from "node:fs/promises";
import { Router } from "express";

const newsRouter = Router();

newsRouter.get("/", async (req, res) => {
  let news = await fs.readFile("./data/news.json", "utf8");

  news = JSON.parse(news);

  const pageCount = Math.ceil(news.length / 10);
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  if (news) {
    res.status(200).json({
      page: page,
      pageCount: pageCount,
      news: news.slice(page * 10 - 10, page * 10),
    });
  } else {
    res.status(404).json({ message: "News Not found" });
  }
});

newsRouter.get("/:id", async (req, res) => {
  const news = await fs.readFile("./data/news.json", "utf8");
  const data = JSON.parse(news).find((news) => news.id === req.params.id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "News Not found" });
  }
});

export default newsRouter;
