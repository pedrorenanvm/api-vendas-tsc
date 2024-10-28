import 'reflect-metadata';
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
    beforeEach( () => {
        fakeCustomersRepository = new FakeCustomersRepository();

        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    })
    it('should be able to create a new customer', async () => {
        const customer = await createCustomer.execute({
            name: 'Pedro Renan',
            email: 'pedro@gmail.com',
            
        });

        // Then
        expect(customer).toHaveProperty('id');

    });
    it('should not be able to create two customer with the same email', async () => {

        await createCustomer.execute({
            name: 'Pedro Renan',
            email: 'pedro@gmail.com',
            
        });
        // Then
        expect(
            createCustomer.execute({
                name: 'Pedro Renan',
                email: 'pedro@gmail.com',
                
            })
        ).rejects.toBeInstanceOf(AppError)

    });
});