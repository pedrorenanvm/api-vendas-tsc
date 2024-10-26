import { getCustomRepository} from 'typeorm'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import { compare } from 'bcryptjs';


// interface para abstrair os dados do request 
interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token:string;
}

// Criação do service de criação de produtos
class CreateSessionsService{

    public async execute({ email, password}: IRequest):Promise<IResponse>{
        
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Incorrect email/password combination.',401);
        }

        const passwordConfirmed = await compare(password, user.password);


        if(!passwordConfirmed){
            throw new AppError('Incorrect email/password combination.',401);
        }
        
        const token = sign({},authConfig.jwt.secret, { 
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            user,
            token
        } 
            

    }    
}

export default CreateSessionsService;

