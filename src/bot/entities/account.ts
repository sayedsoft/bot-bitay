import { TAccount } from "../types/types";
import _ = require("lodash");
export class Account {
  private account: TAccount;
  public constructor(account: any) {
    this.account = account;
  }

  getBalanceOf(asset) {
    let balanaces = this.account.balances;
    let balanace = _.find(balanaces, function (b) {
      return b.asset == asset;
    });
    if (balanace) return balanace.free;
    throw new Error("asset not found");
  }

  getAccount() {
    return this.account;
  }
}
