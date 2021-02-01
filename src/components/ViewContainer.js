import MainMenuView from './MainMenuView';
import CityView from './CityView';

const ViewContainer = (props) => {

    const viewComponents = {
        MainMenuView: MainMenuView,
        CityView: CityView
    };

    const ViewLayout = viewComponents[props.ViewLayout];

    return (
        <div className="view-container">
            <ViewLayout />
        </div>
    );
}
 
export default ViewContainer;