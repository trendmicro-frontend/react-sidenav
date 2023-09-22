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
            eventKey: string;
            onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
            onSelect?: (eventKey: string, event?: React.MouseEvent<HTMLElement>) => void;
            selected?: string;
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
            onSelect?: (eventKey: string, event?: React.MouseEvent<HTMLElement>) => void;
            selected?: string;
            defaultSelected?: string;
            expanded?: boolean;
        }

        class Nav extends PureComponent<NavProps & any, any> {}

        interface SideNavProps {
            componentType?: any;
            componentClass?: string | Function;
            disabled?: boolean;
            expanded?: boolean;
            onToggle?: Function;
            onSelect?: (expanded: boolean) => void;
        }
    }

    class SideNav extends PureComponent<SideNav.SideNavProps & any, any> {}

    export = SideNav;
}
