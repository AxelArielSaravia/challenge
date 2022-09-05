
/* APP REDUCER */
function GlobalReducer (state, action) {
    switch (action.type) {
      case "movie/home": return { 
        ...state,
        section: "movie", 
        type:"home",
        searchText: "",
        search: {},
        searchAreLoading: false,
        discover: {},
        discoverAreLoading: true,
        showAllUserSection: false,
        showPopularSection: false,
      };
      case "movie/search": return {
        ...state, 
        section: "movie", 
        type:"search",
        searchText: action.payload,
        search: {},
        searchAreLoading: true,
        showAllUserSection: false,
        showPopularSection: false,
      };
      case "movie/addGenres": return {
        ...state,
        movieGenres:action.payload,
        movieGenresAreLoading: false
      }
      case "movie/addUser": return {
        ...state,
        movieUser: action.payload,
        movieUserAreLoading: false
      }
   
      case "tvShow/home": return { 
        ...state,
        section: "tvShow", 
        type:"home",
        searchText: "",
        search: {},
        searchAreLoading: false,
        discover: {},
        discoverAreLoading: true,
        showAllUserSection: false,
        showPopularSection: false,
      };;
      case "tvShow/search": return {
        ...state, 
        section: "tvShow", 
        type:"search",
        searchText: action.payload,
        search: {},
        searchAreLoading: true,
        showAllUserSection: false,
        showPopularSection: false,
      };
      case "tvShow/addGenres": return {
        ...state,
        tvShowGenres:action.payload,
        tvShowGenresAreLoading: false
      }
      case "tvShow/addUser": return {
        ...state,
        tvShowUser: action.payload,
        tvShowUserAreLoading: false
      }
      case "addDiscover": return {
        ...state,
        discover: action.payload,
        discoverAreLoading: false,
      }
      case "addSearch": return {
        ...state,
        search: action.payload,
        searchAreLoading: false,
      }
      case "showAllUserSection": return {
        ...state,
        showAllUserSection: true,
        showPopularSection: false,
      }
      case "showPopularSection": return {
        ...state,
        showPopularSection: true,
        showAllUserSection: false,
      }
      default: return state;
    }
}  

export default GlobalReducer;