import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "nestjs-prisma";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(9850);
}
bootstrap();
