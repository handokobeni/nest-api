import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { EntityNotFoundExceptionFilter } from "./entity-not-found-exception.filter";
import { UserService } from "./user.service";

@Controller('users')
@UseFilters(new EntityNotFoundExceptionFilter)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        const users = await this.userService.findAll();

        return {
            status: true,
            data: users
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const user = await this.userService.findOne(id);

        return {
            status: true,
            data: user
        }
    }

    @Post()
    async create(@Body() data: UserDto) {
        const user = await this.userService.create(data);

        return {
            status: true,
            data: user
        }
    }

    @Put(':id')
    async update(@Body() data: UserDto, @Param('id') id: number) {
        const user = await this.userService.update(data, id);

        return {
            status: true,
            data: user
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const user = await this.userService.delete(id);

        return {
            status: true,
            message: 'Successfully delete user'
        }
    }
}