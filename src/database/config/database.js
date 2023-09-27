const db = require("../models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB!");
  })
  .catch(err => {
    console.log("Desconectado de la base de datos!", err);
    process.exit();
  });