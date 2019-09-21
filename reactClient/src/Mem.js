import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";

const Mem = props => {
  const { freeMem, totalMem, memUsage, memWidgetId } = props.memData;
  const canvas = document.querySelector(`.${memWidgetId}`);
  drawCircle(canvas, memUsage * 100);

  const totalMemInGB = Math.floor((totalMem * 100) / 1073741824) / 100;
  const freeMemInGB = Math.floor((freeMem * 100) / 1073741824) / 100;

  return (
    <div className="col-sm-3 mem">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas className={memWidgetId} width="200" height="200"></canvas>
        <div className="mem-text">{memUsage * 100}%</div>
      </div>

      <div>Total Memory: {totalMemInGB}GB</div>
      <div>Free Memory: {freeMemInGB}GB</div>
    </div>
  );
};

export default Mem;
