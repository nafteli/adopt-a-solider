import { useState } from "react";
import { addData } from "./firebase";
import "./Form.css";

export const Form = ({ setSoldierAdded, setSoldierTaken, soldierAdded }) => {
  const [input, setInput] = useState({name: "", adopting: "", Updates: "",});
  const [soldier, setSoldier] = useState("soldier");
  const [soldierFund, setSoldierFund] = useState(false)

  const onInputChange = (key, input) => {
    setSoldierFund(false)
    setInput((prev) => ({ ...prev, [key]: input }));
  };


  const onClick = async () => {
    try {
      await addData("soldier", { ...input, soldierStatus: soldier });
      setInput((prev) => ({ ...prev, name: '' }));
      setSoldierAdded(soldierAdded + 1);
    } catch (e) {
      if (e.message === "soldierFund"){
        setSoldierFund(true);
      }
      console.error(e);
    }
  };

  const onSelectChange = (selected) => {
    setSoldier(selected);
  };

  return (
    <div className="container" >
      <div className="form">
        <div>
          <div>הוסםת שם</div>
          <input
            type="text"
            onChange={(e) => onInputChange("name", e.target.value)}
            value={input.name}
          />
          {soldierFund && <div>{input.name} כבר רשום בערכת</div>}
        </div>
        <div>
          <div>סטטוס</div>
          <select
            name="selectedFruit"
            onChange={(e) => onSelectChange(e.target.value)}
          >
            <option value="soldier">חייל</option>
            <option value="missing">נעדר</option>
            <option value="forMedicine">לרפואה שלמה</option>
          </select>
        </div>
      </div>
      <div className="button-container">
        <button className="add-btn" disabled={!input.name.length} onClick={onClick}>הוספה</button>
      </div>
    </div>
  );
};
