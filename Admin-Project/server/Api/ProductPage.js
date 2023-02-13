const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json());


const mysql = require('mysql2')
const connection = mysql.createConnection('mysql://sle0i47x5gssphix9sif:pscale_pw_VIULuyD0nuH1z9lDFB9E3h9VU9sNjxcEwMcUXGE87Bw@ap-southeast.connect.psdb.cloud/allonline?ssl={"rejectUnauthorized":true}')

connection.connect();


app.get('/ProductPage', function (req, res, next) {
    connection.query('SELECT * FROM allonline.product', function (error, results, fields) {
        if (error) {
            console.log(err)
        } else{
        res.json(results)
        }
      });
})

app.get("/employee", (req, res) => {
  db.query("select * from employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "insert into employee (name, age, country, position, wage) values(?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted successfully");
      }
    }
  );
});

app.put('/update', (req, res) =>{
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("update employee set wage = ? where id = ?", [wage, id], (err, result) =>{
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id;
    db.query("delete from employee where id = ?", id, (err, result) =>{
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
})

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})