const express = require("express");
const app = express();

//adjust to correct code when using Heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// link to data.json, set it to variable 'projects'
const { projects } = require('./data.json');

//link to public folder for static setting
app.use('/static', express.static('public'));

//use pug as engine
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render('index', {projects, port});
})

app.get("/about", (req, res) => {
    res.render('about', {port});
})

//set :id to the 'index' variable for dynamic setting in pug
app.get("/projects/:id", (req, res) => {
    res.render('project', {
        projects,
        index: req.params.id,
        port
    });
})

//set up the 'not found' error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//render the error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});


app.listen(port, () => console.log(`listening on port ${port}!`));