import { expect } from "chai";
import { DepartmentController } from "../../controller/department";
import { ElasticsearchService } from "../../service/elasticsearch";

describe("DepartmentController", () => {
  let controller;

  beforeEach(() => {
    controller = new DepartmentController(new ElasticsearchService());
  });

  it("should get back all user", () => {
    expect(controller.getUsers()).to.deep.equal([
      {
        email: "lorem@ipsum.com",
        name: "Lorem"
      },
      {
        email: "doloe@sit.com",
        name: "Dolor"
      }
    ]);
  });

  it("should give back the right user", () => {
    expect(
      controller.getUser({
        params: {
          id: "Lorem"
        }
      })
    ).to.deep.equal({
      email: "lorem@ipsum.com",
      name: "Lorem"
    });
  });

  it("should add a new user", () => {
    expect(controller.getUsers()).to.have.length(2);
    expect(
      controller.newUser({
        body: {
          email: "test@test.com",
          name: "test"
        }
      })
    ).to.deep.equal({
      email: "test@test.com",
      name: "test"
    });
    expect(controller.getUsers()).to.have.length(3);
  });

  it("should update a existing user", () => {
    expect(
      controller.updateUser({
        body: {
          email: "changed@changed.com",
          name: "Lorem"
        },
        params: {
          id: "Lorem"
        }
      })
    ).to.deep.equal({
      email: "changed@changed.com",
      name: "Lorem"
    });
  });

  it("should delete a user", () => {
    expect(controller.getUsers()).to.have.length(2);
    expect(
      controller.deleteUser({
        params: {
          id: "Lorem"
        }
      })
    ).to.equal("Lorem");
    expect(controller.getUsers()).to.have.length(1);
  });
});
