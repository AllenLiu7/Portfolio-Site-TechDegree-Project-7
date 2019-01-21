const express = require("express");
const app = express();

const { projects } = require('./data.json');


app.use('/static', express.static('public'));


app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render('index', {projects});
})

app.get("/about", (req, res) => {
    res.render('about');
})

app.get("/:id", (req, res) => {
    res.render('project', {
        projects,
        index: req.params.id
    });
})

app.listen(3000, () => {
    console.log("server running on port 3000");
});