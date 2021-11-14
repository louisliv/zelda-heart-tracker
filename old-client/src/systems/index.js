import React from 'react';
import { UIView } from '@uirouter/react';
import SystemList from './systems';

const systems = {
    parent: 'app',
    name: 'systems',
    url: '/systems',
    component: () => <div><UIView/></div>
}

const systemList = {
    name: 'systems.list',
    url: '/',
    component: SystemList,
}

export {systems};
export {systemList}; 