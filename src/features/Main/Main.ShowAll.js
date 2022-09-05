import { memo } from "react";

import { Card1, CardUserWatch } from "../Card/Card.js";


const SelectMainShowAll = ({type, isMinWidth768, appState}) => {
    const appSection = appState.section;
    const appGenres = appState[appSection+"Genres"];
    const style = isMinWidth768 
        ? {maxWidth: "400px"}
        : null

    if (type === "userWatching") {
        const userWatching = appState[appSection+"User"];
        return userWatching.map(el => (
            <CardUserWatch 
            key={el.id} 
            cardState={el}
            appGenres={appGenres}
            style={style}
            showTrending={true}
            />
        ));
    }
    if (type === "popular") {
        const discover = appState.discover
        return discover.results.map(el => (
            <Card1 
                key={el.id} 
                cardState={el}
                appGenres={appGenres}
                style={style}
            />
        ));
    }
 
}

const MainShowAll = memo(function MainShowAll({type, title, isMinWidth768, appState}) {
    return (
        <>
            <div className="section-title d-flex flex-row  align-items-center p-4">
                 <h4 className="fw-bold">{title}</h4>
             </div>
            <div className="section-card">
                <div className="d-flex flex-row flex-wrap justify-content-center">
                   <SelectMainShowAll type={type} isMinWidth768={isMinWidth768} appState={appState}/>
                </div>
            </div>
        </>
    );
})
export default MainShowAll;