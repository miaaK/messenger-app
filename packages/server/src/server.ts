import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';

import sequelize from './sequelize';
import routes from './routes';
import socket from './socket';

const FileStore = require('session-file-store')(session);

const app: Application = express();

const sessionMiddleware = session({
    secret: 'messenger_app', // 쿠키를 임의로 변조하는 것을 방지하는 값 (세션을 암호화해 저장한다)
    saveUninitialized: true,
    cookie: { secure: false }, // one day
    resave: false,
    store: new FileStore(),
});

app.use(sessionMiddleware);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
})); 
app.use(express.json()); // for req.body
app.use(express.urlencoded({ extended: true })); // for req.body

sequelize.sync({ force: true });

app.use('/', routes);

const server = app.listen(8000, () => {
    console.log('start');
});

socket(server, app, sessionMiddleware);