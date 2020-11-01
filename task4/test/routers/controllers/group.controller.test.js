import GroupServices from '../../../src/services/group.services';
import { GroupModel } from '../../../src/models/group.model';
import { DEFAULT_GROUPS } from '../../../src/data/data-users';
import GroupDatabase from '../../../src/data-access/index';

describe('Group controller: ', () => {
    beforeAll(async () => {
        // eslint-disable-next-line no-new
        new GroupDatabase();

        await GroupModel
            .sync({ force: true })
            .then(() => GroupModel.bulkCreate(DEFAULT_GROUPS));
    });

    it('function findById: should be true', async () => {
        const id = 'ab4f0a13-dff7-4a51-8697-a391d1fa0cbc';

        const expected = {
            id: 'ab4f0a13-dff7-4a51-8697-a391d1fa0cbc',
            name: '111111',
            permissions: ['READ']
        };

        const group = JSON.stringify(await GroupServices.findById(id));

        expect(group).toEqual(JSON.stringify(expected));
    });

    it('function findAll: should be true', async () => {
        const expected = DEFAULT_GROUPS;

        const groups = JSON.stringify(await GroupServices.findAll());

        expect(groups).toEqual(JSON.stringify(expected));
    });

    it('function updateById: should be true', async () => {
        const id = '649310da-5575-44f4-9c90-cc3c1d4ab59e';
        const req = {
            name: '222222'
        };

        const expected = [1];

        await expect(GroupServices.updateById(req, id))
            .resolves.toEqual(expected);
    });

    it('function create: should be true', async () => {
        const options = {
            name: '555555',
            permissions: ['DELETE']
        };

        const expected = {
            name: '555555',
            permissions: ['DELETE']
        };

        const group = await GroupServices.create(options);

        expect(group.name).toEqual(expected.name);
        expect(group.permissions).toEqual(expected.permissions);
    });

    describe('function remove: ', () => {
        it('should be true', async () => {
            const id = '61919aa1-ea6e-41ad-a916-3b6307af1b13';
            const expected = 1;

            await expect(GroupServices.remove(id))
                .resolves.toBe(expected);
        });

        it('should be false', async () => {
            const id = '61919aa1-ea6e-41ad-a916-3b6307af1b13';
            const expected = 0;

            await expect(GroupServices.remove(id))
                .resolves.toBe(expected);
        });
    });
});
