const express = require("express");
const app = express();
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/:id",async (req, res) =>{
    const id = req.params.id
    const allUser =await prisma.Users.findUnique({
        where:{
        id: id
        },
    })
    res.json(allUser);
})
app.post("/",async (req, res) =>{
   
    const newUsers =await prisma.Users.create({
        data: req.body
    });
    res.json(newUsers);
});

app.put("/:id",async (req, res) =>{
    const id = req.params.id
    const newGender = req.body.gender
    const updateUsers =await prisma.Users.update({
        where:{
            id: id
        },
        data:{
            gender:newGender
        }
    });
    res.json(updateUsers);
});

app.delete("/:id",async (req, res) =>{
    const id = req.params.id
    const dltUsers =await prisma.Users.delete({
        where:{
        id: id
    }});
    res.json(dltUsers);
});

app.listen(3001, () => {
    console.log("Running on port 3001");
  });

//   app.listen(3001, () => console.log(`Running on port $(3001)`));
  