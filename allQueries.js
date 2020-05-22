
//Query 1
getByCountry=(country)=>{
    return new Promise((resolve,reject)=>{
        require('./connect').then((db)=>{
            db.collection('phrases').find({"ID":country}).toArray((error,result)=>{
                if(error){
                    reject({error:"Query Can't be executed"})
                    return
                }
                resolve(result.slice(0,1000))
            })
        }).catch((err)=>{
            reject({error:"Query Can't be executed",Description:err})
        })
    })
}

//Query 2
getDescriptionNull=(country)=>{
    return new Promise((resolve,reject)=>{
        require('./connect').then((db)=>{
            db.collection('phrases').find({"ID":country}).toArray((error,result)=>{
                if(error){
                    reject({error:"Query Can't be executed"})
                    return
                }
                for(i=0;i<result.length;i++){
                    if(result[i].Description.length>=5){
                        result.splice(i,1)
                    }
                }
                resolve(result.slice(0,1000))
            })
        }).catch((err)=>{
            reject({error:"Query Can't be executed",Description:err})
        })
    })
}

//Query 3
getTranslationPhrases=(translation)=>{
    return new Promise((resolve,reject)=>{
        require('./connect').then((db)=>{
            db.collection('phrases').find({}).toArray((error,result)=>{
                if(error){
                    reject({error:"Query Can't be executed"})
                    return
                }
                const words=translation.split(' ')
                console.log(words)
                var finalResult=[]
                for(i=0;i<result.length;i++){
                    const wordsTranslate=result[i].Translated.split(' ')
                    var isPresent=false
                    for(j=0;j<words.length;j++){
                        for(k=0;k<wordsTranslate.length;k++){
                            if(wordsTranslate[k].trim().toLowerCase()===words[j].trim().toLowerCase()){
                                isPresent=true
                                break
                            }
                        }
                    }
                    if(isPresent){
                        finalResult.push(result[i])
                    }
                    if(i>1000){
                        break
                    }
                }
                resolve(finalResult)
            })
        }).catch((err)=>{
            reject({error:"Query Can't be executed",Description:err})
        })
    })
}

//Query 4
getTranslationList=()=>{
    return new Promise((resolve,reject)=>{
        require('./connect').then((db)=>{
            db.collection('phrases').find({}).toArray((error,result)=>{
                if(error){
                    reject({error:"Query Can't be executed"})
                    return
                }
                for(i=0;i<result.length;i++){
                    delete result[i].Native
                    delete result[i].English
                    delete result[i].Description
                }
                resolve(result.slice(0,1000))
            })
        }).catch((err)=>{
            reject({error:"Query Can't be executed",Description:err})
        })
    })
}

//Query 5
putNewPhrase=(fields)=>{
    return new Promise((resolve,reject)=>{
        require('./connect').then((db)=>{
            if(fields.ID.length<2||fields.Native.length<2||fields.English.length<2||fields.Translated.length<2){
                resolve({
                    "message":"Data entered is wrong, Insertion is not successful"
                })
            }else{
                db.collection('phrases').insertOne(fields)
                resolve({
                    "message":"inserted Successfully"
                })
            }
        }).catch((err)=>{
            reject({error:"Insertion Failed",Description:err})
        })
    })
}

module.exports={
    putNewPhrase,
    getByCountry,
    getDescriptionNull,
    getTranslationPhrases,
    getTranslationList
}