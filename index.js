const express = require('express')
const app = express()
const fs = require('fs')

const data = fs.readFileSync('./data.json', 'utf-8')
const parseData = JSON.parse(data)



app.get('/', (req,res) => {
    res.send('welcome to random user api')
})

app.get('/user/all', (req,res) => {
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

app.listen(5000);