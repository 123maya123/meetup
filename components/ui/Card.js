import classes from './Card.module.css';

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}
//card is just a wrapper component in NewMeetupForm.js n MeettupItem.js

export default Card;
