import { Global, Module } from "@nestjs/common";
import { TruevoService } from "./truevo.service";
import { TruevoController } from "./truevo.controller";
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [TruevoService],
    controllers: [TruevoController],
})
export class TruevoModule {}
