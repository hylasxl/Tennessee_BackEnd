const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('t2', 'root', 'Viet2003', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
    },
    timezone: '+07:00',
    logging: false
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect Successfully")
    } catch (error) {
        console.log("Cannot connect database: ", error)
    }
}

export default connection;