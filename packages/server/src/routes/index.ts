import { Router } from "express";

import chat from "./chat";
import user from "./user";
import room from "./room";

const router = Router();

// api
router.use('/chat', chat);
router.use('/room', room);
router.use('/user', user);

export default router;