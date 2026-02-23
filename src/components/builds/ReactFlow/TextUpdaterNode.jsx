import React from "react";
import customCSS from "./rf.module.css";
import { Handle, Position } from "@xyflow/react";

export default function TextUpdaterNode({ id, data }) {
  return (
    <div className={customCSS["custom-text-updater-node"]}>
      <Handle type="target" position={Position.Left} />

      <div>
        <label htmlFor={`text-${id}`}>Text:</label>
        <input
          id={`text-${id}`}
          name="text"
          value={data?.value || ""}
          onChange={(evt) => data?.onTextChange?.(id, evt.target.value)}
          className={customCSS["custom-text-input"]}
          placeholder="Type here..."
        />
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}