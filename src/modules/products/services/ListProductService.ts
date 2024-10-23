import { getCustomRepository} from 'typeorm'
import {ProductsRepository} from '../typeorm/repositories/ProductsRepository'
import Product from '../typeorm/entities/Product';


// Criação do service de criação de produtos
class ListProductService{

    public async execute():Promise<Product[]>{
        
        // importamos o repository custom que foi criado no repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        // Busca todos os products salvos no banco
        const products = await productsRepository.find();

        // retorna a lista de products
        return products;
    }    
}

export default ListProductService;

