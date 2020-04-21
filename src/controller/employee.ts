import * as express from "express";
import {
  controller,
  httpGet,
  BaseHttpController
} from "inversify-express-utils";
import { inject } from "inversify";
import { ElasticsearchService } from "../service/elasticsearch";
import TYPES from "../constant/types";
import { ApiResponse } from "@elastic/elasticsearch";

@controller("/employee")
export class EmployeeController extends BaseHttpController {
  private index = "directory_employees";

  constructor(
    @inject(TYPES.ElasticsearchService)
    private elasticsearchService: ElasticsearchService
  ) {
    super();
  }

  @httpGet("/search")
  public async search(req: express.Request) {
    const result: ApiResponse = await this.elasticsearchService.search(
      this.index,
      req.query.searchString.toString()
    );
    return this.json(result.body.hits);
  }
}
