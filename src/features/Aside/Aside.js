import { useState, useMemo, memo} from "react";

import userState from "../../state/user.js";

import { selectRandomMovie } from "../utils.js";

import { PlayButton } from "../../components/index.js";
import { Card2, CardLoader } from "../Card/Card.js";
import { IconAdd } from "../../icons/index.js"

import "./Aside.scss";

/* Color select */
const colors = ["orange", "violet", "blue"];

const random = () =>  Math.floor(Math.random() * colors.length);


const GenreElement = ({text, onClick, color}) => {
    return (
        <div className="p-2">
            <button type="button" className={"py-1 px-2 rounded bg-c-" +color} onClick={onClick}>
                <p className="fw-bold">{text}</p>
            </button>
        </div>
    );
}


const Aside = memo(function Aside({appState, isMinWidth768}) {
    const [open, setOpen] = useState(false);

    const appSection = appState.section;
    const appGenres = appState[appSection+"Genres"];
    const appGenresAreLoading = appState[appSection+"GenresAreLoading"];

    const userGenres = userState[appSection].genres;
    const discoverAreLoading = appState.discoverAreLoading
    const discover = appState.discover
    const twoMovies = useMemo(() => !discoverAreLoading ? selectRandomMovie(discover.results, 2) : [], [discoverAreLoading, discover]);

    const onClickAsideActive = () => setOpen(state => !state);
    return (
        <div className="d-flex flex-column flex-xl-row z-index-1">  
            <div className={open ? "aside-container d-flex flex-row" : "aside-container close d-flex flex-row"}>
                <aside className="aside d-flex flex-row">
                    <div className="d-flex flex-column justify-content-between">
                        { isMinWidth768 && (
                            <section className="p-2" style={{width: "100%"}}>
                                <h5 className="fw-bold p-2">New trailers</h5>
                                <div className="d-flex flex-row flex-xl-column align-items-center justify-content-around">
                                    { discoverAreLoading  
                                        ? [0,0].map((_, i) => 
                                            <CardLoader
                                                key={"loader" + i}
                                                width="400px"
                                                height= "150px"
                                            />
                                        )
                                        : twoMovies.map((el) => (
                                            <Card2 
                                                key={el.id} 
                                                cardState={el}
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "400px",
                                                    
                                                }}
                                                imgStyle={{height: "150px"}}
                                                appGenres={appGenres}
                                            />
                                    ))}
                                </div>
                            </section>
                        )}
                        <section className="bg-c-2 px-2 py-4 rounded" style={{width: "100%"}}>
                            <h5 className="fw-bold p-2">Favourite genres</h5>
                           {!appGenresAreLoading &&  (
                                <>
                                    <div className="d-flex flex-row flex-wrap align-items-c">
                                        {userGenres.map(id => (
                                            <GenreElement 
                                                key={id} 
                                                text={appGenres[id]}
                                                color={colors[random()]}
                                            />
                                        ))}
                                    </div> 
                                    <div>
                                        <button type="button" className="px-2 d-flex flex-row align-items-center">
                                            <IconAdd/>
                                            <p className="c-1 px-1">Add your favourite genre</p>
                                        </button>
                                    </div>
                                </>
                            )}
                        </section>
                    </div>
                </aside>
            </div>
            <div className="aside-action z-index-3 d-flex felx-column justify-content-center align-items-center align-items-xl-start py-4 py-xl-0 bg-c-1"  
                onClick={onClickAsideActive}
            >
                <button type="button" className={open ? "button open" :"button"}>
                    <PlayButton/>
                </button>
                <div className="v-line"/>
            </div>
        </div>
    );
})

export default Aside;