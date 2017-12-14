const matchComponent = (Component) => (c) => {
    // React Component
    if (c.type === Component) {
        return true;
    }

    // Matching componentType for SideNav, Nav, NavItem, NavIcon, NavText
    if (c.props && c.props.componentType === Component) {
        return true;
    }

    return false;
};

export default matchComponent;
