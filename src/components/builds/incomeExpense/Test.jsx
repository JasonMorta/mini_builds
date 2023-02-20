import React, { useContext, useState, useEffect } from "react";
export default function Test() {
  const [state, setState] = useState({
    nestedArr: [
      { id: 1, value: "value1" },
      { id: 2, value: "value2" },
      { id: 3, value: "value3" },
    ],
  });
  console.log(state);

  //The filter() method creates a shallow copy of a portion of a given array,
  //filtered down to just the elements from the given array that pass the test
  //implemented by the provided function.
  function removeNestedArrItem(id) {
    setState((prevState) => ({
      ...prevState,
      nestedArr: prevState.nestedArr.filter((item) => item.id !== id),
    }));
  }

  return (
    <div>
      {state.nestedArr.map((item) => (
        <div key={item.id}>
          <p>{item.value}</p>
          <button onClick={() => removeNestedArrItem(item.id)}>
            Remove item {item.id}
          </button>
        </div>
      ))}
    </div>
  );
}
