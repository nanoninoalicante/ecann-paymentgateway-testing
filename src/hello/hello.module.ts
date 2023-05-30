import { Global, Module } from "@nestjs/common";
import { HelloService } from "./hello.service";
import { HelloController } from "./hello.controller";
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [HelloService],
    controllers: [HelloController],
    exports: [HelloService],
})
export class HelloModule {}
