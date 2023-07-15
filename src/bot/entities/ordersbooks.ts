import { TAccount, TOrderBooks } from "../types/types";
import _ = require("lodash");
export class OrderBooks {
  private orders: TOrderBooks;
  public constructor(orders: any) {
    this.orders = orders;
  }

  getAsks() {
    return this.orders.asks;
  }

  getBids() {
    return this.orders.bids;
  }

  getTotalAks() {
    let orders = this.getAsks();
    let orderTotal = 0;
    for (let i = 0; i < orders.length; i++) {
      orderTotal += orders[i][1];
    }
    return orderTotal;
  }

  getTotalBids() {
    let orders = this.getBids();
    let orderTotal = 0;
    for (let i = 0; i < orders.length; i++) {
      orderTotal += orders[i][1];
    }
    return orderTotal;
  }

  getOverview() {
    let asks = this.getAsks(), bids = this.getBids();
    return {
      asks: _.reverse(_.slice(asks, 0, 10)),
      bids: _.slice(bids, 0, 10),
      totalAsks: this.getTotalAks(),
      totalBids: this.getTotalBids(),
    };
  }
}
