import {container} from 'tsyringe';

import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

container.registerSingleton<ICustomerRepository>('CustomersRepository', CustomersRepository); // chave para referencia de CustomerRepository possui o mesmo nome do ICustomerRepository

