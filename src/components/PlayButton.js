import { IconPlay } from "../icons/index.js"

import "./PlayButton.scss";

export function PlayButton({style}) {
    return (
        <button 
            style={style ? style : null}
            className="play-button rounded-circle bg-c-5 d-flex align-items-center justify-content-center"
            type="button"    
        >
            <IconPlay/>
        </button>
    );
}