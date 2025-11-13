const express = require('express')
const app = express()
const axios = require('axios')
let colours = [];
let httpCatStatusCode = 'https://http.cat/404'
let urlColour = 'https://colormagic.app/api/palette/search?q='

app.listen(3000, ()=>{
    console.log("Port 3000 allumé. Le serveur t'attend, thé à la main")
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res)=>{
    res.render('colour.ejs',  { colours });
})

app.get('/colour', (req, res)=>{
    res.render('colour', { colours })
})

app.post('/colour', async(req, res)=>{
    try {
        let {colour}  = req.body;
        let url = urlColour+colour.replaceAll(/ /g, '%20')
        colours = await axios(url)
        colours = colours.data;
        console.log(colours)
        res.render('colour', { colours })
    } catch(e){
        console.log("sorry", e);
        colours = "Try another colour!"
        res.render('colour', { colours })
    }
})

app.use((req, res) => {
    res.status(404).render("404", { httpCatStatusCode });
});
