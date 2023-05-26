import { useState } from "react";
import classes from "./itemdetails.module.css";
import { useRef } from "react";
const ItemDetails = (props) => {
  const statement = [];
  const [renderList, setRenderList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showLimitVal, setShowLimitVal] = useState(false);
  const [renderLimit, setRenderLimit] = useState({});
  const inputRef = useRef();
  const listArrHandler = (val) => {
    setShowList(true);
    setRenderList(val);
  };
  const limitValueHandler = (val) => {
    setShowLimitVal(true);
    setRenderLimit(val);
  }
  return (
    <>
      {showList && <div>
        {renderList.map((val) => {
          return <p className={classes.renderListTitle}>{val}</p>
        })}
        </div>}
        {showLimitVal && <div>
          <p className={classes.itemTitle}>{renderLimit?.study_type}</p>
          <p className={classes.renderListSubtitle}>Set Parameters</p>
          <div className={classes.renderListLimitContainer}>
            <p className={classes.period}>Period</p>
            <input defaultValue={renderLimit?.default_value} ref={inputRef} min={renderLimit?.min_value} max={renderLimit?.max_value}/>
          </div>
          </div>}
      {!showList && !showLimitVal && (
        <div>
          <div className={classes.itemDetailsContainer}>
            <p className={classes.itemTitle}>{props.name.split("/")[0]}</p>
            <p
              className={
                props.name.split("/")[1] === "Bearish"
                  ? classes.subtitleMarketDownTrend
                  : classes.subtitleMarketUpTrend
              }
            >
              {props.name.split("/")[1]}
            </p>
          </div>
          <div className={classes.details}>
            {props.criteria.map((val, i) => {
              if (val.type === "plain_text") {
                return (
                  <div>
                    <p className={classes.detailItems}>{val.text}</p>
                    {props.criteria.length > 1 &&
                      i < props.criteria.length - 1 && (
                        <p className={classes.joinCondition}>and</p>
                      )}
                  </div>
                );
              }
              if (val.type === "variable") {
                const initVal = val.text.split(" ");
                initVal.map((v) => {
                  if (val.variable[v]?.type === "indicator") {
                    if (val.variable[v]) {
                      statement.push(
                        <a
                          href="#"
                          onClick={() => limitValueHandler(val.variable[v])}
                        >
                          ({val.variable[v].default_value})
                        </a>
                      );
                    }
                  } else if (val.variable[v]?.type === "value") {
                    if (val.variable[v]) {
                      statement.push(
                        <a
                          href="#"
                          onClick={() => listArrHandler(val.variable[v].values)}
                        >
                          ({val.variable[v].values[0]})
                        </a>
                      );
                    }
                  } else {
                    statement.push(v);
                  }
                });
                if (i !== props.criteria.length - 1) statement.push(<p className={classes.additionalCondition}> and </p>);
              }
            })}
            <div className={classes.statementContainer}>
              {statement.map((v) => {
                return (
                  <>
                    <span className={classes.listStatement}>
                      {v}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ItemDetails;
