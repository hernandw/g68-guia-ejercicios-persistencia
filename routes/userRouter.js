import express from "express";
import axios from "axios";
import fs from "fs";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/random", async (req, res) => {
  const { data } = await axios.get("https://randomuser.me/api");
  const usuario = data.results[0];

  const userRamdom = {
    name: usuario.name.first,
    lastName: usuario.name.last,
    email: usuario.email,
  };

  const { users } = JSON.parse(fs.readFileSync("data/usuarios.json", "utf-8"));
  users.push(userRamdom);

  fs.writeFileSync("data/usuarios.json", JSON.stringify({ users }));

  res.send("archivo creado");
});

router.get("/myname", (req, res) => {
  const person = {
    name: "Juan Jose",
    lastname: "Roberts",
    age: 30,
    email: "juan.roberts@example.com",
  };

  const { name, lastname, age } = person



  fs.writeFileSync("data/person.json", JSON.stringify(person));
  console.log(`Mi nombres es: ${name} y mi apellido es ${lastname} y mi edad es ${age}`);
  res.send("archivo creado");
});



export default router;
