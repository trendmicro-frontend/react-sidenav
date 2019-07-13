# react-sidenav [![build status](https://travis-ci.org/trendmicro-frontend/react-sidenav.svg?branch=master)](https://travis-ci.org/trendmicro-frontend/react-sidenav) [![Coverage Status](https://coveralls.io/repos/github/trendmicro-frontend/react-sidenav/badge.svg?branch=master)](https://coveralls.io/github/trendmicro-frontend/react-sidenav?branch=master)

[![NPM](https://nodei.co/npm/@trendmicro/react-sidenav.png?downloads=true&stars=true)](https://nodei.co/npm/@trendmicro/react-sidenav/)

React SideNav

Demo: https://trendmicro-frontend.github.io/react-sidenav

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-sidenav](https://github.com/trendmicro-frontend/react-sidenav):

  ```
  npm install --save react @trendmicro/react-sidenav
  ```

2. At this point you can import `@trendmicro/react-sidenav` and its styles in your application as follows:

  ```js
  import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

  // Be sure to include styles at some point, probably during your bootstraping
  import '@trendmicro/react-sidenav/dist/react-sidenav.css';
  ```

## Usage

These examples make use of font-awesome.

```jsx
<SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="charts">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Charts
            </NavText>
            <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>
```

### React Router v4 with React v16

```jsx
<Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="devices">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Devices
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Route path="/" exact component={props => <RootComponent />} />
                <Route path="/home" component={props => <Home />} />
                <Route path="/devices" component={props => <Devices />} />
            </main>
        </React.Fragment>
    )}
    />
</Router>
```

### Close the side navigation menu when clicking outside

You can find a click-outside React component (https://github.com/tj/react-click-outside/blob/master/index.js) and do something below:

```jsx
<ClickOutside
    onClickOutside={() => {
        this.setState({ expanded: false });
    }}
>
    <SideNav
        expanded={this.state.expanded}
        onToggle={(expanded) => {
            this.setState({ expanded });
        }}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
</ClickOutside>
```

## API

### Properties

#### SideNav

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
componentClass | element | 'nav' | A custom element for this component.
disabled | boolean | | Whether the navigation toggle is disabled.
expanded | boolean | | Whether the side navigation is expanded or collapsed.
onToggle | function(boolean) | | Callback fired when toggling the side navigation between expanded and collapsed state.
onSelect | function(eventKey, event) | | Callback fired when a navigation item is selected.

#### Toggle

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
componentClass | element | 'button' | A custom element for this component.
disabled | boolean | false | Whether the navigation toggle is disabled.
expanded | boolean | false | Whether the side navigation is expanded or collapsed.

#### Nav

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
componentClass | element | 'div' | A custom element for this component.
onSelect | function(eventKey, event) | | Callback fired when a navigation item is selected.
selected | any | | The selected navigation item.
defaultSelected | any | | The initially selected navigation item.
expanded | boolean | false | Whether the side navigation is expanded or collapsed.

#### NavItem

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
componentClass | element | 'div' | A custom element for this component.
active | boolean | false | Highlight the navigation item as active.
disabled | boolean | false | Disable the navigation item, making it unselectable.
expanded | boolean | false | Whether the navigation item is expanded or collapsed.
eventKey | any | _(required)_ | Value passed to the `onSelect` handler, useful for identifying the selected navigation item.
onClick | function(event) | | Callback fired when the navigation item is clicked.
onSelect | function(eventKey, event) | | Callback fired when a navigation item is selected.
navitemClassName | | |
navitemStyle | | |
subnavClassName | | |
subnavStyle | | |

#### NavIcon

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
children | any | |

#### NavText

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
children | any | |

## License

MIT
