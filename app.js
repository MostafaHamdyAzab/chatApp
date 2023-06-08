const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const { log } = require('console');

const app=express();
app.use(express.json());
const server=require('http').createServer(app);
const io=require('socket.io')(server);
app.use(express.static(path.join(__dirname,'public')));


server.listen(4041,()=>{
    console.log("Api Listen on Port 4041");
});

io.on('connection',(socket)=>{ //io.on()=>acception for server
    console.log("The Server Accept The connection");

    socket.on("joinRoom",()=>{
        socket.join("myRoom");
        console.log("Join Process");
    });

    socket.on("sentMsg",()=>{
        io.to("myRoom").emit("newMsg");
        console.log("sending Process");
    })
}); 


app.use((req,res,nxt)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Headers','Authorization')
});

app.use('/',(req,res,nxt)=>{
 res.render('index.html');

});




