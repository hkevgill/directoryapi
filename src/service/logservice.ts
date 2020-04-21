import { injectable } from "inversify";
import "reflect-metadata";
const bunyan = require("bunyan");

@injectable()
export class LogService {
  private _log: any;
  constructor() {
    this._log = bunyan.createLogger({ name: "directoryapi" });
  }

  public async info(msg: string) {
    this._log.info(msg);
  }

  public async error(msg: string) {
    this._log.error(msg);
  }

  public async debug(msg: string) {
    this._log.debug(msg);
  }

  public async trace(msg: string) {
    this._log.trace(msg);
  }

  public async warn(msg: string) {
    this._log.warn(msg);
  }
}
