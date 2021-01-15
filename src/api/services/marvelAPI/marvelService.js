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
    const hash = MD5(message).toString();
    return `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}

function setQuery(query) {
    query.limit = query.limit ? '&limit=' + query.limit : '';
    query.offset = query.offset ? '&offset=' + query.offset : '';
    query.nameStartsWith = query.nameStartsWith ? '&nameStartsWith=' + query.nameStartsWith : '';
    query.orderBy = query.orderBy ? '&orderBy=' + query.orderBy : '';

    return query.limit + query.offset + query.nameStartsWith + query.orderBy;
}

export default {
    getAllHeroes(query) {
        return apiClient.get(`characters${setUserAuth()}${setQuery(query)}`);
    },
    getHeroById(idHero) {
        return apiClient.get(`characters/${idHero}${setUserAuth()}`)
    }
}
