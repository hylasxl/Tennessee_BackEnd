import db from "../models/models/index";

const getAccountTypewPermissions = async (user) => {

    const typeID = user.accountTypeId;
    let userPermission = await db.accountType.findOne({
        attributes: ["id", "typeName", "description"],
        where: { id: typeID },
        include: [{
            model: db.permissions,
            attributes: ['id', 'url'],
            through: { attributes: [] },
            
        }],
        nest: true,
    })

    // console.log(userPermission);
    return userPermission ? userPermission : {};
}

module.exports = {
    getAccountTypewPermissions
}