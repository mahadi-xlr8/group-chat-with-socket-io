require("dotenv").config();
const express = require("express");
const app = express();
const back = require("./server");

app.use(express.json());

app.post("/login", (req, res) => {
  async function temp() {
    await back.addUser(req.body.username, req.body.password);
  }
  temp();
  res.status(200).send("new user added!");
});

// TODO: finish this part
app.post("/login/validate", (req, res) => {
  async function temp() {
    const lol = await back.validateUser(req.body.username, req.body.password);
    res.send(lol);
  }
  temp();
});
app.get("/chat/all",(req,res)=>{
  async function temp(){
    const chats=await back.getText()
    res.json(chats)
  }
  temp()
})


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}...`));
