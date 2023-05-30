import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HelloModule } from "./hello/hello.module";
import { ConfigModule } from "@nestjs/config";
import { TruevoModule } from './truevo/truevo.module';
@Module({
    imports: [
        HelloModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: false,
        }),
        TruevoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
