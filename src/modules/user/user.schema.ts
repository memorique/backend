import { Schema, Document } from 'mongoose';
import * as moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

export const UserSchema = new Schema<User>({
  userId: { type: String, required: true, unique: true, default: uuidv4 },
  organizationId: { type: String, required: true },
  fullName: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "admin", "teamuser"] },
  signature: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  inviteCode: { type: String },
  isActivated: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  createdOn: { type: String },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  if (this.firstName && this.lastName) {
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    this.fullName = `${this.firstName.trim()} ${this.lastName.trim()}`;
  }
  this.role = "admin";
  this.signature = `Regards,\n${this.fullName}`;
  this.inviteCode = `${this.firstName.toLowerCase()}${Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, '0')}`;
  this.createdOn = moment.tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm');
  next();
});

export interface User extends Document {
  userId: string;
  organizationId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  signature: string;
  city: string;
  state: string;
  country: string;
  inviteCode: string;
  createdOn: string;
  isActivated:boolean,
  isDeleted:boolean,
  isBlocked:boolean
}