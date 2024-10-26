import { getCustomRepository} from 'typeorm'
import {ProductsRepository} from '../infra/typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError';


interface IRequest{
    id: string;
}

// Criação do service de criação de produtos
class DeleteProductService{

    public async execute({ id }: IRequest):Promise<void>{
        
        // importamos o repository custom que foi criado no repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        // Busca todos os products salvos no banco
        const product = await productsRepository.findOne(id);
        
        if(!product){
            throw new AppError('Product not found');
        }
        // Apago o product no banco de dados
        await productsRepository.remove(product);

    }    
}

export default DeleteProductService;

