import express, { Application } from 'express';
import session from 'express-session';

import sequelize from './sequelize';
import routes from './routes';

const FileStore = require('session-file-store')(session);

const app: Application = express();

const sessionMiddleware = session({
    secret: 'messenger_app', // 쿠키를 임의로 변조하는 것을 방지하는 값 (세션을 암호화해 저장한다)
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false,
    store: new FileStore(),
});

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true });

app.use('/', routes);

app.listen(8000, () => {
    console.log('start');
})