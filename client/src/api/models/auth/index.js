import {api} from '../../api';

var Auth = api.createModel('auth');

Auth.current = () => {
    return Auth.getAll({}, 'current')
}

Auth.isAuthenticated = () => {
    return Auth.getAll({}, 'is_authenticated')
}

Auth.login = (credentials) => {
    return Auth.post(credentials, 'login')
}

Auth.logout = () => {
    return Auth.post({}, 'logout')
}

export default Auth;