import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subscription = sequelize.define("Subscription", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    planName: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
    },
    fee: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    no_of_devices: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, // Duration in days
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Subscription;
