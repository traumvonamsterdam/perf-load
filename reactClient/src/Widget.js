import React from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./widget.css";

const Widget = props => {
  const {
    macA,
    isActive,
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuModel,
    numCores,
    cpuSpeed,
    cpuLoad
  } = props.data;

  const cpuWidgetId = `cpu-widget-${macA}`;
  const memWidgetId = `mem-widget-${macA}`;

  const cpu = { cpuLoad, cpuWidgetId };
  const mem = {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    memWidgetId
  };

  const info = {
    macA,
    osType,
    upTime,
    cpuModel,
    numCores,
    cpuSpeed
  };
  
  let notActiveDiv = "";
  if (!isActive) {
    notActiveDiv = <div className="not-active">Offline</div>;
  }

  return (
    <div className="widget col-sm-12">
      {notActiveDiv}
      <Cpu cpuData={cpu} />
      <Mem memData={mem} />
      <Info infoData={info} />
    </div>
  );
};

export default Widget;
