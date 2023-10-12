import { useState, useEffect } from "react";
import { Form } from "./Form";
import { SearchByName } from "./search";
import { Table } from "./AllSoldier";
import { readData } from "./firebase";
// import { SoldiersTable } from "./soldierTable";
// import { YoreSoldierTable } from "./yoreSoldier";
import "./App.css";

function App() {
  const [allSoldiers, setAllSoldiers] = useState([]);
  const [userSoldiers, setUserSoldiers] = useState([]);
  const [searchSoldiers, setSearchSoldiers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [soldierTaken, setSoldierTaken] = useState(0);
  const [soldierAdded, setSoldierAdded] = useState(0);

  useEffect(() => {
    const setData = async () => {
      const fromCookie = await getListFromCookie("userName");
      setUserSoldiers(fromCookie);
      const allSoldiers = await readData();
      setAllSoldiers(allSoldiers);
      setSearchSoldiers(allSoldiers);
    };
    setData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldierTaken, soldierAdded]);

  useEffect(() => {
    if (searchInput === '') {
      setSearchSoldiers(allSoldiers);
    }
    const filtered = allSoldiers.filter(solider => solider.name.includes(`${searchInput}`));
    setSearchSoldiers(filtered)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const getListFromCookie = (name = "userList") => {
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

  return (
    <div>
      <Form
        soldierAdded={soldierAdded}
        setSoldierTaken={setSoldierTaken}
        setSoldierAdded={setSoldierAdded}
      />
      <SearchByName setSearchInput={setSearchInput} searchInput={searchInput} />
      <div>
        <Table
          allSoldiers={searchSoldiers}
          setAllSoldiers={setAllSoldiers}
          userSoldiers={userSoldiers}
          setUserSoldiers={setUserSoldiers}
        />
        {/* <div>
          <SoldiersTable
            soldierAdded={soldierAdded}
            soldierTaken={soldierTaken}
            setSoldierTaken={setSoldierTaken}
          />
          <YoreSoldierTable soldierTaken={soldierTaken} />
        </div> */}
      </div>
    </div>
  );
}

export default App;
