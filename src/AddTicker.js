import Modal from "./Modal";
import { useState } from "react";
import "./addTask.css";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore"; //Timestamp was imported

function AddTicker({ onClose, open }) {
  const [tickerName, setTickerName] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tickerList"), {
        tickerName: tickerName,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add New Ticker" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="tickerName"
          onChange={(e) => setTickerName(e.target.value.toUpperCase())}
          value={tickerName}
          placeholder="Enter ticker"
        />
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTicker;
