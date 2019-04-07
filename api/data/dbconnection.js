var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017';
var _connection = null;
var open = ()=>
{
    MongoClient.connect(dburl,(err,client)=>
    {
        if(err)
        {
            console.log("error in connecting db");
            return;
        }
        else{
            var db = client.db('mylib');
            _connection = db;
            return _connection;
        }
    });
};
var get = ()=>
{
    return _connection;
};

module.exports = {
    open:open,
    get:get
}; 