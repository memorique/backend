import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Configuration } from "./configuration.schema";
import { Injectable } from "@nestjs/common";
import { Price } from "../price/price.schema";

@Injectable()
export class ConfigurationService {
    constructor(@InjectModel("Configuration") private readonly configurationModel: Model<Configuration>) { }

    async getDefaultPriceList(): Promise<Price[]> {
        const configuration = await this.configurationModel.findOne();
        return configuration?.prices || [];
    }

}