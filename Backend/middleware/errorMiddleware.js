import { ValidationError } from "sequelize";

// Middleware ctach error when request match no routes
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// costum Error handler
const errorHandler = (err, req, res, next) => {
    // if there is error change res.satus to 500
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // check if error instanceof  sequelize ValidationError class
    if (err instanceof ValidationError) {
        const errors = err.errors.map((error) => ({
            message: error.message,
            field: process.env.NODE_ENV === "production" ? null : error.path
        }));

        return res.status(400).json({ errors });
    }

    let message = err.message;
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

export { notFound, errorHandler };
