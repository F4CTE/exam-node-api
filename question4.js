
//imports ne respectent pas la syntax es6
// const express = require("express");
import express from 'express'

import User from '../models/User.js'

const app = express();
//uri ne ne respecte pas les principes rest + mauvais type de requete get en lieu et place de post + status code manquant + appelle au service d'enregistrement manquant
// app.get("/addUser", (req, res) => {
//     res.send("User added");
// });

app.post("/user", async (req, res) => {
    const user = await User.create(req.body)
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({message: "error while creating newx user"})
    }
});

//uri invalide + status code manquant + appelle au service de supression manquant
// app.delete("/deleteUser", (req, res) => {
//     res.send("User deleted");
// });

app.delete("/user/:id", (req, res) => {
    User.findByIdAndDelete(res.params.id)
    //appeler un service qui se chargera d'eefectuer la suppression
    res.status(200).json({message: "User deleted"});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});