import { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid';

export const OrganizationSchema = new Schema<Organization>({
    organizationId:{
        type:String, unique:true, required:true, default:uuidv4
    }
})

export interface Organization{
    organizationId:string
}