import { useState } from "react";
import { addData } from "./firebase";
import "./Form.css";

export const Form = ({ setSoldierAdded, setSoldierTaken, soldierAdded, setAdd }) => {
  const [input, setInput] = useState({name: "", adopting: "", Updates: "",});
  const [soldier, setSoldier] = useState("soldier");
  const [soldierFund, setSoldierFund] = useState(false)

  const onInputChange = (key, input) => {
    setSoldierFund(false)
    setInput((prev) => ({ ...prev, [key]: input }));
  };
  
  const statusObject = {
    soldier: "לזכות",
    backedHome: "חזר הבייתה",
    missing: "להתפלל",
    forMedicine: 'רפו"ש',
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
    <div className="formWrapper">
    <div className="container" >
       <div className="button-container">
        <button className="add-btn" disabled={!input.name.length} onClick={onClick}>הוספה</button>
      </div>
      <div className="form">
        <div className="addName">הוספת שם</div>
        <div className="nameInputWrapper">
          <input
            placeholder="שם פרטי + שם האם"
            className="nameInput"
            type="text"
            onChange={(e) => onInputChange("name", e.target.value)}
            value={input.name}
          />
          {soldierFund && <div>{input.name} כבר רשום בערכת</div>}
        </div>
        <div className="selectInputWrapper">
          <div className="statusText">סטטוס:</div>
          <select
            placeholder="fdfg"
            name="selectedFruit"
            className="selectInput"
            onChange={(e) => onSelectChange(e.target.value)}
          >
            {Object.entries(statusObject).map(([key, value])=> (
              <option value={key}>{value}</option>
            ))}
            
          </select>
        </div>
      </div>
    </div>
    <div className="changeSearchButton" onClick={() => setAdd(false)}>חיפוש</div>
    </div>
  );
};
