import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: { id: string; name: string; age: number }[];

    constructor() {
        this.users = [
            { id: "uuid1", name: 'John Doe', age: 30 },
            { id: "uuid2", name: 'Jane Doe', age: 25 },
            { id: "uuid3", name: 'Jim Doe', age: 35 },
            { id: "uuid4", name: 'Jack Doe', age: 40 },
        ];
    }

    getUsers(): { id: string; name: string; age: number }[] {
        return this.users;
    }
    getUserById(id: string): { id: string; name: string; age: number } | undefined {
        return this.users.find(user => user.id === id);
    }
    createUser(body: { id: string; name: string; age: number }): { id: string; name: string; age: number } {
        const newUser = { id: body.id, name: body.name, age: body.age };
        this.users.push(newUser);
        return newUser;
    }

}
