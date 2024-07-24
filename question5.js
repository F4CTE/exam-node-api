import express from "express";
const app = express();

//reponse n'est pas au format json + status code manquant
app.get("/hello", (req, res) => {
    res.status(200).json({message: "Hello, World!"});
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//export inutile
// module.exports = app;
