import express from "express"
import authRoute from "./routes/auth.route.js"
import dotenv from "dotenv"
import { ENV_VARS } from "./config/envVars.js";
import sequelize from "./config/db.js";
import cors from "cors"
import addRoute from "./routes/add.route.js"
import searchRoute from "./routes/search.route.js"
import payRoute from './routes/payRoute.route.js'

const app=express();
const PORT=ENV_VARS.PORT;

dotenv.config();

app.use(express.json())
app.use(cors())
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/search',searchRoute)
app.use('/api/v1/add',addRoute)
app.use('/api/v1/payment',payRoute)

sequelize.authenticate()  // authenticate the connection to the database
  .then(() => {
    console.log('Database connection successful!');  // Connection success message
    // Sync database and start server
    sequelize.sync({alter:true}).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);  // Connection error message
  });