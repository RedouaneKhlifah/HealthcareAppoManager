import jwt from "jsonwebtoken";

// generate a token from the signature jwt_secret
export const generateJwt = (res, actor_id, role) => {
    const token = jwt.sign({ actor_id, role }, process.env.jwt_secret, {
        expiresIn: "1h"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });
};

export default generateJwt;
