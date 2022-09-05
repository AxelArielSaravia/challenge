import "./AccessButton.scss";
export function AccessButton({text, onClick}) {
    return (
        <button 
            className="button-access c-2" 
            type="button"
            onClick={onClick}
        >
            <span className="c-2">{text}</span>
        </button>
    )
}