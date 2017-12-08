import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from '@trendmicro/react-buttons';
import styles from './Navbar.styl';

export default class extends Component {
    static propTypes = {
        name: PropTypes.string,
        url: PropTypes.string
    };

    state = {
        collapseIn: false
    };

    render() {
        const { name, url } = this.props;

        return (
            <nav
                className={classNames(styles.navbar, styles.navbarDefault)}
                style={{ borderRadius: 0 }}
            >
                <div className={styles.containerFluid}>
                    <div className={styles.navbarHeader}>
                        <button
                            type="button"
                            className={classNames(styles.navbarToggle, styles.collapsed)}
                            onClick={() => {
                                this.setState({ collapseIn: !this.state.collapseIn });
                            }}
                        >
                            <span className={styles.srOnly}>Toggle navigation</span>
                            <span className={styles.iconBar} />
                            <span className={styles.iconBar} />
                            <span className={styles.iconBar} />
                        </button>
                        <a href="#" className={styles.navbarBrand}>{name}</a>
                    </div>
                    <div
                        className={classNames(
                            styles.collapse,
                            styles.navbarCollapse,
                            { [styles.in]: this.state.collapseIn }
                        )}
                    >
                        <Button
                            className={classNames(styles.navbarBtn, styles.navbarRight)}
                            btnStyle="flat"
                            onClick={() => {
                                window.location = url;
                            }}
                        >
                            <i className="fa fa-github" />
                            GitHub
                        </Button>
                    </div>
                </div>
            </nav>
        );
    }
}
