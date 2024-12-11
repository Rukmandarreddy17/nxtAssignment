const express = require("express");
const path = require("path");
const cors = require("cors");

const bcrypt = require('bcrypt');
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;
app.use(express.json());


const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.use(cors());
app.get('/locations', async (req, res) => {
    try {
        const getLocationsQuery=`
        select distinct location from technician;
        `
        const result = await db.all(getLocationsQuery);
       res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.get('/appliances',async (req,res)=>{
    try{
        const getAplliancesQuery=`
        select * from appliance_types;
        `
        const result=await db.all(getAplliancesQuery);
        res.send(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
})

app.get('/featured-technicians', async (req, res) => {
    try {
        
        const getTechniciansQuery = `
            SELECT * FROM technician 
        `;

        const result = await db.all(getTechniciansQuery); 
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});


app.post("/userLogin", async (request, response) => {
    const { email, password } = request.body;
    const selectUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      response.status(400);
      response.send("Invalid User");
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
        response.send("Login Success!");
      } else {
        response.status(400);
        response.send("Invalid Password");
      }
    }
  });

  app.post("/technicianLogin", async (request, response) => {
    const { name} = request.body;
    const selectUserQuery = `SELECT * FROM technician WHERE name = '${name}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      response.status(400);
      response.send("Invalid User");
    } else {
      
        response.send("Login Success!");
      
    }
  });  