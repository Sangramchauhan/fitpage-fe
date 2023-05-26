import classes from './listItem.module.css';

const ListItem = (props) => {
    return (
        <div className={classes.itemContainer} onClick={() => props.itemDetailsHandler(props.criteria, props.name + "/" + props.tag)}>
            <div>
            <p className={classes.title}>{props.name}</p>
            </div>
            <p className={props.tag === 'Bearish' ? classes.subtitleMarketDownTrend : classes.subtitleMarketUpTrend}>{props.tag}</p>
        </div>
    )
}

export default ListItem;