const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());


app.get('/', (req, res) => {
    console.log("Hello World");
});







app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


