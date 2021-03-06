import "dotenv/config";
import cors from "cors";
import express from "express";
import pino from "pino-http";

import sequelize from "./models";
import { populateDB } from "./helpers";

import routes from "./routes";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, _, next) => {
  req.context = {
    models: sequelize.models,
  };
  next();
});

app.use(pino());

app.use("/recipes", routes.recipes);

app.use("/ingredients", routes.ingredients);

app.use("/categories", routes.categories);

app.all("*", (_, res) => {
  res.sendStatus(404);
});

// force -> reset database on start
sequelize.sync({ force: true }).then(() => {
  const port = process.env.PORT ? process.env.PORT : 3000;
  app.listen(port, () => {
    populateDB().then(() => {
      console.log(`Example app listening on port ${port}!`);
    });
  });
});
