require('dotenv').config();

//Path where the JSON data is stored
const PhraseData=require('./phrasesdata.json')

//Connection Parameters

const url ='mongodb://database.BasicPhrases.com:27018?authMechanism=MONGODB-X509&tls=true'

//Connecting to MongoDB database by authenticating the system with .X509 security
const client=new require('mongodb').MongoClient(url,{
  tlsAllowInvalidHostnames:true,
  tlsAllowInvalidCertificates: true,
  tlsCertificateKeyFile: process.env.MONGODB_CLIENT_CERT_PEM,
  tlsCAFile:process.env.MONGODB_ROOT_CRT,
  useUnifiedTopology: true,
})

//Database name
const dbName='BasicPhrases'


module.exports=new Promise((resolve,reject)=>{
    //Connecting to already running Database
    client.connect((err)=>{
        if(err){
            console.log(err)
            reject(err)
            return
        }
        console.log("Connected to Basic Phrases database successfully")
        const db = client.db(dbName)
        db.dropCollection('phrases').then((result)=>{
            //Storing the data in phrases collection
            for(i=0;i<PhraseData.length;i++){
                db.collection("phrases").insertOne(PhraseData[i])
            }
            resolve(db)
        }).catch((err)=>{
            reject(err)
        })
        
    })
})


