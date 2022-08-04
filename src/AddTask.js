import Modal from "./Modal";
import { useState, useEffect } from "react";
import "./addTask.css";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

function AddTask({ onClose, open }) {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [optionStock, setoptionStock] = useState("");
  const [tickerNameList, setTickerNameList] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
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
    try {
      await addDoc(collection(db, "tasks"), {
        ticker: ticker,
        price: price,
        quantity: quantityForTx,
        totalAmount: totalAmountForTx,
        optionStock: optionStock,
        transactionType: transactionType,
        month: month,
        year: year,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

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

  return (
    <Modal modalLable="Add Transaction" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <select
          name="ticker"
          id="ticker"
          onChange={(e) => setTicker(e.target.value)}
          value={ticker}
        >
          <option value="" selected>
            Select Ticker you want to add
          </option>
          {tickerNameList.map((tickName) => (
            <option key={tickName.id} value={tickName.data.tickerName}>
              {tickName.data.tickerName}
            </option>
          ))}
        </select>

        <select
          name="transactionType"
          id="transactionType"
          onChange={(e) => setTransactionType(e.target.value)}
          value={transactionType}
        >
          <option value="" selected>
            Select for Value: Buy/Sell
          </option>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>

        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          value={price}
        ></input>
        <input
          type="number"
          name="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter Quantity"
          value={quantity}
        ></input>
        <select
          name="optionStock"
          id="optionStock"
          onChange={(e) => setoptionStock(e.target.value)}
          value={optionStock}
        >
          <option value="" selected>
            Select for : Option/Stock
          </option>
          <option value="Options">Options</option>
          <option value="Stocks">Stocks</option>
        </select>

        <select
          name="month"
          id="month"
          onChange={(e) => setMonth(e.target.value)}
          value={month}
        >
          <option value="" selected>
            Select for : Month
          </option>
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
          name="year"
          id="year"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        >
          <option value="" selected>
            Select for : Year
          </option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
