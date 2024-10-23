const express=require("express");
const app=express();

app.use("/hello/2",(req,res)=>
  {
    res.send("abraka dabra");
  })
app.use("/",(req,res)=>
{
  res.send("hiii helloo sangeetha")
})

app.use("/user",(req,res)=>
{
  res.send("HAHAHAHAHAHS");
})
app.get("/user",(req,res)=>
{
  res.send({firstname:"kavya", secondname:"ms"});
})

app.post("/user",(req,res)=>
{
  res.send("data saved successfully");
})

app.delete("/user",(req,res)=>
{
  res.send("data deleted");
})
app.listen(7777,()=>console.log("server is running on 7777 port"))
