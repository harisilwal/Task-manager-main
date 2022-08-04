import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function View() {
  const [tasks, setTasks] = useState([]);
  const [stockOnlyDetails, setStockOnlyDetails] = useState([]);
  const [tickerNameList, setTickerNameList] = useState([]);
  const [ticker, setTicker] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [optionStock, setoptionStock] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0.0);
  const url = "https://finnhub.io/api/v1/quote?";

  function stockURL(selectedTickerName) {
    let name = selectedTickerName.toUpperCase();
    return url + "symbol=" + name + "&token=c07um4f48v6uu9ck9l4g";
  }

  function stockPriceHandler(selectedTickerName) {
    // Point 1
    fetch(stockURL(selectedTickerName))
      //Point 2
      .then((response) => response.json())
      //Point 3
      .then((event) => {
        setCurrentPrice(event.c);
      });
  }

  /* function to get all tasks from firestore in realtime */
  /* function to add new task to firestore */

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    const tickerQ = query(collection(db, "tickerList")); //, orderBy("created", "desc")
    onSnapshot(tickerQ, (querySnapshot) => {
      setTickerNameList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  function numberOfStocks(tickerSymbol) {
    return tasks
      .filter((task) => task.data.optionStock === "Stocks")
      .filter((task) => task.data.ticker === tickerSymbol)
      .reduce((a, c) => {
        return a + Number(c.data.quantity);
      }, 0);
  }

  function totalAmount(tickerSymbol) {
    return tasks
      .filter((task) => task.data.ticker === tickerSymbol)
      .reduce((a, c) => {
        return a + Number(c.data.totalAmount);
      }, 0);
  }

  function totalAmountForMonth(tickerSymbol) {
    return tasks
      .filter((task) => task.data.ticker === tickerSymbol)
      .filter((task) => task.data.month === month)
      .filter((task) => task.data.year === year)
      .reduce((a, c) => {
        return a + Number(c.data.totalAmount);
      }, 0);
  }

  function calculateAveragePrice(totalAmt, numStock) {
    if (numStock == 0) {
      return 0;
    } else {
      return -(totalAmt / numStock);
    }
  }

  return (
    <div>
      <h2>View Details for a ticker</h2>
      <h4>Select a Ticker to view total ROI, Avg Cost and Total Amount</h4>
      <form className="addTask">
        <select
          name="ticker"
          id="ticker"
          onChange={(e) => {
            setTicker(e.target.value);
            stockPriceHandler(e.target.value);
          }}
          value={ticker}
        >
          <option value="" selected>
            Select Ticker
          </option>
          {tickerNameList.map((tickName) => (
            <option key={tickName.id} value={tickName.data.tickerName}>
              {tickName.data.tickerName}
            </option>
          ))}
        </select>
        <select
          name="month"
          id="month"
          onChange={(e) => {
            setMonth(e.target.value);
          }}
          value={month}
        >
          <option value="" selected>
            Select Month
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
          onChange={(e) => {
            setYear(e.target.value);
          }}
          value={year}
        >
          <option value="" selected>
            Select Year
          </option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </form>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>month/year</th>
            <th>Price per tx</th>
            <th>Number of Units</th>
            <th>Transaction Type</th>
            <th>Options/Stock</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => task.data.ticker === ticker)
            .filter((task) => task.data.month === month)
            .filter((task) => task.data.year === year)
            .map((task) => (
              <tr>
                <td>{task.data.ticker}</td>
                <td>{month + `/` + year}</td>
                <td>{task.data.price}</td>
                <td>{task.data.quantity}</td>
                <td>{task.data.transactionType}</td>
                <td>{task.data.optionStock}</td>
                <td>{task.data.totalAmount}</td>
              </tr>
            ))}
          <tr>
            <td>Total Amount</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td>{totalAmount(ticker)}</td>
          </tr>
          <tr>
            <td>Current Price</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{currentPrice}</td>
          </tr>
          <tr>
            <td>Total Amount for Month</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{totalAmountForMonth(ticker)}</td>
          </tr>
          <tr>
            <td>Total Number of Stocks</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{numberOfStocks(ticker)}</td>
          </tr>
          <tr>
            <td>Average Price of Stock</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {calculateAveragePrice(
                totalAmount(ticker),
                numberOfStocks(ticker)
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <h1>**************************************************</h1>
      <h2>View Stock Only or Option Only</h2>
      <form className="addTask">
        <select
          name="optionStock"
          id="optionStock"
          onChange={(e) => setoptionStock(e.target.value)}
          value={optionStock}
        >
          <option value="" selected>
            Select Transaction
          </option>
          <option value="Options">Options</option>
          <option value="Stocks">Stocks</option>
        </select>
      </form>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>month/year</th>
            <th>Price per tx</th>
            <th>Number of Units</th>
            <th>Transaction Type</th>
            <th>Options/Stock</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => task.data.ticker === ticker)
            .filter((task) => task.data.optionStock === optionStock)
            .filter((task) => task.data.month === month)
            .filter((task) => task.data.year === year)
            .map((task) => (
              <tr>
                <td>{task.data.ticker}</td>
                <td>{month + `/` + year}</td>
                <td>{task.data.price}</td>
                <td>{task.data.quantity}</td>
                <td>{task.data.transactionType}</td>
                <td>{task.data.optionStock}</td>
                <td>{task.data.totalAmount}</td>
              </tr>
            ))}
          <tr>
            <td>Total Amount</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {tasks
                .filter((task) => task.data.ticker === ticker)
                .filter((task) => task.data.optionStock === optionStock)
                .reduce((a, c) => {
                  return a + Number(c.data.totalAmount);
                }, 0)}
            </td>
          </tr>
          <tr>
            <td>Current Price</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{currentPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default View;
