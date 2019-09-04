import * as jwt from 'jsonwebtoken';

export default (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        request.userData = jwt.verify(token, 'stock-exchange');
        next();
    } catch (error) {
        return response.status(401).json({
            message: 'You don\'t have access to this resource',
        });
    }
}
