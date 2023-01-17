const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArr = require("./InitialData");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student", (req, res) => {
    res.json({
        status: "success",
        data: studentArr
    })
})

app.get("/api/student/:id", (req, res) => {
    let flag = false;
    for(let i = 0; i < studentArr.length; i++){
        if(studentArr[i].id == req.params.id){
            res.json({
                status: "success",
                data: studentArr[i]
            })
            flag = true;
        }
    }
    if(!flag){
        res.status(404).send("ID IS NOT FOUND");
    }
})

app.post("/api/student", (req, res) => {
    const data = {...req.body, id: studentArr.length + 1}
    studentArr.push(data);
    res.json({
        status: "success",
        data: studentArr
    })
})

app.put("/api/student/:id", (req, res) => {
    let flag = false;
    for(let i = 0; i < studentArr.length; i++){
        if(studentArr[i].id == req.params.id){
            const data = {...studentArr[i], ...req.body};
            res.json(data);
            flag = true
        }
    }
    if(!flag){
        res.status(400).send("ID IS INVALID");
    }
})

app.delete("/api/student/:id", (req, res) => {
    let flag = false;
    const newArr = []
    for(let i = 0; i < studentArr.length-1; i++){
        if(studentArr[i].id != req.params.id){
            newArr.push(studentArr[i]);
            flag = true
        }
    }
    if(flag){
        res.json(newArr);
    }else{
        res.status(404).send("ID IS NOT FOUND");
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   