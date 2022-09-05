import { PlayButton } from "../../components/index.js";

import { IconStart, IconLine, IconView } from "../../icons/index.js";

import { secToTimeString, minutesToTme } from "./utils.js";

import ImgFirend1 from "../../images/firend1.png"; 
import ImgFirend2 from "../../images/firend2.png"; 

import "./Card.scss";

/* GENERIC CARD */
function CardGen({cardState, style, size = "w500", imgStyle, children}) {
    const imgSrc = "https://image.tmdb.org/t/p/"+size+"/" + cardState.backdrop_path;
    const name = cardState.title ? cardState.title : cardState.name;
    return (
        <div className="card-container p-3" style={style ? style : null}>
            <div className="Card rounded" style={style ? style : null}>
                <img 
                    className="card-img img-fluid rounded z-index-2" 
                    src={imgSrc} 
                    alt={name} 
                    style={imgStyle? imgStyle: null}
                />
                <div className="brightness rounded z-index-2"></div>
                {children}
            </div>
        </div>
    );

}



function CardBottom({title, childrenRight, childrenLeft}) {
    return (
        <div className="card-bottom d-flex flex-row align-items-center justify-content-between p-2 rounded bg-c-7 z-index-2">
            <div className="d-flex flex-row align-items-center">
                <div>
                    <PlayButton/>
                </div>
                <div className="d-flex flex-column px-2">
                    <h5 className="video-title fs-md-5 fw-bold px-1 ellipsis">{title}</h5>
                    {childrenRight()}
                </div>
            </div>
            <div className="d-flex flex-row align-items-center">
                { childrenLeft != null && (
                    <>
                        <div className="px-2">
                            <IconLine/>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            {childrenLeft()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function CardTop({ children, end = false }) {
    const CardTopClassName = "card-top p-2 d-flex flex-row z-index-2 ";
    const CN = end ? CardTopClassName + "j-end" : CardTopClassName;
    return (
        <div className={CN}>
            {children}
        </div>
    );
}

function CardFriends({friends}) {
    if(friends > 0) return (
        <div className="friends-items d-flex flex-row align-items-center">
            <div className="friends-img">
                <img className="rounded-circle" src={ImgFirend1} alt="firend"/>
                    { friends > 1 &&
                        <img 
                            className="rounded-circle" 
                            src={ImgFirend2} 
                            alt="firend"
                            style={{transform: "translateX(-10px)"}}    
                        />
                    }
            </div>
            <div 
                className="px-1 d-flex flex-row align-items-center"  
                style={friends > 1 ? {transform: "translateX(-10px)"} : null}
            >
                <span className="fw-bold px-1">{friends}</span>
                <span className="fw-bold">{friends > 1 ? "friends":"friend"}</span>
            </div>
        </div>
    )
    return null;
}

function CardGenres({appGenres, genres}) {
    return (
        <div className="d-flex flex-row flex-wrap">
            {genres && genres.map((el, i) => {
                if (i > 1) return null;
                return (
                    <p key={el} className="card-genres px-1">
                        {appGenres[el]}
                    </p>
            )})}
        </div>
    );
}

function CardPopularity({popularity}) {
    if (popularity >= 5000) {
        return (
            <div className="bg-c-7 p-1 rounded">
                <p className="fw-bold">Trending 🔥</p>
            </div>
        )
    }
    return null;
}

//vote_count
function CardViews({views}) {
    return (
        <div className="d-flex flex-row align-items-center">
            <IconView/>
            <p className="fw-bold px-1">{views}</p>
        </div>
    );
}

function CardDescription({title, description}) {
    return (
        <div className="card-description z-index-3 bg-c-7 p-3 d-flex flex-column justify-content-center">
            <h6 className="video-title fs-md-5 fw-bold pb-2">{title}</h6>
            <div>
                <p>{description}</p>    
            </div>
        </div>
    )
}

/**
 * First Cart that shows in Home view
 */
function CardFull({cardState, style, size = "w500", imgStyle, appGenres}) {
    const TITLE = cardState.title ? cardState.title : cardState.name;

    return (
        <CardGen 
            cardState={cardState}
            style={style}
            imgStyle={imgStyle}
            size={size}
        >
            <h1 className="title z-index-3">
                {TITLE}
            </h1>
            <div className="card-bottom p-2 z-index-3">
                <button
                    className="d-flex flex-row align-items-center bg-c-orange rounded px-2 py-1"
                    type="button"
                >
                <PlayButton/>
                <span className="fw-bold c-1 px-2">Watch Now</span>
                </button>
            </div>
        </CardGen>
    );
}

/**
 * This card have:
 *  CardFriends
 *  CardPopularity
 *  LastView
 *  TimeView
 */ 
 function CardUserWatch ({cardState, style, size = "w500", imgStyle, appGenres}) {
    const TITLE = cardState.title ? cardState.title : cardState.name;
    const genres = cardState.genre_ids;
    const popularity = cardState.popularity;
    const friends = cardState.friends ?? 0; 
    const lastView = minutesToTme(cardState.lastView);
    const timeView = secToTimeString(cardState.timeView);
    const overview = cardState.overview;

    return (
        <CardGen cardState={cardState} style={style} size={size} imgStyle={imgStyle}>
            <CardDescription title={TITLE} description={overview} />
            <CardTop>
                <CardFriends friends={friends} />
                <CardPopularity popularity={popularity}/>
            </CardTop>
            <CardBottom 
                appGenres={appGenres} 
                genres={genres} 
                title={TITLE}
                childrenRight={() => (
                    <p className="px-1">{lastView}</p>
                )}
                childrenLeft={() => (
                    <div className="user-time rounded bg-c-white">
                       <p className="c-0 fw-bold px-2">{timeView}</p>
                    </div>
                )}
            />
        </CardGen>
    )
}

/**
 * This card have:
 *  CardFriends
 *  CardPopularity
 *  CardGendres
 *  Average
 */ 
function Card1 ({cardState, style, size = "w500", imgStyle, appGenres}) {
    const TITLE = cardState.title ? cardState.title : cardState.name;
    const genres = cardState.genre_ids;
    const popularity = cardState.popularity;
    const voteAverage = (cardState.vote_average).toFixed(1);
    const friends = cardState.friends ?? 0; 
    const overview = cardState.overview;

    return (
        <CardGen cardState={cardState} style={style} size={size} imgStyle={imgStyle}>
            <CardDescription title={TITLE} description={overview} />
            <CardTop>
                <CardFriends friends={friends} />
                <CardPopularity popularity={popularity}/>
            </CardTop>
            <CardBottom 
                appGenres={appGenres} 
                genres={genres} 
                title={TITLE}
                childrenRight={() => <CardGenres appGenres={appGenres} genres={genres}/>}
                childrenLeft={() => (
                    <>
                       <IconStart/>
                        <p className="px-1 fw-bold">{voteAverage}</p>
                    </>
                )}
            />
        </CardGen>
    )
}


/**
 * This card have:
 *  Views
 *  CardGendres
 *  Average
 */ 
 function Card2 ({cardState, style, size = "w500", imgStyle, appGenres}) {
    const TITLE = cardState.title ? cardState.title : cardState.name;
    const genres = cardState.genre_ids;
    const voteCount = cardState.vote_count;
    const voteAverage = (cardState.vote_average).toFixed(1);

    return (
        <CardGen cardState={cardState} style={style} size={size} imgStyle={imgStyle}>
            <CardTop end>
                <CardViews views={voteCount}/>
            </CardTop>
            <CardBottom 
                appGenres={appGenres} 
                genres={genres} 
                title={TITLE}
                childrenRight={() => <CardGenres appGenres={appGenres} genres={genres}/>}
                childrenLeft={() => (
                    <>
                       <IconStart/>
                        <p className="px-1 fw-bold">{voteAverage}</p>
                    </>
                )}
            />
        </CardGen>
    )
}



export {
    CardGen,
    CardBottom,
    CardTop,
    CardFriends,
    CardGenres,
    CardPopularity,
    CardFull,
    CardUserWatch,
    Card1,
    Card2,
}