import { getCustomRepository} from 'typeorm'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest{
    user_id: string;
}
// Criação do service de criação de produtos
class ShowProfileService{

    public async execute({user_id}: IRequest):Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if(!user){  
            throw new AppError('User not found.');
        }

        // retorna a lista de products
        return user;
    }    
}

export default ShowProfileService;

