import {api} from 'api/api.js';

var MyGames = api.createModel('gamelist');

MyGames.addGame = (data) => {
    return MyGames.post(data, 'add_game')
}

export default MyGames;