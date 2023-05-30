import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { ErrorsInterceptor } from "./interceptors/exception.interceptor";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
