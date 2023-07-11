import axios from 'axios';
const apiUrl = 'https://api.themoviedb.org/3/'

const userId = import.meta.env.VITE_TMDB_USER_ID
const apiKey = import.meta.env.VITE_TMDB_API_KEY

export const GlobalFunctions = {

    //api calls
    GetPopularFilms: (data) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + 'discover/movie', {
                params: {
                    include_adult: false,
                    include_video: false,
                    language: 'en-US',
                    page: data.page,
                    sort_by: 'popularity.desc'
                },
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    accept: 'application/json'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    GetSearchedPopulerFilms: (data) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + 'search/movie', {
                params: {
                    query: data.searchContent,
                    include_adult: false,
                    language: 'en-US',
                    page: data.page
                },
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    accept: 'application/json'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    GetFavoriteFilms: (data) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + 'account/' + userId + '/favorite/movies', {
                params: {
                    include_adult: false,
                    language: 'en-US',
                    page: data.page,
                    sort_by: 'created_at.desc'
                },
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    accept: 'application/json'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    GetFilmDetails: (data) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + 'movie/' + data.filmId +'?language=en-US', {
                params: {
                    language: 'en-US'
                },
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    accept: 'application/json'
                }
            })
            .then(response => {
                // console.log(response.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    GetFilmFavoriteState(data){
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + 'movie/' + data.filmId +'/account_states', {
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    accept: 'application/json'
                }
            })
            .then(response => {
                resolve(response.data.favorite)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    SetFavoriteState: (data) => {
        return new Promise((resolve, reject) => {
            axios.post(apiUrl + 'account/' + userId +'/favorite', 
                {
                    "media_type": "movie",
                    "media_id": data.filmId,
                    "favorite": data.favorited
                },
                {
                    headers: {
                        'Accept': 'application/json', 
                        'Authorization': 'Bearer ' + apiKey, 
                        'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    GetCredits: (data) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + 'movie/' + data.filmId +'/credits', {
                params: {
                    "language": "en-US"
                },
                headers: {
                    'Accept': 'application/json', 
                    'Authorization': 'Bearer ' + apiKey, 
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },

    // apitemplate: (data) => {
    //     return new Promise((resolve, reject) => {

    //         .then(response => {
    //             resolve(response.data)
    //         })
    //         .catch(error => {
    //             reject(error)
    //         });
    //     })
    // },

    //general functions
    CheckIfFavorited: (favoritesData, filmId) => {
        if(favoritesData == undefined) return
        for (let i = 0; i < favoritesData.length; i++) {
            const film = favoritesData[i];
            if(film.id == filmId){
                return true
            }
        }
        return false
    }
    
}