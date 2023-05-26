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
  const clickHandler = (val) => {
    setShow(true);
  };
  const backHandler = () => {
    setShow(false);
  }
  const itemDetailsHandler = (criteria, name) => {
    setItemDetails(criteria);
    setName(name);
  }
  useEffect(() => {
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
      {show ? <ItemDetails criteria={itemDetails} name={name}/> :
      <div>
        {data.map((val, i) => {
          return <ListItem name={val.name} tag={val.tag} criteria={val.criteria} itemDetailsHandler={itemDetailsHandler}/>
        })}
      </div>}
    </div>
    </>
  );
};

export default App;
