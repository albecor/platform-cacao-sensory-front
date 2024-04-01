import SuiBox from "components/SuiBox";
import Table from "components/Table";
import PropTypes from "prop-types";
import styles from "./styles";

const TableLayout = ({ columns, rows }) => {
  const classes = styles();
  return (
    <SuiBox customClass={classes.tables_table}>
      <Table columns={columns} rows={rows} />
    </SuiBox>
  );
};

TableLayout.defaultProps = {
  columns: [],
  rows: [{}],
};

TableLayout.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.string.isRequired,
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default TableLayout;
