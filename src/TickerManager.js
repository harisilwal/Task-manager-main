import "./taskManager.css";
import "./task.css";
import Task from "./Task";
import AddTask from "./AddTask";
import AddTicker from "./AddTicker";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Nav from "./Nav";
import Ticker from "./Ticker";

function TickerManager() {
  const [openAddTicker, setOpenAddTicker] = useState(false);
  const [tickers, setTickers] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, "tickerList")); //, orderBy("created", "desc")
    onSnapshot(q, (querySnapshot) => {
      setTickers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <div className="taskManager__container_inside">
          <button onClick={() => setOpenAddTicker(true)}>Add Ticker</button>
        </div>
        <div className="task__body">
          <h3>Ticker</h3>
        </div>
        <div className="taskManager__tasks">
          {tickers.map((tickers) => (
            <Ticker
              id={tickers.id}
              key={tickers.id}
              ticker={tickers.data.tickerName}
            />
          ))}
        </div>

        {/* <div className="task__body">
          <h3>Ticker</h3>
          <p>Price per tx</p>
          <p>Number of</p>
          <p>TX Type</p>
          <p>Actions: Edit/Delete/View</p>
        </div> */}
        {/* <div className="taskManager__tasks">
          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              ticker={task.data.ticker}
              price={task.data.price}
              quantity={task.data.quantity}
              optionStock={task.data.optionStock}
            />
          ))}
        </div> */}
      </div>

      {openAddTicker && (
        <AddTicker
          onClose={() => setOpenAddTicker(false)}
          open={openAddTicker}
        />
      )}
    </div>
  );
}

export default TickerManager;
