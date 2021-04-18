import MainMenuView from './MainMenuView';
import CityView from './CityView';
import FieldView from './FieldView';
import BattleView from './BattleView';

const ViewContainer = (props) => {

    const viewComponents = {
        MainMenuView: MainMenuView,
        CityView: CityView,
        FieldView: FieldView,
        BattleView: BattleView
    };

    const ViewLayout = viewComponents[props.ViewLayout];

    return (
        <div className="view-container">
            <ViewLayout />
        </div>
    );
}
 
export default ViewContainer;