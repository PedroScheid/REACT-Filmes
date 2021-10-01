import axios from 'axios';

//URL FILMES EM CARTAZ:
//https://api.themoviedb.org/3/movie/now_playing?api_key=8320bd8c1afd32d80f95d3e025013a75&language=pt-BR&page=1

export const key = '8320bd8c1afd32d80f95d3e025013a75'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;