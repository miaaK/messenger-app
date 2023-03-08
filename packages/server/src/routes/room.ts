import { Router } from 'express';

import Room from '../schemas/room';
import User from '../schemas/user';

const router = Router();

/* Lists of chat rooms */
router.get('/', async(req, res) => {
    try {
        const rooms = await Room.findAll({
            include: User,

        });

        res.json(rooms);
    } catch (e) {

    }
});


/* Details of chat rooms */
router.get('/:roomId', async(req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                id: Number(req.params.roomId),
            },
            include: User
        });

      res.json(room);
    } catch (e) {

    }
});


/* Create new chat rooms */
router.post('/', async(req, res) => {
    try {
        const room = await Room.create({
            receiverId: req.body.receiverId
        });

      res.json(room);
    } catch (e) {

    }
});

export default router;