const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

const PORT = 5000



app.use(cors());
app.use(express.json());



const data = fs.readFileSync('./data.json', 'utf-8')
const parseData = JSON.parse(data)



app.get('/', (req,res) => {
    res.send('welcome to random user api')
})

app.get('/user/all', (req, res) => {
    res.json(parseData)
})



app.get('/user/random', (req, res) => {
    let arr = []
    let randomNumber = Math.floor((Math.random() * 12) + 1);
    parseData.map(person =>  arr.push(person))

    arr.map(i => {
        if (i.id == randomNumber) {
            res.json(arr[randomNumber-1])
        }
    })
})


app.post('/user/save', (req, res) => {
   
    if (!req.body.id || typeof (req.body.id) == 'string') {
        if (!req.body.id) {   
            res.send("id missing") 
        }
        else {
            res.send("id should be number type")
        }
    }
    else if (!req.body.name || typeof (req.body.name) == 'number'  )  {
        if (!req.body.name) {
            res.send("name information missing")
        }
        else {
            res.send("name should be string type")
        } 
    }
    else if (!req.body.contact || typeof (req.body.contact) == 'string'  )  {
        if (!req.body.contact) {
            res.send("contact information missing")
        }
        else {
            res.send("contact  should be number type")
        } 
    }
    else if (!req.body.gender || typeof (req.body.gender) == 'number') {
        if (!req.body.gender) {
            res.send("gender information missing") 
        }
        else {
            res.send("gender should be string type")
        }  
    }
    else if (!req.body.address || typeof (req.body.address) == 'number') {
        if (!req.body.address) {
            res.send("address information missing")
        }
        else {
            res.send("address should be string")
        }   
    }
    else if (!req.body.photoUrl || typeof (req.body.photoUrl) == 'number') {
        if (!req.body.photoUrl) {  
            res.send("photoUrl information missing")
        }
        else {
            res.send("provide a valid photoUrl")
        }
    } else {


      let data =   fs.readFileSync('./data.json')
            let jsonData = JSON.parse(data)

            let notAvailable = true;
            jsonData.map(i => {
                if (i.id == req.body.id) {
                    notAvailable = false
                }
            })
            
            if (notAvailable) {
                const userData = {
                    "id": req.body.id,
                    "gender": req.body.gender,
                    "name": req.body.name,
                    "contact": req.body.contact,
                    "address": req.body.address,
                    "photoUrl": req.body.photoUrl
                }
    
                jsonData.push(userData)
                fs.writeFileSync('./data.json', JSON.stringify(jsonData)) 
                res.send('Data added successfully')  
            } else {
                res.send("This id already available.")
            }  
         
    }
})




app.patch('/user/update', (req, res) => {

    if (!req.body.id || typeof (req.body.id) == 'string') {
        if (!req.body.id) {   
            res.send("id missing") 
        }
        else {
            res.send("id should be number type")
        }
    } else {
        const userData = {
            "id": req.body.id,
            "gender": req.body.gender,
            "name": req.body.name,
            "contact": req.body.contact,
            "address": req.body.address,
            "photoUrl": req.body.photoUrl
        }
    
        fs.readFile('./data.json', (err, data) => {
            let jsonData = JSON.parse(data)
            let isAvailable = false;
            jsonData.map(i => {
                if (i.id == req.body.id) {
                    isAvailable = true
                }
            })
            if (isAvailable) {
                let filteredData = jsonData.filter(i=> i.id !== req.body.id)
                filteredData.push(userData)
                fs.writeFile('./data.json', JSON.stringify(filteredData), (err) => {
                    if (!err) {
                        res.send("Data updated successfully.")
                    }
                }) 
            } else {
                res.send("This id not available.")
            }
        })
    }  
})





app.delete('/user/delete', (req, res) => {
    if (!req.body.id || typeof (req.body.id) == 'string') {
        if (!req.body.id) {   
            res.send("id missing") 
        }
        else {
            res.send("id should be number type")
        }
    } else {
        fs.readFile('./data.json', (err, data) => {
            let jsonData = JSON.parse(data)
            let isAvailable = false;
            jsonData.map(i => {
                if (i.id == req.body.id) {
                    isAvailable = true
                }
            })

            if (isAvailable) {
                let filteredData = jsonData.filter(i=> i.id !== req.body.id)
                fs.writeFile('./data.json', JSON.stringify(filteredData), (err) => {
                    if (!err) {
                        res.send("Data deleted successfully.")
                    }
                }) 
            }
            else {
                res.send("This id not available.") 
            }
        })
    }
})







app.listen(PORT);