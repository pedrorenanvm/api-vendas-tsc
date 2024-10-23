import { getCustomRepository} from 'typeorm'
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import AppError from '@shared/errors/AppError';

// interface para abstrair os dados do request 
interface IRequest{
    email: string;
}

// Criação do service de criação de produtos
class SendForgotPasswordEmailService{

    public async execute({ email }: IRequest):Promise<void>{
        
        const usersRepository = getCustomRepository(UsersRepository)

        const userTokensRepository = getCustomRepository(UserTokensRepository)

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists.');
        }

        console.log(user)

        const token = await userTokensRepository.generate(user.id);
        
        console.log(token)
    }    
}

export default SendForgotPasswordEmailService;

