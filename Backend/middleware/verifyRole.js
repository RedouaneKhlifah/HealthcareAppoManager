// method that verify role
export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.user);
        const result = rolesArray.includes(req.user.role);
        if (!result) {
            res.status(401);
            throw new Error("Not Authorized");
        }
        next();
    };
};
