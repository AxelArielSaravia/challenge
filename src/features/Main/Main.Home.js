import { memo, useMemo } from "react";

import { AccessButton } from "../../components/index.js";

import { Card1, CardUserWatch, CardFull } from "../Card/Card.js";

import { selectRandomMovie } from "../utils.js";


const MainHome = memo(function MainHome({appState, isMinWidth768, isMinWidth992, onClickAllPopular, onClickAllUserWatching}) {
    const appSection = appState.section;
    const userWatching = appState[appSection+"User"];
    const UserAreLoading = appState[appSection+"UserAreLoading"];
    const discoverAreLoading = appState.discoverAreLoading
    const discover = appState.discover
    const appGenres = appState[appSection+"Genres"];

    const fourMovies = useMemo(() => !discoverAreLoading ? selectRandomMovie(discover.results, 4) : [], [discoverAreLoading, discover]);
    const text = appSection === "movie" ? "movies" : "Tv shows";

    return (
        <>
            <section className="main-header">
                { !discoverAreLoading && 
                    <CardFull 
                        cardState={fourMovies[0]}
                        imgStyle={{height: "180px"}}
                        size={isMinWidth768 ? "w780" : "w500" }
                    />
                }
            </section>
            <section className="main-watching">
                <div className="section-title d-flex flex-column flex-sm-row justify-content-between py-4">
                    <div className="d-flex flex-row align-items-center">
                        <h4 className="fs-5 fs-md-4 fw-bold">Continue Watching</h4>
                        <span className="px-2 c-2">|</span>
                        <span className="c-2">{userWatching.length + " " + text}</span>
                    </div>
                    <AccessButton text={"Show all"} onClick={onClickAllUserWatching}/>
                </div>
                <div className="section-card">
                    <div className="d-flex flex-md-row flex-column align-items-center justify-content-around">
                        { !UserAreLoading &&
                            userWatching.filter((_, i) => i < 2 ).map(el => (
                                <CardUserWatch 
                                    key={el.id} 
                                    cardState={el}
                                    size={isMinWidth768 ?"w780" : "w500" }
                                    appGenres={appGenres}
                                    showTrending={true}
                                />
                        ))}
                    </div>
                </div>
            </section>
            <section className="main-popular">
                <div className="section-title d-flex flex-column flex-sm-row justify-content-between py-4">
                    <h4 className="fs-5 fs-md-4 fw-bold">{"Popular "+text+" 2022"}</h4>
                    <AccessButton text={"Show all"} onClick={onClickAllPopular}/>
                </div>
                <div className="section-card">
                    <div className="d-flex flex-md-row flex-column align-items-center justify-content-around">

                            { !discoverAreLoading && 
                                fourMovies.map((el, i) => {
                                    if (i === 0) return null;
                                    if (isMinWidth768 && !isMinWidth992 && i === 3) return null;
                                    return (
                                        <Card1 
                                            key={el.id} 
                                            cardState={el}
                                            appGenres={appGenres}
                                        />
                                    )
                                })
                            }
                    </div>
                </div>
            </section>
        </>
    );
});

export default MainHome;