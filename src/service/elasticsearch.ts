import { Client, ApiResponse } from "@elastic/elasticsearch";
import { injectable, inject } from "inversify";
import { LogService } from "./logservice";
import TYPES from "../constant/types";

/**
 * InversifyJS doesn't support making 3rd party classes injectable. This class acts as a facade
 * around the 3rd party Elasticsearch client class and is made injectable.
 */
@injectable()
export class ElasticsearchService {
  private _rawClient: Client;
  private _hosts: string[];

  constructor(
    @inject(TYPES.LogService)
    private log: LogService
  ) {
    this._hosts = process.env.ELASTICSEARCH_HOSTS.split(" ");
    this._rawClient = new Client({
      nodes: this._hosts,
    });
  }

  public async createIndex(index: string): Promise<ApiResponse<any, any>> {
    return await this._rawClient.indices.create({ index });
  }

  public async index(
    index: string,
    body: object
  ): Promise<ApiResponse<any, any>> {
    return await this._rawClient.index({ index: index, body: body });
  }

  public async search(
    index: string,
    searchString: string
  ): Promise<ApiResponse<any, any>> {
    this.log.info('Searching for: ' + searchString);
    const body: object = this.buildMultiMatchQuery(searchString);
    return await this._rawClient.search({ index: index, body: body });
  }

  private buildMultiMatchQuery(searchString: string): object {
    const multiMatchQuery: object = {
      query: {
        multi_match: {
          query: searchString,
          fields: [],
          type: "cross_fields",
          operator: "AND",
          slop: 0,
          prefix_length: 0,
          max_expansions: 50,
          zero_terms_query: "NONE",
          auto_generate_synonyms_phrase_query: true,
          fuzzy_transpositions: true,
          boost: 1,
        },
      },
    };

    return multiMatchQuery;
  }
}
