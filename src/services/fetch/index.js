/* FETCH SRC */
const FETCH_GENRES = {
    movie: "https://api.themoviedb.org/3/genre/movie/list?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US",
    tvShow: "https://api.themoviedb.org/3/genre/tv/list?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US"
}

const FETCH_GET = {
    /**@type {(a: number) => string} */
    movie: (movie_id) => "https://api.themoviedb.org/3/movie/" +movie_id +"?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US",
    /**@type {(a: number) => string} */
    tvShow: (tv_id) => "https://api.themoviedb.org/3/tv/"+tv_id+"?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US"
}

const FETCH_DISCOVER = {
    movie: "https://api.themoviedb.org/3/discover/movie?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=",
    tvShow: "https://api.themoviedb.org/3/discover/tv?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_genres="
}

const FETCH_SEARCH = {
    movie: "https://api.themoviedb.org/3/search/movie?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US&page=1&include_adult=false&query=",
    tvShow:"https://api.themoviedb.org/3/search/tv?api_key=18858e56d615773c66ac69d95987d9eb&language=en-US&page=1&include_adult=false&query=",
}

/* FETCH FUNCTIONS */

/**
 * Fetch generic function
 * @param {string} fetchSrc 
 * @param {function} callback a dispatcher 
 */
const _fetch = async (fetchSrc, callback) => {
    try {
        let data;
        const res = await fetch(fetchSrc);
        if (res.ok) data = await res.json();
        else throw res;
        callback(data);
    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {string} appSection 
 * @param {function} callback a dispatcher 
 */
const fetchGenres = async (appSection, callback) => {
    try {
        let data;
        const res = await fetch(FETCH_GENRES[appSection]);
        if (res.ok) data = await res.json();
        else throw res;

        const g = {};
        data.genres.forEach(({id, name}) => g[id] = name);
        callback(g);

    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {string} appSection 
 * @param {number[]} userWatching  user.{section}.watching
 * @param {function} callback a dispatcher
 */
const fetchUser = async (appSection, userWatching, callback) => {
    try {
        const arr = [];
        for await (const el of userWatching) {
            let data;
            const fetchSrc = FETCH_GET[appSection](el.id);
            const res = await fetch(fetchSrc);
            if (res.ok) data = await res.json();
            else throw res;
            //Add relevat data;
            data.friends = el.friends;
            data.timeView = el.timeView;
            data.lastView = el.lastView;

            arr.push(data);
        }
        callback(arr);
    } catch (err) {
        console.error(err);
    }
}


/**
 * @param {string} appSection 
 * @param {number[]} userGenres 
 * @param {function} callback a dispatcher
 */
const fetchDiscover = (appSection, userGenres, callback) => {
    const randUserGenre = userGenres.length !== 0 ? userGenres[Math.floor(Math.random() * userGenres.length)] : "";
    const randText = FETCH_DISCOVER[appSection] + randUserGenre;
    _fetch(randText, callback);
}

/**
 * @param {string} appSection 
 * @param {string} textSearch 
 * @param {function} callback a dispatcher 
 */
const fetchSearch = (appSection, textSearch, callback) => {
    const src = FETCH_SEARCH[appSection] + textSearch;
    _fetch(src, callback);
} 

export { fetchGenres, fetchUser, fetchDiscover, fetchSearch }