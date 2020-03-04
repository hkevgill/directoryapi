import { expect } from "chai";
import { ElasticsearchService } from "../../service/elasticsearch";

describe("ElasticsearchService", () => {
  let service;

  beforeEach(() => {
    service = new ElasticsearchService();
  });

  it("should get back 1 employee", () => {
    return expect(
      service.search("directory_employees", "Kevin Gill")
    ).to.eventually.be.fulfilled.then(result => {
      expect(result.total.value).to.equal(1);
    });
  });
});
