const os = require("os");
const io = require("socket.io-client");
let socket = io("http://localhost:8181");

socket.on("connect", () => {
  // console.log("I connected to the socket server, hooray!");
  const nI = os.networkInterfaces();
  let macA;
  for (let key in nI) {
    
    // Testing
    macA = Math.floor(Math.random() * 3) + 1;
    break;

    if (!nI[key][0].internal) {
      if (nI[key][0].mac === "f8:34:41:1f:28:40") {
        macA = Math.random()
          .toString(36)
          .substr(2, 15);
      } else {
        macA = nI[key][0].mac;
      }
      break;
    }
  }

  // Client auth with single key value
  socket.emit("clientAuth", "98adfs79asd685asd7f9");

  // Run 'initPerfData' once
  performanceData().then(allPerformanceData => {
    allPerformanceData.macA = macA;
    socket.emit("initPerfData", allPerformanceData);
  });

  // Run 'perfData' every second
  let perfDataInterval = setInterval(() => {
    performanceData().then(allPerformanceData => {
      allPerformanceData.macA = macA;
      socket.emit("perfData", allPerformanceData);
    });
  }, 1000);

  // Clear interval when connection gets disrupted
  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
  });
});

const performanceData = async () => {
  const cpus = os.cpus();

  const osType = os.type() == "Darwin" ? "Mac" : os.type();

  const upTime = os.uptime();

  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;
  const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;

  const numCores = cpus.length;
  const cpuModel = cpus[0].model;
  const cpuSpeed = cpus[0].speed;
  const cpuLoad = await getCpuLoad();
  const isActive = true;
  return {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuModel,
    numCores,
    cpuSpeed,
    cpuLoad,
    isActive
  };
};

const cpuAverage = () => {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach(aCore => {
    for (type in aCore.times) {
      totalMs += aCore.times[type];
    }
    idleMs += aCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length
  };
};

const getCpuLoad = () => {
  return new Promise(resolve => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;

      const percentageCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      resolve(percentageCpu);
    }, 100);
  });
};

// const allPerformanceData = await performanceData()
// console.log(allPerformanceData)
