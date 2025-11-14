import axios from 'axios';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module replacements for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let colours = [];
let httpCatStatusCode = 'https://http.cat/404';
let urlColour = 'https://colormagic.app/api/palette/search?q=';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(3000, () => {
    console.log("Port 3000 allumé. Le serveur t'attend, thé à la main");
});

app.get('/', (req, res) => {
    res.render('colour.ejs', { colours });
});

app.get('/colour', (req, res) => {
    res.render('colour', { colours });
});

app.post('/colour', async (req, res) => {
    try {
        let { colour } = req.body;
        let url = urlColour + colour.replaceAll(/ /g, '%20');

        let response = await axios(url);
        colours = response.data;

        console.log(colours);
        res.render('colour', { colours });
    } catch (e) {
        console.log("sorry", e);
        colours = "Try another colour!";
        res.render('colour', { colours });
    }
});

app.use((req, res) => {
    res.status(404).render("404", { httpCatStatusCode });
});
