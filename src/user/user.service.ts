import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    
    const prisma = new PrismaClient()


    const salt = 10;
    const hash = await bcrypt.hash(createUserDto.password, salt);
    
    await prisma.user.create({
        data: {
            ...createUserDto,
            password: hash
        }
    })

    return {
        statusCode: 200,
        message: 'User created'
    }

  };

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
