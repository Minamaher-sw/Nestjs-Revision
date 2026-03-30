import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request, Response } from 'express';
import { CreateUserDto } from './Dto/create-user.dto';
import { ConvertIntPipe } from 'src/pipe/convert-int/convert-int.pipe';

@Controller('users')
// @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getUsers(): { id: string; name: string; age: number }[] {
        return this.userService.getUsers();
    }
    @Get(':id')
    getUserById(@Param("id",ConvertIntPipe) id: string): { id: string; name: string; age: number } | undefined {
        return this.userService.getUserById(id);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({groups: ["create"], whitelist: true, forbidNonWhitelisted: true }))
    createUser(@Body() body: CreateUserDto, @Res() res: Response): void {
        console.log(body);
        const user = this.userService.createUser(body);
        res.json({
            message: 'User created successfully',
            user,
        });
    }
}

