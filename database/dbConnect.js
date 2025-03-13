
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI, {dbName:'workflow_db'});
        console.log(`successfully connected to database Host: ${connection.connection.host} ${connection.connection.db.databaseName}`)
    } catch (error) {
        console.error('database connection failure', error)
    }
}


module.exports = connectDb;