import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
    constructor(private readonly dataSource: DataSource) { }


    async login(data: Partial<User>): Promise<User> {
        const { email, password } = data;
        return await this.dataSource.query('CALL user_login(?, ?)', [email, password]);
    }

    // Create User (Insert)
    async createUser(email: string, name: string, password: string): Promise<void> {
        await this.dataSource.query('CALL CreateUser(?, ?, ?)', [email, name, password]);
    }

    // Fetch User by ID
    async getUserById(id: number): Promise<User[]> {
        return this.dataSource.query('CALL GetUserById(?)', [id]);
    }

    // Update User
    async updateUser(id: number, name: string, password: string, isActive: boolean): Promise<void> {
        await this.dataSource.query('CALL UpdateUser(?, ?, ?, ?)', [id, name, password, isActive]);
    }

    // Delete User
    async deleteUser(id: number): Promise<void> {
        await this.dataSource.query('CALL DeleteUser(?)', [id]);
    }

}