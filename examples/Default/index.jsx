import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import ensureArray from 'ensure-array';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SideNav, { NavItem, NavIcon, NavText } from '../SideNav';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    background: #FFFFFF;
    color: #fff;

    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    line-height: 44px;
    padding: 10px 0;
    color: #09091A;
    font-size: 16px;
`;

export default class extends PureComponent {
    state = {
        selected: 'home',
        expanded: false
    };

    onSelect = (selected) => {
        console.log(selected);
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    pageTitle = {
        'home': 'Home',
        'devices': ['Devices'],
        'reports': ['Reports'],
        'settings/policies': ['Settings', 'Policies'],
        'settings/network': ['Settings', 'Network']
    };

    renderBreadcrumbs() {
        const { selected } = this.state;
        const list = ensureArray(this.pageTitle[selected]);

        return (
            <Breadcrumbs>
                {list.map((item, index) => (
                    <Breadcrumbs.Item
                        active={index === list.length - 1}
                        key={`${selected}_${index}`}
                    >
                        {item}
                    </Breadcrumbs.Item>
                ))}
            </Breadcrumbs>
        );
    }

    navigate = (pathname) => () => {
        this.setState({ selected: pathname });
    };

    render() {
        const { expanded, selected } = this.state;

        return (
            <div>
                <div
                    style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}
                >
                    <ButtonGroup>
                        <Button btnStyle="flat" onClick={this.navigate('home')}>
                            Home
                        </Button>
                        <Button btnStyle="flat" onClick={this.navigate('devices')}>
                            Devices
                        </Button>
                        <Button btnStyle="flat" onClick={this.navigate('reports')}>
                            Reports
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle>
                                Settings
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MenuItem onClick={this.navigate('settings/policies')}>
                                    Policies
                                </MenuItem>
                                <MenuItem onClick={this.navigate('settings/network')}>
                                    Network
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonGroup>
                </div>
                <SideNav onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <NavHeader expanded={expanded}>
                        <NavTitle>Side Navigation</NavTitle>
                    </NavHeader>
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle', color: '#09091A' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Home">
                                Home
                            </NavText>
                            <NavItem eventKey="first">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle', color: '#09091A' }} />
                                </NavIcon>
                                <NavText style={{ paddingRight: 32 }} title="First child">
                                 First child
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="second">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle', color: '#09091A' }} />
                                </NavIcon>
                                <NavText style={{ paddingRight: 32 }} title="Second child">
                               Second child
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <NavItem eventKey="devices">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', verticalAlign: 'middle', color: '#09091A' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Devices">
                                Devices
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="reports">
                            <NavIcon>
                                <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.75em', verticalAlign: 'middle', color: '#09091A' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Reports">
                                Reports
                            </NavText>
                            <NavItem eventKey="4124">
                                <NavText title="1424">
                                   test
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em', verticalAlign: 'middle', color: '#09091A' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                                Sub menu
                            </NavText>
                            <NavItem eventKey="settings/policies">
                                <NavText title="Policies">
                                    Policies
                                </NavText>
                                <NavItem eventKey="Sub menu 1">
                                    <NavText title="SUB1">
                                        Sub menu 1
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="SUB1">
                                    <NavText title="Sub menu 2">
                                        Sub menu 2
                                    </NavText>
                                    <NavItem eventKey="SUB4124">
                                        <NavText title="Sub menu fasdfdsf">
                                            After Sub menu 2
                                        </NavText>
                                    </NavItem>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="settings/network">
                                <NavText title="Network">
                                    Network
                                </NavText>
                                <NavItem eventKey="Sub menu 3">
                                    <NavText title="SUB3">
                                       Sub menu 3
                                    </NavText>
                                    <NavItem eventKey="Sub menu 4">
                                        <NavText title="SUB4">
                                        Sub menu 4
                                        </NavText>
                                    </NavItem>
                                </NavItem>
                            </NavItem>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
        );
    }
}
