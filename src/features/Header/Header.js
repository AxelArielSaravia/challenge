
import { memo } from "react";
import { MobileNav, DesktopNav } from "./Header.Nav.js";

import "./Header.scss";

const Header = memo(function Header({goHome, isMinWidth768, search, appState}) {
    const appSection = appState.section;
    const toMoviesHome = () => {
        if (appState.section !== "movie" || appState.type !== "home" || appState.showAllUserSection || appState.showPopularSection)
            goHome("movie");
    }

    const toTvShowsHome = () => {
        if (appState.section !== "tvShow" || appState.type !== "home" || appState.showAllUserSection || appState.showPopularSection)
            goHome("tvShow");
    }

    return (
        <header className="header bg-c-1">
            <nav className="navbar">
            { isMinWidth768 ? (
                <DesktopNav 
                    appSection={appSection}    
                    toMoviesHome={toMoviesHome} 
                    toTvShowsHome={toTvShowsHome} 
                    search={search}
                /> 
            ) : (   
                <MobileNav 
                    appSection={appSection}    
                    toMoviesHome={toMoviesHome} 
                    toTvShowsHome={toTvShowsHome} 
                    search={search}
                />
            )}    
            </nav>
        </header>
    )
});

export default Header;