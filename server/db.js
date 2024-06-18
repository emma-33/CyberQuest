import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'cyberquest_db',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    {
        host: 'DATABASE_HOST',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

export default sequelize;
