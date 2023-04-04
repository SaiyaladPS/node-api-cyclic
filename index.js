const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const db = new sqlite3.Database("./database/JSPH.db");

app.get('/users', (req, res) => {
  db.all("SELECT * FROM JSPH", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

app.post('/create', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const tel = req.body.tel;
  db.run('INSERT INTO JSPH (fname, lname, email, tel) VALUES (?, ?, ?, ?)', [fname, lname, email, tel], function(err) {
    if (err) {
      console.error(err.message);
    } else {
      res.send('Data inserted successfully');
    }
  });
});

app.post('/delete', (req, res) => {
  const id = req.body.id;
  db.run('DELETE FROM JSPH WHERE id =?', [id], (err, result)=> {
    if (err) {
      console.error(err.message);
    } else {
      res.send('Data deleted successfully');
    }
  })
})

app.post('/edit', (req, res) => {
  const id = req.body.idE;
  db.all('SELECT * FROM JSPH WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (!row) {
      res.status(404).send('Record not found');
    } else {
      res.send(row);
    }
  });
});

const server = app.listen(3001, () => {
  console.log(`Server running on port ${server.address().port}`);
});

module.exports = app