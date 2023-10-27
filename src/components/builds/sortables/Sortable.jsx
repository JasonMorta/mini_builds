import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import CSS from "./sort.module.css";
import { Alert } from "bootstrap";
import { ListGroup } from "react-bootstrap";

export default function Sortable() {
  //list 1
  const [list, setList] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "donkey" },
    { id: 4, name: "dragon" },
  ]);

  //list 2
  const [list2, setList2] = useState([
    { id: 13, name: "Goku" },
    { id: 23, name: "Vegeta" },
    { id: 33, name: "Piccolo" },
    { id: 43, name: "Gohan" },
  ]);

  const handleMouseUp = () => {
    console.log("list ", list);
    console.log("list2 ", list2);
  };
  return (
    <div className={CSS.main_sortable}>
      <h1>Sortables</h1>
      <ListGroup>
        {/* sortable options */}
        <ReactSortable
          className={CSS.sortable}
          list={list} // set the list to the state
          setList={setList} // set the new state of the list
          animation={200} // animation speed when dragging an item
          delay={2} // delay for touch devices
          delayOnTouchStart={true}
          delayOnTouchEnd={true}
          swapThreshold={1}
          group={{
            // set the group. Can have multiple lists with same group
            name: "shared", // set both lists to same group
            put: true, // Set to false to disable drag from other lists

          }}
          ghostClass={CSS.ghost} // Class name for the drop placeholder
          chosenClass="chosen" // Class name for the chosen item
          onEnd={handleMouseUp} // onEnd event handler for when the item is dropped
          onChange={(order, sortable, evt) => {
            //console.log(order);
          }}
        >
          {/* Sortable list */}
          {list.map((item) => (
            <ListGroup.Item
              className={CSS.item}
              variant={"primary"}
              key={item.id}
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ReactSortable>
      </ListGroup>

      <ListGroup>
        <ReactSortable
          className={CSS.sortable}
          list={list2} // set the list to the state
          setList={setList2} // set the new state of the list
          animation={200} // animation speed when dragging an item
          delay={2} // delay for touch devices
          delayOnTouchStart={true}
          swapThreshold={1}
          delayOnTouchEnd={true}
          group={{
            // set the group. Can have multiple lists with same group
            name: "shared", // set both lists to same group
            put: true, // Set to false to disable drag from other lists
          }}
          ghostClass="ghost" // Class name for the drop placeholder
          chosenClass="chosen" // Class name for the chosen item
          onEnd={handleMouseUp} // onEnd event handler for when the item is dropped
          onChange={(order, sortable, evt) => {
            //console.log(order);
          }}
        >
          {/* Sortable list */}
          {list2.map((item) => (
            <ListGroup.Item
              variant={"success"}
              className={CSS.item}
              key={item.id}
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ReactSortable>
      </ListGroup>
    </div>
  );
}
