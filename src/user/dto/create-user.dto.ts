import { IsNotEmpty } from 'class-validator';

export class CreateUserDto{
    
    @IsNotEmpty({
        message: 'Nome de usuário é obrigatório'
    })
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}