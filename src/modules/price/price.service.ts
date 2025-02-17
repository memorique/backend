import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Price } from "./price.schema";

@Injectable()
export class priceService {
    constructor(@InjectModel("Price") private readonly priceModel: Model<Price>) { }

    async addDefaultPrices(prganizationId: string, defaultPriceList: Price[]): Promise<Price[]> {
        let priceList: Price[] = [];
        for (let price of defaultPriceList) {
            const newPrice = new this.priceModel({ organizationId: prganizationId, totalPrice: price.totalPrice, giftPrice: price.giftPrice, shippingFee: price.shippingFee })
            priceList.push(await newPrice.save());
        }
        return priceList;
    }

    async getPriceList(prganizationId: string): Promise<Price[]> {
        const priceList = await this.priceModel.find({ organizationId: prganizationId, isDeleted: false });
        return priceList || [];
    }

}