import { IsInt, IsString, IsUUID, Length, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsUUID("4", { groups: ["create"], message: "ID must be a valid UUID v4 string" })
    id: string;
    @IsString({groups: ["create"], message: "Name must be a string" })
    @Length(4, 20, {groups: ["create"], message: "Name must be between 4 and 20 characters long" })
    name: string;

    @IsInt({ groups: ["create"], message: "Age must be an integer" })
    @Min(10, { groups: ["create"] ,message: "Age must be a non-negative integer" })
    @Max(120, { groups: ["create"] ,message: "Age must be less than or equal to 120" })
    @Min(18, { groups: ["update"] ,message: "Age must be at least 18" })
    @Max(65, { groups: ["update"] ,message: "Age must be less than or equal to 65" })
    age: number;
}