import fs from "node:fs/promises";
import { Router } from "express";

const eventRouter = Router();

eventRouter.get("/", async (req, res) => {
  let event = await fs.readFile("./data/event.json", "utf8");
  event = JSON.parse(event);

  let maxEventPerPage;

  if (req.query.maxEventPerPage) {
    maxEventPerPage = parseInt(req.query.maxEventPerPage);
  } else {
    maxEventPerPage = 5;
  }

  const pageCount = Math.ceil(event.length / maxEventPerPage);
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  if (event) {
    res.status(200).json({
      page: page,
      pageCount: pageCount,
      events: event.slice(
        page * maxEventPerPage - maxEventPerPage,
        page * maxEventPerPage
      ),
    });
  } else {
    res.status(404).json({ message: "Event Not found" });
  }
});

eventRouter.get("/:id", async (req, res) => {
  const event = await fs.readFile("./data/event.json", "utf8");
  const data = JSON.parse(event).find((event) => event.id === req.params.id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Event Not found" });
  }
});

eventRouter.post("/", async (req, res) => {
  try {
    const event = await fs.readFile("./data/event.json", "utf8");
    const eventData = JSON.parse(event);
    eventData.push(req.body);

    await fs.writeFile("./data/event.json", JSON.stringify(eventData));

    res.status(200).json(eventData.find((item) => item.id === req.body.id));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while adding event!", error: error });
  }
});

export default eventRouter;
