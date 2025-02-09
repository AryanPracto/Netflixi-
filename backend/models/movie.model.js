import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Movie=sequelize.define('Movie',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    streamURL:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    thumbnail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Movie;