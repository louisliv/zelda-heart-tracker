import { api } from "../../api";

var Collectibles = api.createModel("collectibles");

Collectibles.byCategory = (gameId) => {
    return Collectibles.get('by_category', { game: gameId })
}

export default Collectibles;
