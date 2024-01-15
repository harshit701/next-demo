import fs from "node:fs/promises";
import { Router } from "express";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  let post = await fs.readFile("./data/post.json", "utf8");
  post = JSON.parse(post);

  let maxPostPerPage;

  if (req.query.maxPostPerPage) {
    maxPostPerPage = parseInt(req.query.maxPostPerPage);
  } else {
    maxPostPerPage = 5;
  }

  const pageCount = Math.ceil(post.length / maxPostPerPage);
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  if (post) {
    res.status(200).json({
      page: page,
      pageCount: pageCount,
      posts: post.slice(
        page * maxPostPerPage - maxPostPerPage,
        page * maxPostPerPage
      ),
    });
  } else {
    res.status(404).json({ message: "Post Not found" });
  }
});

postRouter.get("/:id", async (req, res) => {
  const post = await fs.readFile("./data/post.json", "utf8");
  const data = JSON.parse(post).find((post) => post.id === req.params.id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Post Not found" });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const post = await fs.readFile("./data/post.json", "utf8");
    const postData = JSON.parse(post);
    postData.push(req.body);

    await fs.writeFile("./data/post.json", JSON.stringify(postData));

    res.status(200).json(postData.find((item) => item.id === req.body.id));
  } catch (error) {
    res.status(500).json({ message: "Error while adding post!", error: error });
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const post = await fs.readFile("./data/post.json", "utf8");
    const postData = JSON.parse(post);

    const index = postData.findIndex((item) => item.id === req.params.id);
    postData[index] = req.body;

    await fs.writeFile("./data/post.json", JSON.stringify(postData));

    res.status(200).json(postData.find((item) => item.id === req.body.id));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating post!", error: error });
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const post = await fs.readFile("./data/post.json", "utf8");
    const postData = JSON.parse(post);

    const index = postData.findIndex((item) => item.id === req.params.id);
    postData.splice(index, 1);

    await fs.writeFile("./data/post.json", JSON.stringify(postData));

    res.status(200).json(postData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting post!", error: error });
  }
});

export default postRouter;
