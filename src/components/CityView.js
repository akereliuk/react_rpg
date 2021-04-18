import SideBar from './SideBar';
import InfoPane from './InfoPane';
import SetOutButton from './SetOutButton';
import { Player } from '../models/Player.js';
import { useCampaignManager } from "../context/CampaignManager";
import Portrait from './Portrait';

const CityView = () => {

    const CampaignManager = useCampaignManager();
    const squad = CampaignManager.getCurrentCampaign()['squad'];
    const party = [
                    new Player(squad[0].name, squad[0].class, squad[0], 4),
                    new Player(squad[1].name, squad[1].class, squad[1], 3),
                    new Player(squad[2].name, squad[2].class, squad[2], 2),
                    new Player(squad[3].name, squad[3].class, squad[3], 1)
                ];

    return (
        <div className="d-flex flex-row justify-content-between h-100vh">
            <SideBar border_direction="right">
                <div>Test</div>
            </SideBar>
            <div className="d-flex flex-column justify-content-between align-items-center pb-5">
                <InfoPane title="City View" content="Testing city view paragraph tag. Text goes here."/>
                <SetOutButton party={party}/>
            </div>
            <SideBar border_direction="left">
                {squad.map(squadmember => (
                    <div className="d-flex flex-row align-items-center">
                        <div>
                            <Portrait location={squadmember.class.toLowerCase()} filename={`20${squadmember.class.toLowerCase()}`}/>
                        </div>
                        <div>
                            {squadmember.name} - {squadmember.class}
                        </div>
                    </div>
                ))}
            </SideBar>
        </div>
    );
}
 
export default CityView;