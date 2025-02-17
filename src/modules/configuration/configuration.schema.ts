import {  Schema } from "mongoose";
import { Price, PriceSchema } from "../price/price.schema";

export const ConfigurationSchema = new Schema<Configuration>({
    prices: { type: [PriceSchema], required: true }
}, { timestamps: true });


export interface Configuration {
    prices: Price[]
}



