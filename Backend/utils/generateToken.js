import jwt from "jsonwebtoken";

// generate a token from the signature jwt_secret
export const generateJwt = (res, actorId, role) => {
    const token = jwt.sign({actorId, role}, process.env.jwt_secret, 
    {
        expiresIn: '30d'
    });
    return token;
}

