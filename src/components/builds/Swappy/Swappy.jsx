import { useState } from "react";
import { ReactSortable } from "react-sortablejs";


export default function Swappy(props) {
  const [state, setState] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "donkey" },
    { id: 4, name: "puss" },
    { id: 5, name: "ginger" },
    
  ]);

  return (
    <ReactSortable list={state} setList={setState}>
      {state.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
};