import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/slice/counter.slice";

function Counter(props) {
  const dispatch = useDispatch();

  const c = useSelector(state => state.count);
  console.log(c);
  

  const handleinc = () => {
    dispatch(increment());
  };

  const handledec = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1>Counter</h1>

      <button variant="outline-dark" onClick={handleinc}>
        +
      </button>
      <span>{c.count}</span>
      <button variant="outline-dark" onClick={handledec}>
        -
      </button>
    </div>
  );
}

export default Counter;
