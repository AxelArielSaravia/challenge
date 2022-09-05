import { memo } from "react";

import MainHome from "./Main.Home.js";
import MainSearch from "./Main.Search.js"
import MainShowAll from "./Main.ShowAll.js"

import "./Main.scss";


const SelectMain = memo(function SelectMain({appState, isMinWidth768, isMinWidth992, dispatch}) {
    const appSection = appState.section === "movie" ? "movies" : "Tv shows";

    if (appState.showAllUserSection)
        return <MainShowAll 
            type="userWatching" 
            title="Continue Watching :"
            isMinWidth768={isMinWidth768}
            appState={appState}
        />;

    if (appState.showPopularSection)  
        return <MainShowAll     
            type="popular" 
            title={"Popular "+appSection+" 2022 :"}
            isMinWidth768={isMinWidth768}
            appState={appState}
        />;
    if (appState.type === "home") {
        const onClickAllUserWatching = () => dispatch("showAllUserSection");
        const onClickAllPopular = () => dispatch("showPopularSection");
        
        return <MainHome 
            appState={appState} 
            isMinWidth768={isMinWidth768} 
            isMinWidth992={isMinWidth992}
            onClickAllUserWatching={onClickAllUserWatching}
            onClickAllPopular={onClickAllPopular}
        />;
    }
    if (appState.type === "search") {

        return <MainSearch appState={appState} isMinWidth768={isMinWidth768}/>
    }
    return null;
});

const Main = memo(function Main({appState, isMinWidth768, isMinWidth992, dispatch}) {

    return (
        <main className="main d-flex flex-column px-2 z-index-3 bg-c-1">
            <div>
               <SelectMain 
                    appState={appState}
                    isMinWidth768={isMinWidth768}
                    isMinWidth992={isMinWidth992}
                    dispatch={dispatch}
               />
            </div>
        </main>
    );
});

export default Main;