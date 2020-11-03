import UserServices from '../../../src/services/user.services';
import { UserModel } from '../../../src/models/user.model';
import { DEFAULT_USERS } from '../../../src/data/data-users';
import GroupDatabase from '../../../src/data-access/index';

describe('User controller: ', () => {
    beforeAll(async () => {
        // eslint-disable-next-line no-new
        new GroupDatabase();

        await UserModel
            .sync({ force: true })
            .then(() => UserModel.bulkCreate(DEFAULT_USERS));
    });

    it('function findById: should be true', async () => {
        const id = 'ab4f0a13-dff7-4a51-8697-a391d1fa0cbc';

        const expected = {
            id: 'ab4f0a13-dff7-4a51-8697-a391d1fa0cbc',
            login: 'login1',
            password: 'password1',
            age: 11
        };

        const user = JSON.stringify(await UserServices.findById(id));

        expect(user).toEqual(JSON.stringify(expected));
    });

    it('function findAll: should be true', async () => {
        const expected = DEFAULT_USERS;
        const limit = null;
        const loginSubstring = '';

        const users = JSON.stringify(await UserServices.findAll(limit, loginSubstring));

        expect(users).toEqual(JSON.stringify(expected));
    });

    it('function updateById: should be true', async () => {
        const id = 'ab4f0a13-dff7-4a51-8697-a391d1fa0cbc';
        const req = {
            login: 'login2'
        };

        const expected = [1];

        await expect(UserServices.updateById(req, id))
            .resolves.toEqual(expected);
    });

    it('function create: should be true', async () => {
        const options = {
            login: 'login5',
            password: 'password1',
            age: 22
        };

        const expected = {
            login: 'login5',
            password: 'password1',
            age: 22
        };

        const user = await UserServices.create(options);

        expect(user.login).toEqual(expected.login);
        expect(user.password).toEqual(expected.password);
        expect(user.age).toEqual(expected.age);
    });

    describe('function remove: ', () => {
        it('should be true', async () => {
            const id = '61919aa1-ea6e-41ad-a916-3b6307af1b13';
            const expected = 1;

            await expect(UserServices.remove(id))
                .resolves.toBe(expected);
        });

        it('should be false', async () => {
            const id = '649310da-5575-44f4-9c90-3b6307af1b13';
            const expected = 0;

            await expect(UserServices.remove(id))
                .resolves.toBe(expected);
        });
    });
});
