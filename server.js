const express =  require("express")
const connectDB = require("./src/db/db")
const userRoutes = require("./src/routes/userRoutes")
const blogroutes = require("./src/routes/blogroutes")

const app =  express();

app.use(express.json());

connectDB();


app.use('/api/users',userRoutes);
app.use('/api/blogs',blogroutes);


app.listen(5000,()=>{
    console.log("Server is running on port 5000")
});

