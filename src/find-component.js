import React from 'react';

const findComponent = (component) => (children) => {
    return React.Children.toArray(children).reduce((found, next) => {
        if (found === null && next !== null && next.type === component) {
            return next;
        }
        return found;
    }, null);
};

export default findComponent;
