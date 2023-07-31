const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql')
const db = mysql.createPool({

    "mysqlOptions": {
      "authProtocol": "default"
    },

    "host": "localhost",
    "port": 3306,
    "driver": "MySQL",
    "database": "cruddatabase",
    "user": "sqluser",
    "name": "SQLConnection",
    "password": "password"
  }

);
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get',(req, res) => {
    const Username = req.body.UserName
    const Password = req.body.PassWord

    const sqlSelect = "SELECT * FROM user";
    
    db.query(sqlSelect, [ Username, Password], (err, result) => {
        console.log(result);
    });
})

app.post("/api/insert", cors(), async(req, res) => {
    const Username = req.body.UserName
    const Password = req.body.PassWord

    const sqlInsert = `
        INSERT INTO users ( Username, Password)
        VALUES (?, ? );
    `;

    db.query(sqlInsert, [ Username, Password], (err, result) => {
        console.log(result);
        res.send('Hello World');
    })
})

app.post("/api/login", (req, res) => {

    const username = req.body.UserName;
    const password = req.body.PassWord;
    console.log("username: ", username);
    console.log("password: ", password);

    db.query(`
        SELECT * FROM users WHERE 
        Username = ? AND Password = ?
        `,
        [req.body.UserName, req.body.PassWord],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else{
                if (result.length > 0) {
                    res.send({ message: "Welcome "+ req.body.UserName });
                }
                else{
                    res.send({message: "Wrong Username/Password Combination"});
                    console.log('Incorrect Username/Password');
                }
            }
        }
    ) 

});

app.delete("/api/delete", cors(), (req, res) => {

    const Username = req.body.UserName

    const sqlDelete = `
        DELETE FROM user (Username)
        WHERE Username = ?
    `;

    db.query(sqlDelete, [Username])

}) 

app.put("/api/update", cors(), (req, res) => {

    const Username = req.body.UserName

    const sqlUpdate = `
        UPDATE SET user (Username)
        WHERE Username = ?
    `;
    db.query(sqlUpdate, [Username])
})

app.listen(3001, () => {

    console.log('running on port 3001');

})