import express, { Express, Request, Response }  from "express";
import dotenv from 'dotenv';
import sequelize from "./db";
import fileUpload from "express-fileupload"
import models from "./models/models";
// @ts-ignore
import cors from "cors";
import router from "./routes";
import ErrorHandlingMiddleware from "./middelware/ErrorHandlingMiddleware";
import path from "path";


dotenv.config()

const PORT = process.env.PORT || 5000;

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(ErrorHandlingMiddleware)


const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)

  }
}


start()


