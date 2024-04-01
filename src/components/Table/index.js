import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import {
  TableBody,
  TableContainer,
  TableRow,
  Table as MuiTable,
} from "@material-ui/core";
import { useTable, useSortBy } from "react-table";
import styles from "./styles";

function Table({ columns, rows: data }) {
  const { greenDark } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  const renderColumns = (headers) =>
    headers.map((column, key) => {
      const classes = styles({
        hasSort: column.hasSort,
        sort: column.isSortedDesc,
      });
      const { align } = column;
      let pl;
      let pr;

      if (key === 0) {
        pl = 3;
        pr = 3;
      } else if (key === columns.length - 1) {
        pl = 3;
        pr = 3;
      } else {
        pl = 1;
        pr = 1;
      }

      return (
        <SuiBox
          {...column.getHeaderProps(
            column.hasSort && column.getSortByToggleProps()
          )}
          key={key}
          component="th"
        >
          <SuiBox
            customClass={classes.headerContainer}
            pt={1.5}
            pb={1.25}
            pl={align === "left" ? pl : 3}
            pr={align === "right" ? pr : 3}
            textAlign={align}
            fontSize={size.xxs}
            fontWeight={fontWeightBold}
            color="secondary"
            opacity={0.7}
            borderBottom={`${borderWidth[1]} solid ${greenDark.focus}`}
          >
            {column.render("Header").toUpperCase()}
            {column.hasSort && (
              <SuiBox customClass={classes.sortContainer}>
                <SuiBox color="secondary" customClass={classes.sortUp}>
                  <Icon fontSize="small" color="inherit">
                    arrow_drop_up
                  </Icon>
                </SuiBox>
                <SuiBox color="secondary" customClass={classes.sortDown}>
                  <Icon fontSize="small" color="inherit">
                    arrow_drop_down
                  </Icon>
                </SuiBox>
              </SuiBox>
            )}
          </SuiBox>
        </SuiBox>
      );
    });

  const renderRows = rows.map((row, key) => {
    prepareRow(row);
    const rowKey = `row-${key}`;
    return (
      <TableRow key={rowKey} {...row.getRowProps()}>
        {row.cells.map((cell, keyC) => {
          const { align } = cell.column;
          return (
            <SuiBox
              {...cell.getCellProps()}
              key={keyC}
              component="td"
              p={1}
              textAlign={align}
            >
              <SuiTypography
                variant="button"
                fontWeight="regular"
                textColor="secondary"
                customClass="d-inline-block w-max"
              >
                {cell.render("Cell").child || cell.render("Cell")}
              </SuiTypography>
            </SuiBox>
          );
        })}
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <MuiTable {...getTableProps()}>
        <SuiBox component="thead">
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {renderColumns(headerGroup.headers)}
            </TableRow>
          ))}
        </SuiBox>
        <TableBody {...getTableBodyProps()}>{renderRows}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
