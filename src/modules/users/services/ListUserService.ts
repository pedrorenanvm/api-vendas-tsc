import { getCustomRepository} from 'typeorm'
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';


// Criação do service de criação de produtos
class ListUserService{

    public async execute():Promise<User[]>{
        
        // importamos o repository custom que foi criado no repositório de produtos
        const usersRepository = getCustomRepository(UsersRepository);

        // Busca todos os products salvos no banco
        const users = await usersRepository.find();

        // retorna a lista de products
        return users;
    }    
}

export default ListUserService;

