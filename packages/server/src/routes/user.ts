import { Router } from 'express';
import { v4 as uuid } from 'uuid'

import User from '../schemas/user';
import { Op } from 'sequelize';

const router = Router();

/* User list */
router.get('/', async(req, res) => {
    try {
        const result = await User.findAndCountAll({
            where: {
                id: {
                    [Op.ne]: req.session.userId // Operator.ne
                }
            }
        });

        res.json(result);
    } catch (e) {

    }
});


/* Check sessions */
router.get('/me', async(req, res) => {
    try {
        res.json({
           username: req.session.username,
           userId: req.session.userId,
           isLogged: req.session.isLogged
        });
    } catch (e) {

    }
});


/* Login */
router.post('/login', async(req, res) => {
    try {
        const userId = uuid();
        const username = req.body.username;
        
        const user = await User.create({
            id: userId,
            username
        });

        req.session.username = username;
        req.session.userId = userId;
        req.session.isLogged = true;

        req.session.save(() => {
            res.json({
                statusText: 'OK',
                data: user
            })
        });
    } catch (e) {

    }
});


/* Logout */
router.post('/logout', async(req, res) => {
    try {
        delete req.session.user;

        req.session.save(() => {
            res.redirect('/');
        })
    } catch (e) {

    }
});

export default router;