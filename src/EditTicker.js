import Modal from "./Modal";
import { useState } from "react";
import "./editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function EditTicker({ open, onClose, toEditTicker, id }) {
  const [ticker, setTicker] = useState(toEditTicker);

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tickerList", id);
    try {
      await updateDoc(taskDocRef, {
        tickerName: ticker,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        <input
          type="text"
          name="ticker"
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          value={ticker}
        />
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTicker;
