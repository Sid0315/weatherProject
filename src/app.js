const express = require ("express");
const app = express();
const path = require('path');
const hbs = require("hbs");
const port = process.env.PORT || 2000 ;



//public static path
const staticPath = path.join(__dirname, "../public");
const pathTemplates =  path.join(__dirname, "../templates/views");
const pathPartials =  path.join(__dirname, "../templates/partials");


hbs.registerPartials(pathPartials);
app.set('view engine', 'hbs');
app.set("views", pathTemplates)
app.use(express.static(staticPath));

//routing
app.get("", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMsg : 'opps! page not found',
    });
});

app.listen(port, () => {
console.log(`server is runnig at ${port}`);
});