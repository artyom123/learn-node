import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../types/user';

const users: User[] = [];

export const findById = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((userItem) => userItem.id === id);

    if (!user) {
        res.status(404).json({
            error: 'User not exists'
        });
    } else {
        res.status(200).json(user);
    }
};

export const findAll = (req: Request, res: Response) => {
    const { limit = users.length, loginSubstring = '' }: any = req.query;

    const result: User[] = users.filter((user, index) => user.login.includes(loginSubstring)  && index < limit)
        .sort((userFirst: User, userSecond: User) => {
            if (userFirst.login < userSecond.login) {
                return -1;
            }

            if (userFirst.login > userSecond.login) {
                return 1;
            }

            return 0;
        });

    res.status(200).json({ result });
};

export const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((userItem) => userItem.id === id);


    if (!user) {
        res.status(404).json({
            error: 'User not exists'
        });
    } else {
        const { password, age } = req.body;

        Object.assign(
            users,
            {
                ...user,
                password,
                age
            }
        );

        res.status(200).json(users);
    }
};

export const create = (req: Request, res: Response) => {
    const { login, password, age } = req.body;

    const isLogin = users.find((userItem) => userItem.login === login);

    if (isLogin) {
        res.status(404).json({
            error: 'Choose another username'
        });
    } else {
        const user = users.push({
            id: uuidv4(),
            login,
            password,
            age,
            isDeleted: false
        });

        res.status(200).json(user);
    }
};

export const remove = (req: Request, res: Response) => {
    const { id } = req.params;

    const user = users.find((userItem) => userItem.id === id);

    if (!user) {
        res.status(404).json({
            error: 'User not exists'
        });
    } else {
        Object.assign(user, { isDeleted: true });

        res.status(200).json(user);
    }
};
