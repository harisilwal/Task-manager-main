import Modal from "./Modal";
import "./editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

function EditTask({
  open,
  onClose,
  toEditTicker,
  toEditPrice,
  toEditQuantity,
  toEditoptionStock,
  toEditTransactionType,
  toEditTotalAmount,
  toEditMonth,
  toEditYear,
  id,
}) {
  const [ticker, setTicker] = useState(toEditTicker);
  const [price, setPrice] = useState(toEditPrice);
  const [quantity, setQuantity] = useState(toEditQuantity);
  const [optionStock, setoptionStock] = useState(toEditoptionStock);
  const [transactionType, setTransactionType] = useState(toEditTransactionType);
  const [totalAmount, setTotalAmount] = useState(toEditTotalAmount);
  const [month, setMonth] = useState(toEditMonth);
  const [year, setYear] = useState(toEditYear);
  const [tickerNameList, setTickerNameList] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const tq = query(collection(db, "tickerList")); //, orderBy("created", "desc")
    onSnapshot(tq, (querySnapshot) => {
      setTickerNameList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    let totalAmountForTx = 0;
    let quantityForTx = 0;

    if (transactionType == "Buy") {
      totalAmountForTx = -(price * quantity);
      quantityForTx = quantity;
    } else {
      totalAmountForTx = price * quantity;
      quantityForTx = -quantity;
    }
    e.preventDefault();
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        ticker: ticker,
        price: price,
        quantity: quantityForTx,
        totalAmount: totalAmountForTx,
        optionStock: optionStock,
        transactionType: transactionType,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        <select
          name="ticker"
          onChange={(e) => setTicker(e.target.value)}
          value={ticker}
        >
          {tickerNameList.map((tickName) => (
            <option key={tickName.id} value={tickName.data.tickerName}>
              {tickName.data.tickerName}
            </option>
          ))}
        </select>
        <select
          name="type"
          onChange={(e) => setTransactionType(e.target.value)}
          value={transactionType}
        >
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value.toUpperCase())}
          value={price}
        />
        <input
          type="number"
          name="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <select
          name="type"
          onChange={(e) => setoptionStock(e.target.value)}
          value={optionStock}
        >
          <option value="Options">Options</option>
          <option value="Stocks">Stocks</option>
        </select>

        <select
          name="type"
          onChange={(e) => setMonth(e.target.value)}
          value={month}
        >
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
        </select>

        <select
          name="type"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
