import { Response } from 'express';

import { logger } from '../helpers/logger';

export class ErrorHandler extends Error {
    statusCode: number;
    info: string;
    method_name?: string;
    params?: object;

    constructor(
        statusCode: number,
        info: string,
        method_name?: string,
        params?: object,
    ) {
        super();
        this.statusCode = statusCode;
        this.info = info;

        this.method_name = method_name;
        this.params = params;
    }
}

export const handleError = (err: any, res: Response, path: string) => {
    const {
        statusCode,
        info,
    } = err;

    res.status(statusCode).json({
        status: "error",
        statusCode,
        info
    });
};
