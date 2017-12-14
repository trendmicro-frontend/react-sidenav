const NavIcon = () => {
    throw new Error('should not render NavIcon component');
};

// For component matching
NavIcon.defaultProps = {
    ...NavIcon.defaultProps,
    componentType: NavIcon
};

export default NavIcon;
