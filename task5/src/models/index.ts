import { GroupModel } from '../models/group.model';
import { UserModel } from '../models/user.model';
import { UsersGroupsModel } from '../models/users_groups.model';

const UserToMany = () => {
    UserModel.belongsToMany(GroupModel, { through: UsersGroupsModel });
}

const GroupToMany = () => {
    GroupModel.belongsToMany(UserModel, { through: UsersGroupsModel });
}

export {
    UserToMany,
    GroupToMany,
}
