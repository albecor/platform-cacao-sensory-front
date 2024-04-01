import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";

import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";

const {
  transparent,
  white,
  black,
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  light,
  dark,
  gradients,
} = colors;

const { borderWidth, borderRadius, borderColor } = borders;
const {
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
  size,
} = typography;

const gradientTextProperties = {
  WebkitBackgroundClip: "text !important",
  WebkitTextFillColor: `${transparent.main} !important`,
};

export default {
  html: {
    scrollBehavior: "smooth",
  },
  "#root": {
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    display: "flex",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
  ".font-light": {
    fontWeight: `${fontWeightLight} !important`,
  },
  ".font-md": {
    fontWeight: `${fontWeightRegular} !important`,
  },
  ".font-medium": {
    fontWeight: `${fontWeightMedium} !important`,
  },
  ".font-bold": {
    fontWeight: `${fontWeightBold} !important`,
  },
  ".text-xxs": {
    fontSize: `${size.xxs} !important`,
  },
  ".text-xs": {
    fontSize: `${size.xs} !important`,
  },
  ".text-sm": {
    fontSize: `${size.sm} !important`,
  },
  ".text-md": {
    fontSize: `${size.regular} !important`,
  },
  ".text-lg": {
    fontSize: `${size.lg} !important`,
  },
  ".text-xl": {
    fontSize: `${size.xl} !important`,
  },
  ".line-height-0": {
    lineHeight: "0 !important",
  },
  ".text-start": {
    textAlign: "left !important",
  },
  ".text-center": {
    textAlign: "center !important",
  },
  ".text-end": {
    textAlign: "right !important",
  },
  ".text-transparent": {
    color: `${transparent.main} !important`,
  },
  ".text-white": {
    color: `${white.main} !important`,
  },
  ".text-black": {
    color: `${black.main} !important`,
  },
  ".text-primary": {
    color: `${primary.main} !important`,
  },
  ".text-secondary": {
    color: `${secondary.main} !important`,
  },
  ".text-info": {
    color: `${info.main} !important`,
  },
  ".text-success": {
    color: `${success.main} !important`,
  },
  ".text-warning": {
    color: `${warning.main} !important`,
  },
  ".text-error": {
    color: `${error.main} !important`,
  },
  ".text-light": {
    color: `${light.main} !important`,
  },
  ".text-dark": {
    color: `${dark.main} !important`,
  },
  ".text-uppercase": {
    textTransform: "uppercase !important",
  },
  ".text-lowercase": {
    textTransform: "lowercase !important",
  },
  ".text-capitalize": {
    textTransform: "capitalize !important",
  },
  ".bg-transparent": {
    backgroundColor: `${transparent.main} !important`,
  },
  ".bg-white": {
    backgroundColor: `${white.main} !important`,
  },
  ".bg-black": {
    backgroundColor: `${black.main} !important`,
  },
  ".bg-primary": {
    backgroundColor: `${primary.main} !important`,
  },
  ".bg-secondary": {
    backgroundColor: `${secondary.main} !important`,
  },
  ".bg-info": {
    backgroundColor: `${info.main} !important`,
  },
  ".bg-success": {
    backgroundColor: `${success.main} !important`,
  },
  ".bg-warning": {
    backgroundColor: `${warning.main} !important`,
  },
  ".bg-error": {
    backgroundColor: `${error.main} !important`,
  },
  ".bg-light": {
    backgroundColor: `${light.main} !important`,
  },
  ".bg-dark": {
    backgroundColor: `${dark.main} !important`,
  },
  ".bg-center": {
    backgroundPosition: "center",
  },
  ".bg-cover": {
    backgroundSize: "cover",
  },
  ".object-center": {
    objectPosition: "center",
  },
  ".object-cover": {
    objectFit: "cover",
  },
  ".text-gradient-primary": {
    backgroundImage: `${linearGradient(
      gradients.primary.main,
      gradients.primary.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-secondary": {
    backgroundImage: `${linearGradient(
      gradients.secondary.main,
      gradients.secondary.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-info": {
    backgroundImage: `${linearGradient(
      gradients.info.main,
      gradients.info.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-success": {
    backgroundImage: `${linearGradient(
      gradients.success.main,
      gradients.success.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-warning": {
    backgroundImage: `${linearGradient(
      gradients.warning.main,
      gradients.warning.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-error": {
    backgroundImage: `${linearGradient(
      gradients.error.main,
      gradients.error.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-light": {
    backgroundImage: `${linearGradient(
      gradients.light.main,
      gradients.light.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".text-gradient-dark": {
    backgroundImage: `${linearGradient(
      gradients.dark.main,
      gradients.dark.state
    )} !important`,
    ...gradientTextProperties,
  },
  ".bg-gradient-primary": {
    backgroundImage: `${linearGradient(
      gradients.primary.main,
      gradients.primary.state
    )} !important`,
  },
  ".bg-gradient-secondary": {
    backgroundImage: `${linearGradient(
      gradients.secondary.main,
      gradients.secondary.state
    )} !important`,
  },
  ".bg-gradient-info": {
    backgroundImage: `${linearGradient(
      gradients.info.main,
      gradients.info.state
    )} !important`,
  },
  ".bg-gradient-success": {
    backgroundImage: `${linearGradient(
      gradients.success.main,
      gradients.success.state
    )} !important`,
  },
  ".bg-gradient-warning": {
    backgroundImage: `${linearGradient(
      gradients.warning.main,
      gradients.warning.state
    )} !important`,
  },
  ".bg-gradient-error": {
    backgroundImage: `${linearGradient(
      gradients.error.main,
      gradients.error.state
    )} !important`,
  },
  ".bg-gradient-light": {
    backgroundImage: `${linearGradient(
      gradients.light.main,
      gradients.light.state
    )} !important`,
  },
  ".bg-gradient-dark": {
    backgroundImage: `${linearGradient(
      gradients.dark.main,
      gradients.dark.state
    )} !important`,
  },
  ".border-0": {
    border: `${borderWidth[0]} solid ${borderColor} !important`,
  },
  ".border-1": {
    border: `${borderWidth[1]} solid ${borderColor} !important`,
  },
  ".border-2": {
    border: `${borderWidth[2]} solid ${borderColor} !important`,
  },
  ".border-3": {
    border: `${borderWidth[3]} solid ${borderColor} !important`,
  },
  ".border-4": {
    border: `${borderWidth[4]} solid ${borderColor} !important`,
  },
  ".border-5": {
    border: `${borderWidth[5]} solid ${borderColor} !important`,
  },
  ".radius-xs": {
    borderRadius: `${borderRadius.xs} !important`,
  },
  ".radius-sm": {
    borderRadius: `${borderRadius.sm} !important`,
  },
  ".radius-md": {
    borderRadius: `${borderRadius.md} !important`,
  },
  ".radius-lg": {
    borderRadius: `${borderRadius.lg} !important`,
  },
  ".radius-xl": {
    borderRadius: `${borderRadius.xl} !important`,
  },
  ".radius-xxl": {
    borderRadius: `${borderRadius.xxl} !important`,
  },
  ".radius-section": {
    borderRadius: `${borderRadius.section} !important`,
  },
  ".shadow": {
    boxShadow: `${boxShadows.regular} !important`,
  },
  ".shadow-xs": {
    boxShadow: `${boxShadows.xs} !important`,
  },
  ".shadow-sm": {
    boxShadow: `${boxShadows.sm} !important`,
  },
  ".shadow-lg": {
    boxShadow: `${boxShadows.lg} !important`,
  },
  ".shadow-xl": {
    boxShadow: `${boxShadows.xl} !important`,
  },
  ".shadow-xxl": {
    boxShadow: `${boxShadows.xxl} !important`,
  },
  ".shadow-inset": {
    boxShadow: `${boxShadows.inset} !important`,
  },
  ".shadow-none": {
    boxShadow: "none !important",
  },
  ".decoration-none": {
    textDecoration: "none !important",
  },
  ".w-max": {
    width: "max-content !important",
  },
  ".w-min": {
    width: "min-content !important",
  },
  ".w-100": {
    width: "100% !important",
  },
  ".h-max": {
    height: "max-content !important",
  },
  ".h-min": {
    height: "min-content !important",
  },
  ".h-100": {
    height: "100% !important",
  },
  ".cursor-pointer": {
    cursor: "pointer",
  },
  ".no-list-style": {
    listStyle: "none !important",
  },
  ".d-flex": {
    display: "flex !important",
  },
  ".d-block": {
    display: "block !important",
  },
  ".d-inline-block": {
    display: "inline-block !important",
  },
  ".mx-auto": {
    marginRight: "auto !important",
    marginLeft: "auto !important",
  },
  ".mr-auto": {
    marginRight: "auto !important",
  },
  ".ml-auto": {
    marginLeft: "auto !important",
  },
  ".my-auto": {
    marginTop: "auto !important",
    marginBottom: "auto !important",
  },
  ".mt-auto": {
    marginTop: "auto !important",
  },
  ".mb-auto": {
    marginBottom: "auto !important",
  },
  ".vertical-middle": {
    verticalAlign: "middle !important",
  },
  ".vertical-top": {
    verticalAlign: "top !important",
  },
  ".vertical-bottom": {
    verticalAlign: "bottom !important",
  },
  ".overflow-visible": {
    overflow: "visible !important",
  },
  ".overflow-auto": {
    overflow: "auto !important",
  },
  ".overflow-scroll": {
    overflow: "scroll !important",
  },
  ".overflow-hidden": {
    overflow: "hidden !important",
  },
  ".overflow-x-visible": {
    overflowX: "visible !important",
  },
  ".overflow-x-auto": {
    overflowX: "auto !important",
  },
  ".overflow-x-scroll": {
    overflowX: "scroll !important",
  },
  ".overflow-x-hidden": {
    overflowX: "hidden !important",
  },
  ".overflow-y-visible": {
    overflowY: "visible !important",
  },
  ".overflow-y-auto": {
    overflowY: "auto !important",
  },
  ".overflow-y-scroll": {
    overflowY: "scroll !important",
  },
  ".overflow-y-hidden": {
    overflowY: "hidden !important",
  },
  ".user-select-none": {
    userSelect: "none !important",
  },
  ".relative": {
    position: "relative !important",
  },
  ".absolute": {
    position: "absolute !important",
  },
  ".fixed": {
    position: "fixed !important",
  },
  ".sticky": {
    position: "sticky !important",
  },
  ".help-label": {
    backgroundRepeat: "no-repeat",
    backgroundPosition: `left ${pxToRem(80)} center`,
    backgroundSize: `${pxToRem(14)} ${pxToRem(14)}`,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e55d45' viewBox='0 0 24 24'%3E%3Cpath stroke-linejoin='round' d='M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E\")",
  },
};
