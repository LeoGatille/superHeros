import axios from 'axios';
import MD5 from 'crypto-js/md5';


const apiClient = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public/',
    withCredentials: false,

});
function setUserAuth() {
    const ts = new Date().getTime();
    const privateKey = 'dbea4b5914306d6faa41b8fb0c517c6b5e4e10ef';
    const publicKey = '58e5188184747926b42b515ea9097abf';
    const message = ts + privateKey + publicKey;
    const hash =  MD5(message).toString();
    return `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}
export default {
    getAllHeroes(limit, offset, nameStartsWith) {
        return apiClient.get(`characters${setUserAuth()}${limit ? '&limit=' + limit : ''}&offset=${offset}${nameStartsWith ? '&nameStartsWith=' + nameStartsWith: '' }`);
    },
    getHeroById(idHero) {
        return apiClient.get(`characters/${idHero}${setUserAuth()}`)
    }
}
