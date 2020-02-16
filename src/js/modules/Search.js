import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(query){ 
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            /**
             * If CORS: Try crossorigin.me or search gg: cors proxy
             * For Example: 
             * const proxy = 'https://cors-anywhere.herokuapp.com/' => Add this proxy to begin of https.
             */
            this.results = res.data.recipes;
            //console.log(this.results);
        } catch (error){
            alert(error);
        }
    }
}

