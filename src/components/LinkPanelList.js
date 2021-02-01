import LinkPanel from './LinkPanel';

const LinkPanelList = ({ links }) => {

    return (
        <div className="d-flex flex-column justify-content-center align-items-center link-panel-list">
        {links.map(link => (
            <button type="button" className="btn btn-info mb-2 menu-button">
                <LinkPanel page={link.page} text={link.text} />
            </button>
        ))}
        </div>
    );
}
 
export default LinkPanelList;