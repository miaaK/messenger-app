import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

import User from './user';

const Room = sequelize.define('room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // one-to-one chat
    receiverId: {
        type: DataTypes.UUID,
        references: {
            model: User
        }
    }
});

export default Room;