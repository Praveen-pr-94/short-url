const connectDb = require('./config/db');
const app = require('./app');

const startServer = async() => {
    // connecting to the databse
    await connectDb();
    const PORT = process.env.APP_PORT || 5000;
    app.listen(PORT , () => console.log(`Server running in ${PORT}`));
}

startServer();
