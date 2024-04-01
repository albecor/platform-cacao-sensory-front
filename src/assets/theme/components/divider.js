import colors from "assets/theme/base/colors";

import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

const { black, white, transparent } = colors;

export default {
  root: {
    backgroundColor: transparent.main,
    backgroundImage: `linear-gradient(to right, ${rgba(black.main, 0)}, ${rgba(
      black.main,
      0.4
    )}, ${rgba(black.main, 0)})`,
    margin: `${pxToRem(16)} 0`,
    opacity: 0.25,
  },

  vertical: {
    backgroundColor: transparent.main,
    backgroundImage: `linear-gradient(to bottom, ${rgba(black.main, 0)}, ${rgba(
      black.main,
      0.4
    )}, ${rgba(black.main, 0)})`,
    margin: `0 ${pxToRem(16)}`,
  },

  light: {
    backgroundColor: transparent.main,
    backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${rgba(
      white.main,
      1
    )}, ${rgba(white.main, 0)})`,

    "&.MuiDivider-vertical": {
      backgroundImage: `linear-gradient(to bottom, ${rgba(
        white.main,
        0
      )}, ${rgba(white.main, 1)}, ${rgba(white.main, 0)}) !important`,
    },
  },
};
