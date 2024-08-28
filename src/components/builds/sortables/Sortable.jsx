import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import CSS from "./sort.module.css";
import { Alert } from "bootstrap";
import { ListGroup } from "react-bootstrap";
import gridImg from "../../../static/images/imagePlaceHolder.png";

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

  const [gridList, setGridList] = useState([
    { id: 1, paragraph: "Et quasi quia sit quia earum est error omnis aut nulla esse id nostrum tempora! Et iure sapiente ut aspernatur omnis aut consectetur nulla." },
    { id: 2, title: "Lorem " },
    { id: 3, image: gridImg },
  ])

  const handleMouseUp = () => {
    console.log("list ", list);
    console.log("list2 ", list2);
    console.log('gridList', gridList)
  };
  return (
   <>
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
      <p>Grid</p>
      <ListGroup>
  <ReactSortable
    className={CSS.sortableGrid}
    list={gridList} // set the list to the state
    setList={setGridList} // set the new state of the list
    animation={200} // animation speed when dragging an item
    delay={2} // delay for touch devices
    delayOnTouchStart={true}
    swapThreshold={1}
    delayOnTouchEnd={true}
    ghostClass="ghost" // Class name for the drop placeholder
    chosenClass="chosen" // Class name for the chosen item
    onEnd={handleMouseUp} // onEnd event handler for when the item is dropped
    onChange={(order, sortable, evt) => {
      // Handle change
    }}
  >
    {/* Sortable list */}
    {gridList.map((item) => (
      <ListGroup.Item
        variant={"success"}
        className={CSS.gridItem}
        key={item.id}
      >
        {item.paragraph && <p>{item.paragraph}</p>}
        {item.image && <img style={{width: "100px"}} src={item.image} alt="content img" />}
        {item.title && <h2>{item.title}</h2>}
      </ListGroup.Item>
    ))}
  </ReactSortable>
</ListGroup>

   </>
  );
}
