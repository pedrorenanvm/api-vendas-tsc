import { getCustomRepository} from 'typeorm'
import {ProductsRepository} from '../infra/typeorm/repositories/ProductsRepository'
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';


interface IRequest{
    id: string;
}

// Criação do service de criação de produtos
class ShowProductService{

    public async execute({ id }: IRequest):Promise<Product>{
        
        // importamos o repository custom que foi criado no repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        // Busca todos os products salvos no banco
        const product = await productsRepository.findOne(id);
        
        if(!product){
            throw new AppError('Product not found');
        }

        // retorna a lista de products
        return product;
    }    
}

export default ShowProductService;

