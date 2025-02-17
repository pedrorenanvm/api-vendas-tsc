import { getCustomRepository} from 'typeorm'
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { link } from 'joi';

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

        const { token } = await userTokensRepository.generate(user.id);
        
        const forgotPasswordTemplate = path.resolve(__dirname,'..','views','forgot_password.hbs');

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email:user.email,
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        })
    }    
}

export default SendForgotPasswordEmailService;

