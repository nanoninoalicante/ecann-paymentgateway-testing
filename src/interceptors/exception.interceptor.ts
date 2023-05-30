import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpException,
    CallHandler,
    HttpStatus,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as uuid from "uuid";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) =>
                throwError(() => {
                    console.log("error from exception handler: ", err);
                    return new HttpException(
                        {
                            status: HttpStatus.BAD_REQUEST,
                            error: err
                                ? err.message
                                : "error from exception handler",
                            timestamp: new Date().toISOString(),
                            message: "error",
                            requestId: uuid.v4(),
                        },
                        HttpStatus.BAD_REQUEST,
                    );
                }),
            ),
        );
    }
}
