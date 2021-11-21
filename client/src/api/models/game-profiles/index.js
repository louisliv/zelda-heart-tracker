import { api } from "../../api";

var GameProfiles = api.createModel('gameprofiles');

GameProfiles.byGame = (gameId) => {
    return GameProfiles.get('by_game', { game: gameId })
}

GameProfiles.addCollectible = (profileId, collectibleId) => {
    return GameProfiles.post({ id: collectibleId }, `${profileId}/add_collectible`)
}

GameProfiles.removeCollectible = (profileId, collectibleId) => {
    return GameProfiles.post({ id: collectibleId }, `${profileId}/remove_collectible`)
}

export default GameProfiles;
