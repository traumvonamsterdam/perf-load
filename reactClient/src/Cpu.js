import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";

const Cpu = props => {
  const { cpuLoad, cpuWidgetId } = props.cpuData

  const canvas = document.querySelector(`.${cpuWidgetId}`);
  drawCircle(canvas, cpuLoad);
  console.log(props);
  return (
    <div className="col-sm-3 cpu">
      <h3>CPU load</h3>
      <div className="canvas-wrapper">
        <canvas className={cpuWidgetId} width="200" height="200"></canvas>
        <div className="cpu-text">{cpuLoad}%</div>
      </div>
    </div>
  );
};

export default Cpu;
