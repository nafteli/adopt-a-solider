import { updateData } from "./firebase";
import "./AllSoldier.css";

export const Table = ({
  allSoldiers,
  setAllSoldiers,
  userSoldiers,
  setUserSoldiers,
}) => {
  const statusObject = {
    soldier: "חייל/ת",
    missing: "נעדר",
    forMedicine: 'רפו"ש',
  };

  const onInputChange = async (key, input, id, toCookie = false) => {
    const valueCopy = [...allSoldiers];
    const index = allSoldiers.findIndex((s) => s.id === id);
    valueCopy[index][key] = input;
    if (toCookie) {
      setUserSoldiers(valueCopy);
    }
    setAllSoldiers(valueCopy);
    await updateData(id, allSoldiers[index])
  };
  return (
    <div>
      {/* <div>כל המאומצים</div> */}
      {allSoldiers.length ? (
        <div>
          {/* <div>שלך</div>
          {userSoldiers.map((sold, index) => (
            <div key={index} className="row">
              <div>{statusObject[sold.soldierStatus]}</div>
              <div>{sold.name}</div>
              <div>מאמץ/ת</div>
              <div>
                <input
                  onChange={(e) =>
                    onInputChange("adopting", e.target.value, sold.id, true)
                  }
                  value={sold.adopting}
                ></input>
              </div>
              <div>עדכונים</div>
              <div>
                <input
                  onChange={(e) =>
                    onInputChange("Updates", e.target.value, sold.id, true)
                  }
                  value={sold.Updates}
                ></input>
              </div>
            </div>
          ))}
          <div>כל השאר</div> */}
          {allSoldiers.map((sold, index) => (
            <div key={index} className="row" >
              <div className="soldierStatus">{statusObject[sold.soldierStatus]}</div>
              <div className="separation"></div>
              <div className="soldierName">{sold.name}</div>
              <div className="adoptingTitle">מאמץ/ת:</div>
              <div className="adoptingName" >
                <input 
                  dir="auto"
                  onChange={(e) =>
                    onInputChange("adopting", e.target.value, sold.id, true)
                  }
                  placeholder="הכנס שם"
                ></input>
              </div>
              <div className="UpdateTitle">:הערה</div>
              <div className="UpdateValue" value={sold.Updates}>
                <input
                  dir="auto"
                  onChange={(e) =>
                    onInputChange("Updates", e.target.value, sold.id)
                  }
                  placeholder="סטטוס/איחול/עדכון"
                ></input>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
