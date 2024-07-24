//import de ,e respect pas la syntax es6
// const express = require("express");
import express from 'express'

import User from '../models/User.js'

const app = express();

//uri invalide creation de l'utilsateur inexistante + asyc awiat manquant
// app.get("/addUser", (req, res) => {
//     res.send("User added");
// });

app.get("/addUser", async (req, res) => {
    const user = await User.create(req.body)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(500).json({message: "error while creating new user"})
    }
});

//uri ne respecte pas le principe rest appelle au service de supression inexistanta async await manquant + id de l'entite a suprimer manquant
// app.delete("/deleteUser", (req, res) => {
//     res.send("User deleted");
// });

app.delete("/user/:id", async (req, res) => {
    await User.findByIdAndDelete(res.params.id)
    res.status(200).json({message:"User deleted"});
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});