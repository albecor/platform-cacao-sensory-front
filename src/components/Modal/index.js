import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  withStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { arrayOf, bool, func, node, oneOfType, string } from "prop-types";
import SuiTypography from "../SuiTypography";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => (
  <MuiDialogTitle disableTypography>
    <SuiTypography variant="h6">{props.title}</SuiTypography>
    {props.onClose ? (
      <IconButton
        aria-label="close"
        className={props.classes.closeButton}
        onClick={props.onClose}
      >
        <CloseIcon />
      </IconButton>
    ) : null}
  </MuiDialogTitle>
));

const Modal = ({
  actions,
  children,
  fullWidth,
  maxWidth,
  open,
  onClose,
  title,
}) => (
  <Dialog open={open} fullWidth={fullWidth} maxWidth={maxWidth}>
    <DialogTitle onClose={onClose} title={title} />
    <DialogContent>{children}</DialogContent>
    {actions.length > 0 && (
      <DialogActions>{actions.map((e) => e)}</DialogActions>
    )}
  </Dialog>
);

Modal.defaultProps = {
  actions: [],
  fullWidth: true,
  maxWidth: "sm",
  onClose: null,
  open: false,
  title: "",
};

Modal.propTypes = {
  actions: arrayOf(node),
  children: node.isRequired,
  fullWidth: bool,
  maxWidth: string,
  onClose: func,
  open: bool,
  title: oneOfType([node, string]),
};

export default Modal;
