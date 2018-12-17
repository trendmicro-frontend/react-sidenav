/* eslint no-prototype-builtins: 0 */
import React from 'react';
import { NavItem, NavIcon, NavText } from '../SideNav';

const generateSubNav = (subArray) => {
    return subArray.map((subItem) => {
        return (
            <NavItem
                key={subItem.id}
                eventKey={subItem.to ? subItem.to : subItem.id}
            >
                {subItem.icon &&
                <NavIcon>
                    <i className={`fa fa-${subItem.icon}`} />
                </NavIcon>
                }
                <NavText title={subItem.label}>
                    {subItem.label}
                </NavText>
                {subItem.hasOwnProperty('content') && generateSubNav(subItem.content)}
            </NavItem>
        );
    });
};

const generateMenu = (content, props) => {
    return content.map((item) => {
        return (
            <NavItem
                key={item.id}
                toggleExpanded={props.onToggle}
                eventKey={item.to ? item.to : item.id}
            >
                <NavIcon>
                    <i className={`fa fa-${item.icon}`} style={{ fontSize: '20px' }} />
                </NavIcon>
                <NavText style={{ fontSize: '16px' }} title={item.label}>
                    {item.label}
                </NavText>
                {item.hasOwnProperty('content') && generateSubNav(item.content)}
            </NavItem>
        );
    });
};

export default generateMenu;