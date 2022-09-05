import { useState, useEffect } from "react";

/**
 * @param {string} media the string must be a media query css  
 * @returns {boolean}
 */
export function useMatchMedia(media) {
    const _MM = window.matchMedia(media);
    const [value, setValue] = useState(_MM.matches);
    useEffect(() => {
        const MM = window.matchMedia(media);
        MM.onchange = (e) => setValue(() => e.matches);
        return () => MM.onchange = null;
    }, [media]);
    return value;
}