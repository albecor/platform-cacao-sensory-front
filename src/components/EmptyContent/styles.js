import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  "@keyframes sunWalk": {
    from: { left: "-2rem" },
    to: { left: "100%" },
  },
  "@keyframes lightAngle": {
    "0%, 20%": {
      transform: "skew(40deg)",
    },
    "80%, 100%": {
      transform: "skew(-40deg)",
    },
  },
  draw: {
    position: "relative",
    height: "300px",
    width: "300px",
    borderRadius: "50%",
    margin: "1rem auto 2rem",
    background: "#eaeaea",
    overflow: "hidden",
  },
  cactus: {
    zIndex: "1",
    position: "absolute",
    width: "1.2rem",
    height: "10rem",
    borderRadius: "7px 7px 0 0",
    background: "currentColor",
    "&:before": {
      content: "''",
      position: "absolute",
      left: "0px",
      bottom: "-32px",
      width: "1.2rem",
      height: "2rem",
      transform: "skew(40deg)",
      transformOrigin: "top center",
      borderRadius: "0 0 6px 6px",
      animation: "$lightAngle 8s linear infinite alternate",
    },
    "&:nth-child(1)": {
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#aaa",
    },
    "&:nth-child(2)": {
      bottom: "4.5rem",
      left: "2rem",
      transform: "scale(0.4)",
      color: "#dadada",
    },
    "&:nth-child(2)::before": {
      background: "#a7a7a7",
    },
    "&:nth-child(3)": {
      bottom: "2.5rem",
      right: "2rem",
      transform: "scale(0.6)",
      color: "#ccc",
    },
    "&:nth-child(3)::before": {
      background: "#999",
    },
  },
  arm: {
    position: "absolute",
    width: "3rem",
    height: "1rem",
    background: "currentColor",
    "&:before": {
      position: "absolute",
      bottom: "0",
      right: "0",
      content: "''",
      width: "1rem",
      height: "3rem",
      background: "currentColor",
      borderRadius: "6px 6px 0 0",
    },
    "&:first-of-type": {
      top: "35%",
    },
    "&:last-of-type": {
      top: "55%",
      left: "-1.8rem",
    },
    "&:last-of-type::before": {
      right: "auto",
      left: "0",
    },
  },
  sky: {
    position: "absolute",
    width: "100%",
    height: "50%",
    background: "#fcfcfc",
    overflow: "hidden",
  },
  mountain: {
    position: "absolute",
    left: "42%",
    bottom: "-2rem",
    width: "4rem",
    height: "4rem",
    background: "#d8d8d8",
    transform: "rotate(45deg)",
    borderRadius: "8px 0 0 0",
  },
  two: {
    left: "27%",
    transform: "rotate(45deg) scale(0.6)",
    background: "#d8d8d8",
  },
  sun: {
    position: "absolute",
    top: "20px",
    left: "-2rem",
    width: "2rem",
    height: "2rem",
    background: "#d4d4d4",
    borderRadius: "50%",
    animation: "$sunWalk 8s linear infinite alternate",
  },
  message: {
    textAlign: "center",
    fontSize: "0.9em",
    color: "red",
  },
}));
