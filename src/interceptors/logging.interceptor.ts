import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("Before...");

        const req = context.switchToHttp().getRequest();
        console.log("request: ", {
            url: req.url,
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
        });
        const now = Date.now();
        return next
            .handle()
            .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }
}
