import { updateData } from "./firebase";
import "./AllSoldier.css";

export const Table = ({
  allSoldiers,
  setAllSoldiers,
  userSoldiers,
  setUserSoldiers,
}) => {
  const statusObject = {
    soldier: "לזכות",
    backedHome: "חזר הביתה",
    missing: "להתפלל",
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

  function CustomText({ text, color }) {
    let textColorClass;

    switch (color) {
      case 'לזכות':
        textColorClass = '#20b487';
        break;
      case 'רפו"ש':
        textColorClass = '#D2C16B';
        break;
      case 'להתפלל':
        textColorClass = '#DE7070';
        break;
      default:
        textColorClass = '';
      }

    const textStyle = {
      width: '3vw',
      height: '1.5vw',
      fontWeight: 700,
      fontSize: '1.1vw',
      textAlign: 'end',
      color: textColorClass,
      marginRight: '2%',
      marginLeft: '0.5%',
    };
  
    return (
      <div style={textStyle} className="custom-text">
        {text}
      </div>
    );
  }

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
              {/* <div className="soldierStatus">{statusObject[sold.soldierStatus]}</div> */}
              <CustomText text={statusObject[sold.soldierStatus]} color={statusObject[sold.soldierStatus]} />
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
                  value={sold.adopting}
                ></input>
              </div>
              <div className="UpdateTitle">איחולים:</div>
              <div className="UpdateValue" value={sold.Updates}>
                <input
                  dir="auto"
                  onChange={(e) =>
                    onInputChange("Updates", e.target.value, sold.id)
                  }
                  placeholder="סטטוס/איחול"
                  value={sold.Updates}
                ></input>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
