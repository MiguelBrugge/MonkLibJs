export function CustomButton({ className, text, id }) {
    return(
        <button id={ id } className={`bg-black-active text-white px-6 py-1 rounded ${className}`}>{ text }</button>
    );
}