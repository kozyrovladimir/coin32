import axios from "axios";

const instance = axios.create({
    baseURL: 'https://rawg.io/api/',
});

export const gamesAPI = {
    getGames(params) {
        return instance.get('games', {params:{key: "8ecc3d64c2dd49f6960786aa9d6d2c70", page: 1, page_size: 12, ...params}})
    },
    getGame(id) {
        return instance.get(`games/${id}`, {params:{key: "8ecc3d64c2dd49f6960786aa9d6d2c70"}})
    },
    getScreenshots(id) {
        return instance.get(`games/${id}/screenshots`, {params:{key: "8ecc3d64c2dd49f6960786aa9d6d2c70"}})
    },
    getDataFromUrl(url) {
        return axios.get(url);
    },
}
