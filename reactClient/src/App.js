import React, { useState, useEffect } from "react";
import "./App.css";
import socket from "./utilities/socketConnection";
import Widget from "./Widget";

const App = () => {
  const [perfData, setPerfData] = useState({});
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    socket.on("data", data => {
      const currentPerfData = { ...perfData };
      currentPerfData[data.macA] = data;
      setPerfData(currentPerfData);
    });
  }, []);

  useEffect(() => {
    console.log(perfData);

    const data = perfData;
    const newWidgets = [];
    Object.entries(data).forEach(([key, value]) => {
      console.log(key);
      newWidgets.push(<Widget key={key} data={value} />);
    });
    setWidgets(newWidgets);
  }, [perfData]);

  return <div className="App">{widgets}</div>;
};

export default App;
