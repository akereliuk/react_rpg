import LinkPanelList from './LinkPanelList';
import Title from './Title';
import { useGameConfigs } from "../context/GameConfigs";
import useFetch from '../hooks/useFetch';
import { useCampaignManager } from "../context/CampaignManager";
import { useHistory } from "react-router-dom";

const MainMenuView = () => {

    const GameTitle = useGameConfigs().GameTitle;
    const { error, isPending, data: campaigns } = useFetch('data/campaigns.json');
    const CampaignManager = useCampaignManager();
    const history = useHistory();

    return (
        <div className="d-flex flex-column max-height">
            <div className="d-flex justify-content-center align-items-center flex-1">
                <div className="card menu-card pb-3">
                    <div className="card-body">
                        <Title text={GameTitle} />
                        { error && <div>{  }</div> }
                        { isPending && <div>Loading...</div> }
                        { !isPending && <LinkPanelList links={[
                                ...(campaigns !== null ? [{
                                    text: "Continue",
                                    runFunc: function(){
                                        var RecentCampaign = campaigns.campaigns.reduce((a, b) => (a.updated > b.updated ? a : b));
                                        CampaignManager.LoadCurrentCampaign(RecentCampaign);
                                        history.push("/cityview");
                                    }
                                }] : []),
                                {
                                    text: "New Game",
                                    runFunc: function(){
                                        var newCampaign = CampaignManager.NewCampaign();
                                        CampaignManager.LoadCurrentCampaign(newCampaign);
                                    }
                                },
                                ...(campaigns !== null ? [{
                                    text: "Load Game",
                                }] : []),
                                {
                                    text: "Options",
                                },
                                {
                                    text: "Exit",
                                    runFunc: function(){
                                        const electron = window.require("electron");
                                        electron.ipcRenderer.send("manual-close");
                                    }
                                },
                            ]}
                        />}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default MainMenuView;