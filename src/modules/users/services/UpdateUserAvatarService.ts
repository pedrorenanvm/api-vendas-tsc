import { getCustomRepository} from 'typeorm'
import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';


// interface para abstrair os dados do request 
interface IRequest{
    user_id: string;
    avatarFilename: string;
}

// Criação do service de criação de produtos
class UpdateUserAvatarService{

    public async execute({user_id,avatarFilename}: IRequest):Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found');
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }    
}

export default UpdateUserAvatarService;

