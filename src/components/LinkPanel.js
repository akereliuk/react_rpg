const LinkPanel = (link) => {
    return (
        <div onClick={link.runFunc}>
            <div>
                {link.text}
            </div>
        </div>
    );
}
 
export default LinkPanel;