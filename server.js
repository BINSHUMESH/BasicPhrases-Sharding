const path=require('path')
const express=require('express')
const app=express()

const publicDirectoryPath=path.join(__dirname+'/public')

app.use(express.static(publicDirectoryPath))

allQueries=require('./allQueries')

//It will connect and store the data in database by calling connect.js file.
require('./connect').then((db)=>{
    if(db){
        console.log("connection is successful")
    }
}).catch((error)=>{
    console.log(error)
})

//End-point for Query 1
app.get('/Query1',async (req,res)=>{
    const Query=req.query
    try{
        const data=await allQueries.getByCountry(Query.country)
        res.send(data)
    }catch{
        res.send("Some error occured while executing the query")
    }
})

//End-point for Query 2
app.get('/Query2',async (req,res)=>{
    const Query=req.query
    try{
        const data=await allQueries.getDescriptionNull(Query.country)
        res.send(data)
    }catch{
        res.send("Some error occured while executing the query")
    }
})

//End-point for Query 3
app.get('/Query3',async (req,res)=>{
    const Query=req.query
    try{
        const data=await allQueries.getTranslationPhrases(Query.word)
        res.send(data)
    }catch{
        res.send("Some error occured while executing the query")
    }
})

//End-point for Query 4
app.get('/Query4',async (req,res)=>{
    try{
        const data=await allQueries.getTranslationList()
        res.send(data)
    }catch{
        res.send("Some error occured while executing the query")
    }
})

//End-point for Query 5
app.get('/Query5',async (req,res)=>{
    const fields=req.query
    try{
        const obj={
            "Native":fields.native,
            "ID":fields.id,
            "English":fields.english,
            "Translated":fields.translated,
            "Description":fields.description
        }
        const data=await allQueries.putNewPhrase(obj)
        res.send(data)
    }catch{
        res.send("Some error occured while executing the query")
    }
})

//This will start the server on port 3000 and local host
app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})
