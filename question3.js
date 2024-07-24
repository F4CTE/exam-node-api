//imports ne respectent pas la syntax es6
// const express = require("express");
// const mongoose = require("mongoose");
import express from 'express'
import mongoose from 'mongoose'

//ajout import de dotenv
import dotenv from 'dotenv'

//chargement des variables d'environement
dotenv.config()

const app = express();

// l'url de connexion n'est pas bonne (port manquant et '/test' en trop) + cette url doit provenir du fichier .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

//la declaration d'un model doit se faire dans un autre fichier dans le dossier models (separation of concern)
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
const User = mongoose.model("User", userSchema);

//ajout d'async et await
app.post("/users", async (req, res) => {
    const user = new User(req.body);

    //option error inexistante ?!
    // const newUser = await user.save((err) => {
    //     if (err) return res.status(500).send(err);
    //     res.status(201).send(user);
    // });

    if (!user) {
        res.status(500).json({message: 'error while creating new user'})
    } else {
        res.status(201).send(user);
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
