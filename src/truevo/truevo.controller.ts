import { All, Body, Controller, Get, Param, Query } from "@nestjs/common";
import { TruevoService } from "./truevo.service";

@Controller("truevo")
export class TruevoController {
    constructor(protected service: TruevoService) {}
    @Get()
    async getPaymentLink() {
        return this.service.getPaymentLink();
    }
    @All("/:status")
    async cancel(
        @Body() body: any,
        @Query() query: any,
        @Param("status") status: any,
    ) {
        console.log(status);
        return {
            body,
            query,
            status,
        };
    }
}
