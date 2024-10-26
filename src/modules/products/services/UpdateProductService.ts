import { getCustomRepository} from 'typeorm'
import {ProductsRepository} from '../infra/typeorm/repositories/ProductsRepository'
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';


interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Criação do service de criação de produtos
class UpdateProductService{

    public async execute({ id, name, price, quantity }: IRequest):Promise<Product>{
        
        // importamos o repository custom que foi criado no repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        // Busca todos os products salvos no banco
        const product = await productsRepository.findOne(id);
        
        if(!product){
            throw new AppError('Product not found');
        }

        // verifica se já não existe um produto com este nome

        const productExists = await productsRepository.findByName(name);

        if(productExists && name !== product.name){
            throw new AppError('There is already one product with this name')
        }
        
        // atribuo os novos valores aos atributos do product
        product.name = name;
        product.price = price;
        product.quantity = quantity
        
        // salvo o product no banco de dados com os novos atributos
        await productsRepository.save(product);

        // retorna a lista de products
        return product;
    }    
}

export default UpdateProductService;

