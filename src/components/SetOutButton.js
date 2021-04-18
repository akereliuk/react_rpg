import { useHistory } from "react-router-dom";

const SetOutButton = (props) => {

    const history = useHistory();

    function moveToField(e){
        e.preventDefault();
        history.push({
            pathname: '/fieldview',
            state: {
                party: props.party
            }
        });
    }

    return ( 
        <button type="button" onClick={moveToField} className="btn btn-info mb-2 menu-button bottom-button">
            Set Out
        </button>
    );
}
 
export default SetOutButton;