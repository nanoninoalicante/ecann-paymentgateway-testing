import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
export type ItemDocument = Item & Document;

@Schema({
    collection: "items",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
})
export class Item {
    @Prop()
    name: string;
    @Prop()
    description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
