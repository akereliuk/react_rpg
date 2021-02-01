import LinkPanelList from './LinkPanelList';
import Title from './Title';
import useFetch from '../hooks/useFetch';

const MainMenuView = () => {

    const { error, isPending, data: campaigns } = useFetch('data/campaigns.json');
    
    return (
        <div class="d-flex flex-column max-height">
            <div className="d-flex justify-content-center align-items-center flex-1">
                <div className="card menu-card pb-3">
                    <div className="card-body">
                        <Title text="WGRPG" />
                        <LinkPanelList links={[
                                {
                                    text: (!campaigns || !campaigns.length ? "New Game" : "Continue"),
                                    page: (!campaigns || !campaigns.length ? "test" : "test")
                                },
                                ... (campaigns && campaigns.length ? {
                                    text: "Load Game",
                                    page: "test"
                                } : []),
                                {
                                    text: "Options",
                                    page: "test"
                                },
                                {
                                    text: "Exit",
                                    page: "test"
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default MainMenuView;