import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
    Address,
    App,
    Currency,
    CustomData,
    Customer,
    DynamicDescriptor,
    GUID,
    Merchant,
    Url,
    Response,
    Summary,
    Items,
} from "nodejs-wrapper";

const certFile = "ESC030523001-crt.pem";
const privateKeyFile = "ESC030523001-key.pem";

@Injectable()
export class TruevoService {
    gatewayApp: App;
    constructor(protected config: ConfigService) {
        const apiKey = this.config.get("TRUEVO_API_KEY");
        const apiToken = this.config.get("TRUEVO_API_TOKEN");
        console.log("apiToken", apiToken);
        const merchantObj = new Merchant(
            apiKey,
            apiToken,
            certFile,
            privateKeyFile,
        );
        this.gatewayApp = new App(merchantObj);
        console.log("gatewayApp", this.gatewayApp);
    }
    async getPaymentLink() {
        // 0. Initialize the payment wrapper (same procedure)

        // 1. Create a HPP transaction
        const amount = 1.5;

        const customerId = "101";

        // Order ID or any randomly generated unique sequence of characters can be
        // used as a Transaction ID
        // const txnId = "<order ID>/<TXN00000101>/<REF00000101>";
        // or generate a random
        const txnId = GUID();

        const billing = new Address("John", "Doe", "john@doe.com", "123123123");
        const shipping = new Address(
            "Alice",
            "Targ",
            "alice@targ.com",
            "321321321",
        );

        const customer = new Customer(customerId, billing, shipping);

        const urlObj = new Url(
            "http://127.0.0.1/success",
            "http://127.0.0.1/fail",
            "http://127.0.0.1/cancel",
        );

        try {
            const payment = this.gatewayApp.payments(
                txnId,
                amount,
                customer,
                urlObj,
                Currency.EUR,
            );

            // You can add summary details
            const summary = new Summary(1.3, 0.26, 0.14);
            // You can also add discount details on summary
            summary.addDiscount(
                0.2,
                "ANY20",
                "Get €0.20 off on any order above €1",
            );
            payment.setOrderSummary(summary);

            // You can add item details
            const items = new Items(
                "Replacement eartips for earphones",
                0.5,
                1,
                "RPLCMTERTPS135",
            );
            // you can use addItems to add multiple items
            items.addItem("Earphones carrying pouch", 0.8, 1, "ERPNSPCH543");
            payment.setOrderItems(items);

            // With Dynamic Descriptor
            payment.setDynamicDescriptor(
                new DynamicDescriptor(
                    "1234567890",
                    "test@example.com",
                    "example org",
                ),
            );

            // Set Payment Execution Date
            // payment.setExecutionDate("<date>");

            const additionalData = new CustomData("data1", "data2");
            payment.setCustomData(additionalData);

            return await payment
                .createHPP()
                .then((txn) => {
                    if (!txn.hasError()) {
                        // Process the recieved response
                        const redirectData = txn.getRedirectData();
                        console.log(redirectData.action, redirectData.value);

                        // Or you can get a valid html string which you can send in you server response
                        console.log(txn.getRedirectFormString());

                        // Or you can use the redirect function with your http server's response object
                        // to redirect the client to HPP payment page
                        // txn.redirect(response);
                        return txn.getRedirectFormString();
                    } else {
                        // Handle failed request
                        console.log(txn.getHttpCode(), txn.getError());
                    }
                })
                .catch((err) => {
                    // Handle HTTP Errors
                    if (err instanceof Response) {
                        // You can use the helper methods
                        console.log(err.getError(), err.getErrorDescription());
                    }
                    console.log(err);
                });
        } catch (error) {
            // Handle the error
            console.log(error);
        }
    }
}
