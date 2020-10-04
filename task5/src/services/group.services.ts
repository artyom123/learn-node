import { GroupModel } from '../models/group.model';

class GroupServices {
    constructor() {}

    findById (id: string) {
        return GroupModel.findByPk(id);
    }

    findAll () {
        return GroupModel.findAll();
    }
    
    updateById (req: any, id: string) {   
        return GroupModel.update(req, {
            where: { id },
        });
    }
    
    create (options: any) {
        return GroupModel.create(options);
    }
    
    remove (id: string) {
        return GroupModel.destroy({
            where: { id },
            limit: 1
        });
    }
};

export default new GroupServices();
