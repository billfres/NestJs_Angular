import { Body, Controller, Post } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    register(
        @Body() userData: UserSubscribeDto
    ): Promise<Partial<UserEntity>>{
        return this.userService.register(userData);
    }
}
