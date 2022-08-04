import "./task.css";
import { useState } from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

function Task({
  id,
  ticker,
  price,
  quantity,
  totalAmount,
  optionStock,
  transactionType,
  month,
  year,
}) {
  // const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to delete a document from firstore */

  const handleDelete = async () => {
    if (window.confirm("You want to delete ?")) {
      const taskDocRef = doc(db, "tasks", id);
      try {
        await deleteDoc(taskDocRef);
      } catch (err) {
        alert(err);
      }
    }
  };

  /* function to update document in firestore */

  // const handleCheckedChange = async () => {
  //   const taskDocRef = doc(db, "tasks", id);
  //   try {
  //     await updateDoc(taskDocRef, {
  //       completed: checked,
  //     });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <div>
      {/* className={`task ${checked && "task--borderColor"}`} */}
      {/* <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleCheckedChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div> */}
      <div className="task__body">
        <h3>{ticker}</h3>
        <p>{transactionType}</p>
        {/* <p>{`$` + price}</p> */}
        {/* <p>{quantity}</p> */}
        {/* <p>{totalAmount}</p> */}
        <p>{optionStock}</p>
        {/* <p>{month + `/` + year}</p> */}

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
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>
      {open.view && (
        <TaskItem
          onClose={handleClose}
          open={open.view}
          ticker={ticker}
          price={price}
          quantity={quantity}
          totalAmount={totalAmount}
          optionStock={optionStock}
          transactionType={transactionType}
          month={month}
          year={year}
        />
      )}
      {open.edit && (
        <EditTask
          open={open.edit}
          onClose={handleClose}
          toEditTicker={ticker}
          toEditPrice={price}
          toEditQuantity={quantity}
          toEditoptionStock={optionStock}
          toEditTransactionType={transactionType}
          toEditTotalAmount={totalAmount}
          toEditmonth={month}
          toEdityear={year}
          id={id}
        />
      )}
    </div>
  );
}

export default Task;
