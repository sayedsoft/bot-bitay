import { Module } from "@nestjs/common";
import { TestCommand } from "./test.commnds";
import { BotModule } from "src/bot/bot.module";
import { BotService } from "src/bot/bot.service";
import { ApiService } from "src/bot/api.service";

@Module({
  imports: [BotModule],
  controllers: [],
  providers: [TestCommand, ApiService, BotService],
  exports: [TestCommand],
})
export class CommandsModuleModule {}
