import { useCallback, useEffect, useReducer } from "react";

import { useMatchMedia } from "./hooks/index.js";

import { fetchGenres, fetchUser, fetchDiscover, fetchSearch } from "./services/fetch/index.js";

import initGlobalState from "./state/app.js";
import GlobalReducer from "./reducer/index.js";

import userState from "./state/user.js";

import Header from "./features/Header/Header.js";
import Aside from "./features/Aside/Aside.js";
import Main from "./features/Main/Main.js";


function App() {
  const [appState, dispatchAppState] = useReducer(GlobalReducer, initGlobalState);
  
  /**@type {boolean} */
  const isMinWidth768 = useMatchMedia("(min-width: 768px)");
  const isMinWidth992 = useMatchMedia("(min-width: 992px)");

  const appSection = appState.section;
  const genresAreLoading = appState[appSection + "GenresAreLoading"];
  const userAreLoading = appState[appSection + "UserAreLoading"];
  const discoverAreLoading = appState.discoverAreLoading;
  const searchText = appState.searchText;
  const searchAreLoading = appState.searchAreLoading;
  const appType = appState.type;

  const goHome = useCallback((section) => { dispatchAppState({type: section + "/home"})}, []);
  const search = useCallback((text) => { dispatchAppState({type: appSection + "/search", payload: text})}, [appSection]);
  const dispatch = useCallback((text) => { dispatchAppState({type: text})}, []);
  
  useEffect(() => {
    if (genresAreLoading) {
      fetchGenres(appSection, (data) => dispatchAppState({type: appSection+"/addGenres", payload: data}));
    }
  },[appSection, genresAreLoading, dispatchAppState]);

  useEffect(() => {
    if (appType === "home") {
      if (userAreLoading) {
        fetchUser(appSection, userState[appSection].watching, (data) => dispatchAppState({type: appSection+"/addUser", payload: data}));
      }
      if (discoverAreLoading) {
        fetchDiscover(appSection, userState[appSection].genres, (data) => dispatchAppState({type: "addDiscover", payload: data}));
      }
    }
  },[appSection, appType, userAreLoading, discoverAreLoading, dispatchAppState]);


  useEffect(() => {
    if (appType === "search") {
      if (searchAreLoading) {
        fetchSearch(appSection, searchText, (data) => dispatchAppState({type: "addSearch", payload: data}));
      }
    }
  },[appSection, appType, searchAreLoading, searchText]);

  return (
    <>
      <Header 
        goHome={goHome}
        search={search}
        isMinWidth768={isMinWidth768} 
        appState={appState}
      />
      <section className="d-flex flex-column flex-xl-row">
        <Aside 
          appState={appState} 
          isMinWidth768={isMinWidth768} 
          isMinWidth992={isMinWidth992}
        /> 
        <Main 
          appState={appState} 
          isMinWidth768={isMinWidth768} 
          isMinWidth992={isMinWidth992}
          dispatch={dispatch}
        />
      </section>
    </>
  );
}

export default App;
