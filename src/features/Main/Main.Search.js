import { memo } from "react";

import { Card1 } from "../Card/Card.js";


const MainSearch = memo(function MainSearch({appState, isMinWidth768 }) {
    const appSection = appState.section;
    const searchAreLoading = appState.searchAreLoading;
    const searchResults = appState.search?.results;
    const appGenres = appState[appSection+"Genres"];
    const title = appSection === "movie" ? "movies" : "Tv shows";
    const searchText = appState.searchText

    const style = isMinWidth768 
        ? {maxWidth: "400px"}
        : null
    return (
        <>
            <div className="section-title d-flex flex-row  align-items-center p-4">
                 <h4 className="fw-bold">{"Search in " + title + " : "}</h4>
                 <p className="fs-5 px-2">{'"' + searchText + '"'}</p>
             </div>
            <div className="section-card">
                <div className="d-flex flex-row flex-wrap justify-content-center">
                    { !searchAreLoading && (
                        searchResults.map(el => (
                            <Card1 
                                key={el.id} 
                                cardState={el}
                                appGenres={appGenres}
                                style={style}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    )
});
export default MainSearch;