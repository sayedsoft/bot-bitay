import { AccountService } from "./bot/account.service";
import { BotService } from "./bot/bot.service";
import { BotController } from "./bot/bot.controller";
import { BotModule } from "./bot/bot.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpModule } from "@nestjs/axios";
import { CommandModule } from "nestjs-command";
import { TestCommand } from "./commands/test.commnds";
import { PrismaModule } from "nestjs-prisma";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bull";

@Module({
  imports: [
    BotModule,
    HttpModule,
    CommandModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),

    BullModule.registerQueue({
      name: "audio",
    }),
  ],
  controllers: [
    BotController,
    AppController,
  ],
  providers: [
    AccountService,
    TestCommand,
    AppService,
  ],
})
export class AppModule {}
