# BasicPhrases-Sharding  
Check the following files for information about the project-:  
1) Connect.js => How our api is connecting to the running mongoDB database?  
2) Server.js => How the api is serving the http request?  
3) allQueries.js => How the api is delivering the result to the query?  
4) conf => All the configuration file used to launch mongod processes.
5) init-shard.sh => How in our database sharding is being set-up?  
  
# How to test the api?  
1) clone the repository.
2) Run command => echo '127.0.0.1 database.BasicPhrases.com' | sudo tee --append /etc/hosts  
3) Run command => sudo apt install mongodb (if not install)   
4) Run command => sudo apt install nodejs (if not install)   
5) Run command => sudo apt install npm . (if not install)   
6) Now move to directory Basic phrases-sharding.
7) Run command => npm i mongodb -y or npm i mongodb  
8) Run command => npm i express -y or npm i express  
9) Now to set-up sharding => Run command => sudo bash init-shard.sh  => See the console messages for progress.
10) Now run => node server.js  => See the console messages for progress.
11) To test go to this url => http://localhost:3000/Query1?country=Japan => you will see json result in your browser.
