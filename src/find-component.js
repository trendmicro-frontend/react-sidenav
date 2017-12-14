import React from 'react';
import match from './match-component';

const findComponent = (component) => (children) => {
    const matchComponent = match(component);

    return React.Children.toArray(children).reduce((found, next) => {
        if (found === null && next !== null && matchComponent(next)) {
            return next;
        }
        return found;
    }, null);
};

export default findComponent;
