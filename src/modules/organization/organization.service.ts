import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Organization } from "./organization.schema";

@Injectable()
export class OrganizationService {
    constructor(@InjectModel("Organization") private readonly OrganizationModel: Model<Organization>) { }
   async create()
    {
        const newOrganization =  new this.OrganizationModel();
        return await newOrganization.save();
    }
}