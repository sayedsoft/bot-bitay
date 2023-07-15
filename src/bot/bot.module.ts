import { HttpCode, Module } from "@nestjs/common";
import { BotController } from "./bot.controller";
import { BotService } from "./bot.service";
import { ApiService } from "./api.service";
import { HttpModule } from "@nestjs/axios";
import { AccountService } from "./account.service";

@Module({
  imports: [HttpModule],
  controllers: [BotController],
  providers: [BotController, ApiService, BotService, AccountService],
  exports: [BotController, ApiService, BotService, AccountService],
})
export class BotModule {}
