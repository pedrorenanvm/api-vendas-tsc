import { getCustomRepository} from 'typeorm'
import AppError from '@shared/errors/AppError';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import { inject } from 'tsyringe';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';


// interface para abstrair os dados do request 
interface IRequest{
    name: string;
    email: string;
    password: string;
}

// Criação do service de criação de produtos
class CreateUserService{

    constructor(
        // Aqui era pra ter a inversão de dependencia de UserRepository, pesquisar no repositorio como fazer
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}



    public async execute({name, email, password}: IRequest):Promise<User>{
        
        const usersRepository = getCustomRepository(UsersRepository)

        const emailExists = await usersRepository.findByEmail(email);

        if(emailExists){
            throw new AppError('Email addres already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

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

