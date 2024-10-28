import 'reflect-metadata';
import CreateuserService from "./CreateUserService";
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


let fakeUsersRepository: FakeCustomersRepository;
let createUser: CreateuserService;
let fakeHashProvider: FakeHashProvider;

describe('Createuser', () => {
    
    beforeEach( () => {
        fakeUsersRepository = new FakeCustomersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService( fakeHashProvider);
    })

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Pedro Renan',
            email: 'pedro@gmail.com',
            password: '123456'
            
        });

        // Then
        expect(user).toHaveProperty('id');

    });
    it('should not be able to create two user with the same email', async () => {

        await createUser.execute({
            name: 'Pedro Renan',
            email: 'pedro@gmail.com',
            password: '123456'
            
        });
        // Then
        expect(
            createUser.execute({
                name: 'Pedro Renan',
                email: 'pedro@gmail.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError)

    });
});