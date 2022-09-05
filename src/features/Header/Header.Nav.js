import { useState } from "react";

import { IconList, IconX, IconSearch, Logo, IconNavSelect } from "../../icons/index.js";

import Img from "../../images/user-image.png";

import "./Header.scss";


function MobileNavItem({text, isFocus, onClick}) {
    return (
        <button 
            className={
                isFocus
                ? "nav-item select c-1 px-4 py-3 fs-5 d-flex align-items-start"
                : "nav-item c-1 px-4 py-3 d-flex fs-5 align-items-start"
            }
            onClick={onClick}
        >
            {text}
        </button>
    );
}

function DesktopNavItem({text, isFocus, onClick}) {
    return (
        <div className=" d-flex flex-column">
            <button
                className={
                    isFocus
                    ? "nav-item select c-1 px-4 fs-6 v-space-4"
                    : "nav-item c-1 px-4 fs-6 v-space-4"
                }
                onClick={onClick}
            >
                {text}
            </button>
            <div className="v-space-2 d-flex align-items-end justify-content-center">
                <IconNavSelect 
                    className={
                        isFocus
                        ? "icon-nav-select select" 
                        : "icon-nav-select"
                    }
                />
            </div>
        </div>
    );
}

function MobileNav({toMoviesHome, toTvShowsHome, search, appSection}) {
    const [inputText, setInputText]  = useState("");
    const [focus, setFocus] = useState(appSection);
    const [open, setOpen] = useState(false);
    
    const onClickMovies = () => {
        setFocus(() => "movie");
        toMoviesHome();
        setOpen(() => false);
    }

    const onClickTvShows = () => {
        setFocus(() => "tvShow");
        toTvShowsHome();
        setOpen(() => false);
    }

    const onChange = (e) => setInputText(() => e.target.value);
    const onClickSearch = () => {
        if (inputText.length > 0) {
            search(inputText);
            setInputText(() => "");
            setOpen(() => false);
        }
    }
    return (
         <>
            <div className="container-fluid">
                <a className="navbar-brand" href="./"><Logo/></a>
                <div className="nav-features d-flex flex-row">
                    <button 
                        className="d-flex flex-row align-items-center px-2"  
                        type="button" 
                        onClick={() => setOpen(state => !state)}
                    >   
                        {open 
                            ? <IconX/>
                            : <IconList/>
                        }
                    </button>
                    <button
                        className="d-flex flex-row align-items-center px-2" 
                        type="button"
                    >
                        <img src={Img} alt="User"/>
                    </button>
                </div>
            </div>
            <div className="h-line"></div>
            <div className="search visually-hidden">
                <div>
                    <input type="text"/>
                </div>
            </div>
            <div className={open ? "navbar-collapse z-index-4" : "collapse navbar-collapse z-index-4"}>
                <div className="bg-c-1">
                    <div className="d-flex align-items-center justify-content-center p-4">
                        <input 
                            type="text"
                            value={inputText}
                            onChange={onChange}
                        />
                        <button
                            className="d-flex flex-row align-center px-2" 
                            type="button"
                            onClick={onClickSearch}
                        >
                            <IconSearch/>
                        </button>
                    </div>
                    <div className="h-line"></div>
                    <MobileNavItem text="Movies" isFocus={focus === "movie"} onClick={onClickMovies}/>
                    <MobileNavItem text="Tv Shows" isFocus={focus === "tvShow"} onClick={onClickTvShows}/>
                    <div className="h-line"></div>
                </div>
            </div>
        </>
    );
}

function DesktopNav({toMoviesHome, toTvShowsHome, search, appSection}) {
    const [inputText, setInputText]  = useState("");
    const [focus, setFocus] = useState(appSection);
    const onClickMovies = () => {
        setFocus(() => "movie");
        toMoviesHome();
    }
    const onClickTvShows = () => {
        setFocus(() => "tvShow");
        toTvShowsHome();
    };
    const onClickSearch = () => {
        if (inputText.length > 0) {
            search(inputText);
            setInputText(() => "");
        }
    }
    const onChange = (e) => setInputText(() => e.target.value);

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex flex-row align-items-center">
                    <div className="d-flex flex-column">
                        <a className="navbar-brand me-5 v-space-4" href="./">
                            <Logo/>
                        </a>
                        <div className="v-space-2"/>
                    </div>
                    <div className="d-flex flex-row">
                        <DesktopNavItem text="Movies" isFocus={focus === "movie"} onClick={onClickMovies}/>
                        <DesktopNavItem text="Tv Show" isFocus={focus === "tvShow"} onClick={onClickTvShows}/>
                    </div>
                </div>
              
                <div className="nav-features d-flex flex-column">
                    <div className="d-flex flex-row v-space-4">
                        <div className="d-flex align-items-center">
                            <input 
                                type="text"
                                value={inputText}
                                onChange={onChange}
                            />
                            <button
                                className="d-flex flex-row align-center px-2" 
                                type="button"
                                onClick={onClickSearch}
                            >
                                <IconSearch/>
                            </button>
                        </div>
                        <button
                            className="d-flex flex-row align-items-center px-2" 
                            type="button"
                        >
                            <img src={Img} alt="User"/>
                        </button>
                    </div>
                    <div className="v-space-2"></div>
                </div>
            </div>
            <div className="h-line"></div>
        </>
    );
}

export {
    DesktopNav,
    MobileNav
}