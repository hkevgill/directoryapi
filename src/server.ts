import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import TYPES from "./constant/types";
import { ElasticsearchService } from "./service/elasticsearch";
import "./controller/employee";
import "./controller/department";
import morgan = require("morgan");
import cors = require("cors");


// load everything needed to the Container
let container = new Container();
container
  .bind<ElasticsearchService>(TYPES.ElasticsearchService)
  .to(ElasticsearchService);

// start the server
let server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  let logger = morgan("combined");
  app.use(logger);
  app.use(cors());
});

if (process.env.NODE_ENV === undefined) {
  require('dotenv').config();
}

let serverInstance = server.build();
serverInstance.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});