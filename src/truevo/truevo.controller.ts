import { Controller, Get } from "@nestjs/common";
import { TruevoService } from "./truevo.service";

@Controller("truevo")
export class TruevoController {
    constructor(protected service: TruevoService) {}
    @Get()
    async getPaymentLink() {
        return this.service.getPaymentLink();
    }
}
