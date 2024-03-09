import db from "../models/models/index";

const fetchAllRooms = async () => {
    try{
        
        const data = await db.room.findAll({
            attributes : {
                exclude: ['createdAt','updatedAt']
            }
        })
        return data
    } catch (e){
        console.log(e);
        return "ERROR"
    }
}

module.exports = {
    fetchAllRooms
}