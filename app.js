require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(Express.json());

const controllers = require('./controllers');
const middlewares = require('./middleware');

app.use(middlewares.Headers);
app.use('/user', controllers.userController);
app.use('/collection', controllers.collectionController);
app.use('/profile', controllers.profileController);
app.use('/admin', middlewares.ValidateJWT, middlewares.Admin, controllers.adminController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
