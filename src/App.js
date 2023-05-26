import { useEffect, useState } from "react";
import classes from "./App.module.css";
import ListItem from "./Components/ListItems";
import ItemDetails from "./Components/ItemDetails";
import { GETAPI } from "./Constants";
const App = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [name, setName] = useState("");

  // Show the Item details
  const clickHandler = (val) => {
    setShow(true);
  };

  // handles to return to main screen
  const backHandler = () => {
    setShow(false);
  }

  // Load data for particular Item in the List
  const itemDetailsHandler = (criteria, name) => {
    setItemDetails(criteria);
    setName(name);
  }

  useEffect(() => {
    // API CALL made when react app is loaded.
    fetch(GETAPI).then(res => res.json()).then((res) => {
      setData(res);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
    <div className={classes.buttonContainer}><button className={classes.btn} onClick={backHandler}>Back</button></div>
    <div className={classes.container} onClick={clickHandler}>
      {/* Loads details for particular item */}
      {show ? <ItemDetails criteria={itemDetails} name={name}/> :
      <div>
        {/* render list of items dynamically  */}
        {data.map((val, i) => {
          return <ListItem name={val.name} tag={val.tag} criteria={val.criteria} itemDetailsHandler={itemDetailsHandler}/>
        })}
      </div>}
    </div>
    </>
  );
};

export default App;
