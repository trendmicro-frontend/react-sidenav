declare module '@trendmicro/react-sidenav' {
    import { PureComponent, CSSProperties, FunctionComponent } from 'react';

    namespace SideNav {
        const NavIcon: FunctionComponent<any>

        const NavText: FunctionComponent<any>

        interface NavItemProps {
            componentType?: any;
            componentClass?: string | Function;
            active?: boolean;
            disabled?: boolean;
            expanded?: boolean;
            eventKey?: any;
            onClick?: Function;
            onSelect?: Function;
            selected?: any;
            subnav?: boolean;
            navitemClassName?: string;
            navitemStyle?: CSSProperties;
            subnavClassName?: string;
            subnavStyle?: CSSProperties;
        }

        class NavItem extends PureComponent<NavItemProps & any, any> {}

        interface ToggleProps {
            componentType?: any;
            componentClass?: string | Function;
            disabled?: boolean;
            expanded?: boolean;
        }

        class Toggle extends PureComponent<ToggleProps & any, any> {}

        interface NavProps {
            componentType?: any;
            componentClass?: string | Function;
            onSelect?: Function;
            selected?: any;
            defaultSelected?: any;
            expanded?: boolean;
        }

        class Nav extends PureComponent<NavProps & any, any> {}

        interface SideNavProps {
            componentType?: any;
            componentClass?: string | Function;
            disabled?: boolean;
            expanded?: boolean;
            onToggle?: Function;
            onSelect?: Function;
        }
    }

    class SideNav extends PureComponent<SideNav.SideNavProps & any, any> {}

    export = SideNav;
}
