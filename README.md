# BasicPhrases-Sharding  
Check the following files for information about the project-:  
1) Connect.js => How our api is connecting to the running mongoDB database?  
2) Server.js => How the api is serving the http request?  
3) allQueries.js => How the api is delivering the result to the query?  
4) conf => All the configuration file used to launch mongod processes.
5) init-shard.sh => How in our database sharding is being set-up?  
  
# How to test the api?  
1) clone the repository.
2) Run command => sudo apt install mongodb (if not install)  
3) Run command => sudo apt install nodejs (if not install)  
4) Run command => sudo apt install npm  
5) Now move to directory Basic phrases.  
6) Run command => npm i mongodb -y  
7) Run command => npm i express -y  
8) Now to set-up sharding => Run command => sudo bash init-shard.sh  => you will messages telling the status.
9) Now run => node server.js  => you will messages telling the status.
10) To test go to this url => http://localhost:3000/Query1?country=Japan => you will see json result in your browser.
