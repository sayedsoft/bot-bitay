import { Injectable } from "@nestjs/common";
import { ApiService } from "./api.service";
import { AccountService } from "./account.service";
import { Account } from "./entities/account";
import { TTrade } from "./types/types";
import { OrderBooks } from "./entities/ordersbooks";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import {
  calculateAmount,
  generateRandomAmount,
  sleep,
} from "./helpers/helpers";

@Injectable()
export class BotService {
  public assets = ["CORD", "USDT"];
  public price: number;
  public constructor(
    public api: ApiService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
  }

  async getAccount() {
    let _a = await this.api.getAccount();
    return new Account(_a.data);
  }

  async getTrades(symbol: "CORD_USDT") {
    let _trades = await this.api.getTrades(symbol);
    const trades: TTrade[] = [];
    for (let i = 0; i < _trades.length; i++) {
      trades.push(_trades[i]);
    }
    return trades;
  }

  async getOrderBooks(symbol: "CORD_USDT") {
    let orders = await this.api.getOrderBooks(symbol);
    return new OrderBooks(orders);
  }

  async OrderBuyLimit(quantity: number, price: number) {
    let order = await this.api.order(
      "BUY",
      quantity,
      price,
      "CORDUSDT",
      "LIMIT",
    );
    return order;
  }

  async OrderSellLimit(quantity: number, price: number) {
    let order = await this.api.order(
      "SELL",
      quantity,
      price,
      "CORDUSDT",
      "LIMIT",
    );
    return order;
  }

  async getLastPrice() {
    const orders = await this.getOrderBooks("CORD_USDT");
    const askes = orders.getAsks();
    let lastAsks;
    if (askes.length > 0) lastAsks = askes[0];
    else return null;
    return lastAsks[0];
  }

  //  @Cron(CronExpression.EVERY_MINUTE)
  @Cron("*/1 * * * *")
  async buyOrders() {
    try {
      let price = await this.getLastPrice();
      if (!price) {
        console.log("Price not getting");
        return;
      }
      await sleep(generateRandomAmount(90, 330));
      let amountBuy = generateRandomAmount(1, 4);
      this.OrderBuyLimit(amountBuy, price);
      console.log("New order Buy: price " + price + "amount: " + amountBuy);
      await sleep(generateRandomAmount(1, 4));
    } catch (error) {
      console.error(error);
    }
  }

  @Cron("*/1 * * * *")
  async sellOrders() {
    try {
      let price = await this.getLastPrice();
      if (!price) {
        console.log("Price not getting");
        return;
      }
      await sleep(generateRandomAmount(150, 230));
      let amountSell = generateRandomAmount(1, 4);
      this.OrderSellLimit(amountSell, price);
      console.log("New order Sell: price " + price + "amount: " + amountSell);
      await sleep(generateRandomAmount(1, 4));
    } catch (error) {
    }
  }
}
