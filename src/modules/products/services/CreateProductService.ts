import { getCustomRepository} from 'typeorm'
import {ProductsRepository} from '../infra/typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';

// interface para abstrair os dados do request 
interface IRequest{
    name: string;
    price: number;
    quantity: number;
}

// Criação do service de criação de produtos
class CreateProductService{

    public async execute({name, price, quantity}: IRequest):Promise<Product>{
        
        // importamos o repository custom que foi criado no repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        const productExists = await productsRepository.findByName(name);

        // verifica se já não existe um produto com este nome
        if(productExists){
            throw new AppError('There is already one product with this name')
        }

        // criação de um novo produto
        const product = productsRepository.create({
            name,
            price,
            quantity,
        })

        await productsRepository.save(product);

        return product;
    }    
}

export default CreateProductService;

