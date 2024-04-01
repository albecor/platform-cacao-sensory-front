import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function ItemList({ children, title, noGutter, primaryAction }) {
  return (
    <SuiBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <SuiBox lineHeight={1.45}>
        <SuiTypography display="block" variant="button" fontWeight="medium">
          {title}
        </SuiTypography>
        {children}
      </SuiBox>
      <SuiBox display="flex" alignItems="center">
        <SuiBox
          display="flex"
          alignItems="center"
          lineHeight={0}
          ml={3}
          customClass="cursor-pointer"
          onClick={primaryAction}
        >
          <Icon>edit</Icon>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

ItemList.defaultProps = {
  noGutter: false,
  children: null,
  primaryAction: null,
};

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  noGutter: PropTypes.bool,
  primaryAction: PropTypes.func,
};

export default ItemList;
