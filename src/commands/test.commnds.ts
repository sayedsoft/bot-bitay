import { BotService } from "./../bot/bot.service";
import { Command, Option, Positional } from "nestjs-command";
import { Injectable } from "@nestjs/common";
import MathLibs from "src/bot/helpers/math";
import { calculateAmount, generateRandomAmount } from "src/bot/helpers/helpers";

@Injectable()
export class TestCommand {
  public constructor(public botService: BotService) {
  }

  @Command({
    command: "test:test",
    describe: "Test",
  })
  async tester() {
    try {
      //const order = await this.botService.OrderBuyLimit(50, 0.00140);
      //console.log(order);

      //  const account = (await this.botService.getAccount()).getBalanceOf("CORD");
      //  console.log(account);

      let amount = generateRandomAmount(10, 300);
      let amountBase = calculateAmount(1000, 0.00140, false);
      const math = MathLibs.percentOf(20, 100);
      console.log(amountBase);
    } catch (error) {
      throw error;
    }

    return;
  }
}
