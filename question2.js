//import ne respecte pas la syntax es6
//const express = require("express");
// const jwt = require("jsonwebtoken");
import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js'
import dotenv from 'dotenv'
import generateToken from "../config/jwt.js";


//charge les variables d'environement depuis la fichier .env
dotenv.config()

const app = express();
//async await manquant
app.post("/login", async (req, res) => {

    //les informations d'authentification doivent etre resuperer dpuis la requete + les donnee utiliser ne permetent pas une authentification securisé
    // const user = { id: 1, username: "john" };
    const { email, password } = req.body;

    //recuperation de l'utilisateur
    const user = await User.findOne({email})

    if(!user) {
        res.status(401).json({message: 'wrong credentials'})
    }

    if (!user.matchPassword(password)) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    // should use the secret key from dotEnv + mauvaise methode pour generer le token
    // const token = jwt.sign(user, "secretkey");
    const token = generateToken(user, process.env.JWT_SECRET)
    //status code manquant
    // res.json({ token });
    res.status(200).json({token: token})
});

app.get("/protected", (req, res) => {
    //cette ligne recupere le header entier au lieu du token
    // const token = req.headers["authorization"];
    const token = req.header('Authorization').replace('Bearer ', '');

    //doit utiliser la secret key provenant du fichier .env
    // jwt.verify(token, "secretkey", (err, decoded) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        //il vaux mieux avoir des message d'erreur explicite
        //     res.sendStatus(403);
        res.sendStatus(401).json({message: 'wrong credentials'})
        } else {
        //status code manquant
        //     res.json({ message: "Welcome to the protected route!" });
        res.status(200).json({message: "Welcome to the protected route!"})
        }
    });

});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});