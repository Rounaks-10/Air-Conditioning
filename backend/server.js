import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCD from './config/cloudinary.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'

const app = express()
const PORT =process.env.PORT || 5000
connectDB()
connectCD()

//Middleware
app.use(express.json())
app.use(cors())

//API endpoint
app.use('/api/user',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working");
})

app.listen(PORT,()=> console.log("Server started on PORT :"+PORT))
