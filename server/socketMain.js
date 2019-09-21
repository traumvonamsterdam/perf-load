const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/perfData", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Machine = require("./models/Machine");

const socketMain = (io, socket) => {
  let macA;
  socket.on("clientAuth", key => {
    if (key === "98adfs79asd685asd7f9") {
      // Valid node client
      console.log("Valid client");
      socket.join("clients");
    } else if (key === "adsf87637uj3o9") {
      // Valid ui client
      socket.join("ui");
      console.log("A react client has joined!");
      Machine.find({}, (err, docs) => {
        docs.forEach(aMachine => {
          aMachine.isActive = false;
          io.to("ui").emit("data", aMachine);
        });
      });
    } else {
      // Client is invalid
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", () => {
    Machine.find({ macA }, (err, docs) => {
      docs[0].isActive = false;
      if(docs.length > 0) {
        io.to('ui').emit('data', docs[0])
      }
    })
  });

  socket.on("initPerfData", async data => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log(mongooseResponse);
  });

  socket.on("perfData", data => {
    console.log("Tick...");
    io.to("ui").emit("data", data);
  });
};

const checkAndAdd = data => {
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw error;
        reject(err);
      } else if (doc === null) {
        let newMachine = new Machine(data);
        newMachine.save();
        resolve("added");
      } else {
        resolve("found");
      }
    });
  });
};

module.exports = socketMain;
