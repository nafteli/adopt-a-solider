import { useState, useEffect } from "react";
import { getListFromCookie } from "./soldierTable";

export const YoreSoldierTable = ({ soldierTaken }) => {
  const [soldiersArray, setSoldierArray] = useState([]);
  useEffect(() => {
    setSoldierArray(getListFromCookie("userName"));
  }, [soldierTaken]);

  return (
    <div> מאומצים על ידך
      {soldiersArray.length ? (
        <table>
          <thead>
            <tr>
              <th>שם החייל + שם האם</th>
              <th>מאמץ/ת</th>
              <th>סטטוס</th>
              <th>הערות</th>
              <th>איחולים</th>
              <th>עדכונים</th>
            </tr>
          </thead>
          <tbody>
            {soldiersArray.map((sold, index) => (
              <tr key={index}>
                <td>{sold.soldierStatus}</td>
                <td>{sold.name}</td>
                <td>לקחת לתפילה את</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
