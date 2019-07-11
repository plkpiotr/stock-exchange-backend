import * as jwt from 'jsonwebtoken';

export default (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        request.attempt = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        return response.status(401).json({
            message: 'You don\'t have access to this resource'
        });
    }
}
