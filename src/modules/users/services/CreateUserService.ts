import { getCustomRepository} from 'typeorm'
import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';


// interface para abstrair os dados do request 
interface IRequest{
    name: string;
    email: string;
    password: string;
}

// Criação do service de criação de produtos
class CreateUserService{

    public async execute({name, email, password}: IRequest):Promise<User>{
        
        const usersRepository = getCustomRepository(UsersRepository)

        const emailExists = await usersRepository.findByEmail(email);

        if(emailExists){
            throw new AppError('Email addres already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name, 
            email,
            password: hashedPassword,
        })
        
        await usersRepository.save(user);

        return user

    }    
}

export default CreateUserService;

