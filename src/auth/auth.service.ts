import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){}

    async validateUser({username, password}: AuthPayloadDto){

        const prisma = new PrismaClient();

        const findUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(!findUser) return null;

        if(await bcrypt.compare(password, findUser.password)){
            const {password, ...user } = findUser;
            return {
                token: this.jwtService.sign(user),
                statusCode: HttpStatus.OK
            }; // create a JWT
        }
    }   
}
