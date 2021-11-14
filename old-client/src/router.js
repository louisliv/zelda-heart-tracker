import homeState from 'home';
import { games, gameList, gameDetail } from 'games';
import { systems, systemList } from 'systems';
import { myGames, myGameList } from './my-games'
// import dashboardState from 'dashboard';
import { UIRouterReact, servicesPlugin, pushStateLocationPlugin } from '@uirouter/react';
import App from './App';
import AuthApi from './api/models/auth'

import {CurrentStateActions} from './store/current-state';
import {AuthActions} from './store/auth';

export const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

router.transitionService.onBefore(true, function(trans) {
    let toRoute= trans.to()
    AuthActions.setCurrent();
    if (toRoute.requireAuth) {
        return AuthApi.isAuthenticated()
            .then((response) => {
                if (!response) {
                    return trans.router.stateService.target('dashboard')
                }
            })
    }
})

router.transitionService.onSuccess(true, function(trans) {
    CurrentStateActions.set(trans.router.globals.current);
});

const app = {
    name: 'app',
    redirectTo: 'welcome',
    component: App,
    data: {
        excludeSidebar: false
    },
    requireAuth: false
};

const routes = [
    app,
    homeState,
    games,
    gameList,
    gameDetail,
    systems,
    systemList,
    myGames,
    myGameList
]

routes.forEach(route => router.stateRegistry.register(route));