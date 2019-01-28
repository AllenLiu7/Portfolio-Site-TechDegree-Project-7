const express = require("express");
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


const { projects } = require('./data.json');


app.use('static', express.static('public'));


app.set("view engine", "pug");

app.get("", (req, res) => {
    res.render('index', {projects, port});
})

app.get("about", (req, res) => {
    res.render('about', {port});
})

app.get("projects/:id", (req, res) => {
    res.render('project', {
        projects,
        index: req.params.id,
        port
    });
})


app.listen(port);
