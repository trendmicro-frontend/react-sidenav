import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import SideNav from './SideNav';

class App extends React.Component {
    state = {
        activeKey: 'home'
    };

    render() {
        const name = 'React SideNav';
        const url = 'https://github.com/trendmicro-frontend/react-sidenav';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div
                    style={{
                        position: 'relative',
                        height: 'calc(100vh - 50px)'
                    }}
                >
                    <SideNav
                        activeKey={this.state.activeKey}
                        onSelect={(key) => {
                            this.setState({ activeKey: key });
                        }}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
