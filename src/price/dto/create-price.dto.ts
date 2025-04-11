import { IsNumber } from "class-validator";

export class CreatePriceDto {
    @IsNumber()
    order_price: number;

    @IsNumber()
    shipping_price: number;

    @IsNumber()
    processing_fee: number;
}
