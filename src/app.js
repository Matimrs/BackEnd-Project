import express from "express";

const PORT = 8080;
const app = express();
app.use(express.urlencoded({extended: true}));

app.get('/bienvenido', (req,res) => {
    res.send("<h1 style='color: blue'>Bienvenido</h1>");
})

app.get('/bienvenido/:name', (req,res) => {
    const {name} = req.params;
    res.send("<h1 style='color: blue'>Bienvenido " + name +"</h1>");
})

app.get('/users', (req,res) => {
    const {name} = req.query;
    res.send("<h1 style='color: blue'>Bienvenido " + name +"</h1>");
})


app.listen(PORT, () => {
    console.log(`Esperando entrada en puerto: ${PORT}`);
});