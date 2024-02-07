export default function Button({ children, textOnly, className, ...props }) {
    let cssClasses = textOnly ? "text-button" : "button";
    cssClasses = className ? `${cssClasses} ${className}` : cssClasses;

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}
