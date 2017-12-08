import classNames from 'classnames';
import React from 'react';
import styles from './Section.styl';

export default (props) => (
    <div className={classNames(props.className, styles.section)}>
        <div className={styles.sectionContent}>
            {props.children}
        </div>
    </div>
);
