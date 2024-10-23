import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express'
import authConfig from '@config/auth';


interface ITokenPayload{
    iat: number;
    exp: number;
    sub: string;
}
export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void{
    
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('JWT Token is missing.')
    }
    // Bearer amfpofmwqopfmqwopfmpqe12pasçds
    // Com a desistruturação é possível separar o bearer e o token, a posição 0 representa o bearer e a 1 o token
    // como não vou usar o bearer eu nem coloquei variável pra ele, apenas para o token 
    const [, token] = authHeader.split(' ');

    try{
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as ITokenPayload;

        
        request.user = { 
            id: sub,
        };

        return next();
    }catch{
       throw new AppError('Invalid JWT Token.');
    }
}
