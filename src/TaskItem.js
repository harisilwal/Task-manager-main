import Modal from "./Modal";
import "./taskItem.css";

function TaskItem({
  onClose,
  open,
  ticker,
  price,
  quantity,
  totalAmount,
  optionStock,
  transactionType,
  month,
  year,
}) {
  return (
    <Modal modalLable="Details" onClose={onClose} open={open}>
      <div className="taskItem">
        <h4>{`Ticker Name: ` + ticker}</h4>
        <p>{`Price per Unit: ` + price}</p>
        <p>{`Number of Unit: ` + quantity}</p>
        <p>{`Option/Stock: ` + optionStock}</p>
        <p>{`Buy/Sell: ` + transactionType}</p>
        <p>{`Total Amount: ` + totalAmount}</p>
        <p>{`month/year ` + month + `/` + year}</p>
      </div>
    </Modal>
  );
}

export default TaskItem;
