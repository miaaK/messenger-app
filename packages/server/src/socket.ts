const SocketIO = require('socket.io');

import { Application, NextFunction, RequestHandler } from 'express';
import { Server } from 'net';
import { Socket } from 'socket.io';

const socket = ( server: Server, app: Application, session: RequestHandler ) => {
    const io = SocketIO(server, {
        path: '/socket.io',
        cors: {
            origin: '*'
        }
    });

    app.set('io', io);

    const chat = io.of('/chat');

    io.use(( socket: Socket, next: NextFunction ) => {
        const req = socket.request;

        const res = socket.request.res || {};

        session(req, res, next);
    });

    chat.on('connection', async(req, res) => {
        socket.toString('join', (roomId) => {
            socket.join(roomId);
        });

        socket.on('disconnect', (data) => {
            console.log('Disconnected to chat');
        });
    });
};

export default socket;
