import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneOrFail(id);
    }

    create(data: UserDto) {
        const user = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.isActive = data.isActive;

        return this.userRepository.save(user);
    }

    update(data: UserDto, id: number) {
        return this.userRepository.save({ ...data, id: Number(id) });
    }

    delete(id: number) {
        return this.userRepository.delete(id);
    }
}