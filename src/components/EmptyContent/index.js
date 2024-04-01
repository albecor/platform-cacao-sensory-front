import clsx from "clsx";
import { string } from "prop-types";
import styles from "./styles";

const EmptyContent = ({ message }) => {
  const classes = styles();
  return (
    <>
      <p className={classes.message}>{message}</p>
      <div className={classes.draw}>
        <div className={classes.cactus}>
          <div className={classes.arm} />
          <div className={classes.arm} />
        </div>
        <div className={classes.cactus}>
          <div className={classes.arm} />
          <div className={classes.arm} />
        </div>
        <div className={classes.cactus}>
          <div className={classes.arm} />
          <div className={classes.arm} />
        </div>
        <div className={classes.sky}>
          <div className={classes.mountain} />
          <div className={clsx(classes.mountain, classes.two)} />
          <div className={classes.sun} />
        </div>
      </div>
    </>
  );
};

EmptyContent.propTypes = {
  message: string.isRequired,
};

export default EmptyContent;
