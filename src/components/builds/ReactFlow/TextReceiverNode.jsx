import React from "react";
import customCSS from "./rf.module.css";
import { Handle, Position } from "@xyflow/react";

export default function TextReceiverNode({ data }) {
  return (
    <div className={customCSS["custom-text-updater-node"]}>
      <Handle type="target" position={Position.Left} />
      
      <div>
        <p>Received: {data?.value || "Waiting for text..."}</p>
      </div>

      {/* Optional: keep source too if receiver can also output */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}