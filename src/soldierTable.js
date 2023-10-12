import { useState, useEffect } from "react";
import { noteAdopted, updateData } from "./firebase";

export const getListFromCookie = (name = "userList") => {
  const cookieValue = getCookie(name);
  return cookieValue ? JSON.parse(cookieValue) : [];
};

const getCookie = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === "userList") {
      return decodeURIComponent(value);
    }
  }
};

export const SoldiersTable = ({
  soldierAdded,
  setSoldierTaken,
  soldierTaken,
}) => {
  const [soldiersArray, setSoldierArray] = useState([]);
  const [input, setInput] = useState({
    name: "",
    adopting: "",
    Remarks: "",
    bestWishes: "",
    Updates: "",
  });
  const [inputChange, setInputChange] = useState(false);

  useEffect(() => {
    tableData();
  }, [soldierAdded, soldierTaken]);

  const onInputChange = (key, newInput, id) => {
    console.log(key, newInput);
    setInput((prev) => ({ ...prev, [key]: newInput }));
    
    setInputChange(true);
  };

  const tableData = async () => {
    const soldiers = await noteAdopted();
    setSoldierArray(soldiers);
  };

  const statusObject = {
    soldier: "חייל",
    missing: "נעדר",
    forMedicine: "רפואה שלמה",
  };

  const setCookies = (list, name = "userList", daysToExpire = 7) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const jsonValue = JSON.stringify(list);
    const cookie = `${name}=${encodeURIComponent(jsonValue)}; path=/`;
    document.cookie = cookie;
  };

  const onClick = async (sold, update = true) => {
    if (!input.adopting.length && update) {
      alert('שם מאמץ לא יכול להיות ריק')
      return
    }
    setCookies([sold, ...getListFromCookie("userList"), input]);
    await updateData(sold.id, {
      name: sold.name,
      soldierStatus: sold.soldierStatus,
      courage: update,
      input,
    });
    setSoldierTaken(soldierTaken + 1);
    setInputChange(false);
  };

  return (
    <div>
      {" "}
      מחכים למאמץ/ת
      {soldiersArray.length ? (
        <table>
          <thead>
            <tr>
              <th>שם החייל ושם אם</th>
              <th>מאמץ/ת</th>
              <th>סטטוס</th>
              <th>הערות</th>
              <th>איחולים</th>
              <th>עדכונים</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {soldiersArray.map((sold, index) => (
              <tr key={index}>
                <td>{sold.name}</td>
                <td>
                  {sold.adopting ? (
                    <div> {sold.adopting} </div>
                  ) : (
                    <input
                      onChange={(e) =>
                        onInputChange("adopting", e.target.value, sold.id)
                      }
                      value={sold.adopting ? sold.adopting + input.adopting : input.adopting}
                    ></input>
                  )}
                </td>
                <td>{statusObject[sold.soldierStatus]}</td>
                <td>
                  <input
                    onChange={(e) => onInputChange("Remarks", e.target.value, sold.id)}
                    value={sold.Remarks ? sold.Remarks + input.Remarks : input.Remarks}
                  ></input>
                </td>
                <td>
                  <input
                    onChange={(e) =>
                      onInputChange("bestWishes", e.target.value, sold.id)
                    }
                    value={sold.bestWishes ? sold.bestWishes + input.bestWishes : input.bestWishes}
                  ></input>
                </td>
                <td>
                  <input
                    onChange={(e) => onInputChange("Updates", e.target.value, sold.id)}
                    value={sold.Updates ? sold.Updates + input.Updates : input.Updates}
                  ></input>
                </td>
                <td>
                  <button onClick={() => onClick(sold)}>לקחתי</button>
                  {inputChange ? (
                    <button onClick={() => onClick(sold, false)}>
                      שמירת שינוים
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
