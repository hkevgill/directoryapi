import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import TYPES from "./constant/types";
import { ElasticsearchService } from "./service/elasticsearch";
import { LogService } from "./service/logservice";
import "./controller/employee";
import "./controller/department";
import morgan = require("morgan");
import cors = require("cors");
import { Application } from "express";
import dotenv = require("dotenv");

// load everything needed to the Container
const container: Container = new Container();
container
  .bind<ElasticsearchService>(TYPES.ElasticsearchService)
  .to(ElasticsearchService);
container.bind<LogService>(TYPES.LogService).to(LogService);

// start the server
const server: InversifyExpressServer = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  const logger = morgan("combined");
  app.use(logger);
  app.use(cors());
});

if (process.env.NODE_ENV === undefined) {
  dotenv.config();
}

const serverInstance: Application = server.build();
serverInstance.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);

  console.log(process.env);
});
