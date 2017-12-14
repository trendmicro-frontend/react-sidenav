const NavText = () => {
    throw new Error('should not render NavText component');
};

// For component matching
NavText.defaultProps = {
    ...NavText.defaultProps,
    componentType: NavText
};

export default NavText;
