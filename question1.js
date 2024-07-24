

//import ne respecte pas la syntax es6
// const express = require("express");

import express from 'express'

//import de User manquant
import User from './models/User.js'

const app = express();

app.get("/users", (req, res) => {
    //la logique devrait etre deplacer pour respecter la separation of concern
    const users = [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 30 },
    ];
    //status code manquant
    // res.json(users);
    res.status(200).json(users)
});
app.post("/users", (req, res) => {
    //la logique devrait etre deplacer pour respecter la separation of concern
    const newUser = req.body;
    //pour ajouter un utilisateur dans la DB il faut utiliser User et sa methode create
    //users.push(newUser);
    const user = User.create(newUser)
    //gestion des erreurs
    if (user) {
        res.status(201).json(user);
    }else {
        res.status(500).json({message: 'error while creating new user'})
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});