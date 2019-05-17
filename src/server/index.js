import express from "express"
//import router from './router'
//import frontFilter from './middleware/frontFilter'
//import startUps from './utils/startUps'
import path from 'path'


/**
 * 
 * At production webpack copy frontend build to 'server > public' folder.
 * At dev mode -> front, back ends runs on their own ports(3000, 8080)
 * 
 */
const htmlPath = path.join(__dirname, '../client');

//create instance
const app = express();

app.disable('etag');
app.use(express.static(htmlPath)) //static route

//app.use(frontFilter) //frontFilter
app.use('/api', (req,res)=>{res.send({status : "OK"})} ) //directing to global router(dispatcher)

//listen oon 8080
app.listen(8080, () => console.log("Listening onn portt 8080    !"));

