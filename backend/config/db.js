import { ENV_VARS } from "./envVars.js";
import { Sequelize } from "sequelize";

const sequelize=new Sequelize(
    ENV_VARS.DB_NAME,
    ENV_VARS.DB_USER,
    ENV_VARS.DB_PASSWORD,
    {
        host:ENV_VARS.DB_HOST||'localhost',
        dialect:'mysql'
    }
);

export default sequelize;