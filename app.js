const express= require('express');
const mongoose= require('mongoose');
const path= require('path')
const productRoutes= require("./routes/Products")

const app= express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname ,'public')));

//view engine
app.set("view engine","ejs");

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/beautyB');

app.use('/',productRoutes);
    
    // Start the server
app.listen(3000, () => {
        console.log('Server running on port 3000')});