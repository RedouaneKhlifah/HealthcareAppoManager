// method that verify role
export const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.userData.user.role) {
            res.status(500);
            throw new Error("problem accure");
        }
        const result = allowedRoles.includes(req.userData.user.role);
        if (!result) {
            res.status(401);
            throw new Error("Not Authorized");
        }
        next();
    };
};
