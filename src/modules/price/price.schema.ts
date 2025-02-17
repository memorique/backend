import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment-timezone';

export const PriceSchema = new Schema<Price>({
    priceId: { type: String, required: true, unique: true, default: uuidv4 },
    organizationId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    giftPrice: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: String }
}, {
    timestamps: true
});

PriceSchema.pre("save", function () {
    this.createdOn = moment.tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm');
});


export interface Price extends Document {
    priceId: string;
    organizationId:string;
    totalPrice: number;
    giftPrice: number;
    shippingFee: number;
    isDeleted: boolean;
    createdOn:string;
}
