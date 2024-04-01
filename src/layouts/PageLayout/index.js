import PropTypes from "prop-types";

import SuiBox from "components/SuiBox";

function PageLayout({ background, children }) {
  return (
    <SuiBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      backgroundColor={background}
      customClass="overflow-x-hidden"
    >
      {children}
    </SuiBox>
  );
}

PageLayout.defaultProps = {
  background: "default",
};

PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
