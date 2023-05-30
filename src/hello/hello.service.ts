import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HelloService {
    constructor(protected config: ConfigService) {}
    async getWorld(body: any = {}, params: any = {}) {
        const envExample = this.config.get<string>("ENV_EXAMPLE");
        return { message: "world", ...body, ...params, envExample };
    }
    async getWorldError(body: any = {}, params: any = {}) {
        try {
            throw new Error("testing error response");
        } catch (error) {
            throw error;
        }
    }
}
