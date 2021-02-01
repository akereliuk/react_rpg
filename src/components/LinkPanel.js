import { Link } from 'react-router-dom';

const LinkPanel = (link) => {

    return (
        <Link to={link.page}>
            <div>
                {link.text}
            </div>
        </Link>
    );
}
 
export default LinkPanel;