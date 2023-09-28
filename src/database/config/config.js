// module.exports =  {
//     "development": {
//         "mongoUrl": "mongodb://localhost:27017/rocketfy_backend_db",
//         "dialect": "mongodb"
//     },
//     "test": {
//         "mongoUrl": "mongodb://localhost:27017/rocketfy_backend_db_test",
//         "dialect": "mongodb"
//     },
//     "production": {
//         "mongoUrl": "mongodb://localhost:27017/rocketfy_backend_db_production",
//         "dialect": "mongodb"
//     }
// }


const uri = process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/rocketfy_backend_db";
module.exports =  {
    "url": uri
}
