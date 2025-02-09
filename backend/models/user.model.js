import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Subscription from "./subscription.model.js";

const User=sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isASubscriber:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    image:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    subscriptionId: {  // Add subscriptionId field
        type: DataTypes.INTEGER,
        allowNull: true,  // User might not have a subscription
        onUpdate: "CASCADE",
        onDelete: "SET NULL"  // If subscription is deleted, set it to NULL
    }
});

export default User;