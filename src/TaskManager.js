import "./taskManager.css";
import "./task.css";
import Task from "./Task";
import AddTask from "./AddTask";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, "tasks")); //, orderBy("created", "desc")
    onSnapshot(q, (querySnapshot) => {
      setTasks(
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
          <button onClick={() => setOpenAddModal(true)}>Add Transation</button>
        </div>

        <div className="task__body">
          {/* <h3>Ticker</h3> */}
          {/* <p>Buy/Sell</p> */}
          {/* <p>Price per tx</p> */}
          {/* <p>Number of</p> */}
          {/* <p>Total Amount</p> */}
          {/* <p>Option/Stock</p> */}
          {/* <p>Month/Year</p> */}
          {/* <p>Actions: Edit/Delete/View</p> */}
        </div>
        <div className="taskManager__tasks">
          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              ticker={task.data.ticker}
              price={task.data.price}
              quantity={task.data.quantity}
              totalAmount={task.data.totalAmount}
              optionStock={task.data.optionStock}
              transactionType={task.data.transactionType}
              month={task.data.month}
              year={task.data.year}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default TaskManager;
