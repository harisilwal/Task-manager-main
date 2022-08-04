import "./task.css";
import { useState } from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import EditTicker from "./EditTicker";

function Ticker({ id, ticker }) {
  // const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  const handleDelete = async () => {
    const taskDocRef = doc(db, "tickerList", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div className="task__body">
        <h3>{ticker}</h3>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {open.edit && (
        <EditTicker
          onClose={handleClose}
          toEditTicker={ticker}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default Ticker;
