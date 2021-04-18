import React, { useContext, useState } from "react";

const CampaignManagerContext = React.createContext();
const CurrentCampaignContext = React.createContext();

export function useCampaignManager(){
    return useContext(CampaignManagerContext);
}

export function CampaignManagerProvider({ children }){

    const [CurrentCampaign, setCurrentCampaign] = useState({
        "title": "",
        "id": 0,
        "created": new Date().toISOString(),
        "updated": new Date().toISOString()
    });

    const CampaignManager = {

        getCurrentCampaign: function(){
            return CurrentCampaign;
        },

        LoadCurrentCampaign: function(campaign){
            setCurrentCampaign(campaign);
        },

        SaveCurrentCampaign: function(){

        },

        DeleteCampaign: function(id){

        },

        NewCampaign: function(){

            var fs = window.require('fs');

            var campaigns = JSON.parse(fs.readFileSync('./public/data/campaigns.json', 'utf8'));
            var campaignsSize = campaigns.campaigns.length;

            var DefaultCity = JSON.parse(fs.readFileSync('./public/data/templates/City.json', 'utf8'));
            var DefaultResources = JSON.parse(fs.readFileSync('./public/data/templates/Resources.json', 'utf8'));
            var DefaultDungeons = JSON.parse(fs.readFileSync('./public/data/templates/Dungeons.json', 'utf8'));
            var DefaultSquadMember = JSON.parse(fs.readFileSync('./public/data/templates/SquadMember.json', 'utf8'));

            var DefaultArcher = JSON.parse(JSON.stringify(DefaultSquadMember));
            DefaultArcher.name = "Annest";
            DefaultArcher.class = "Archer";

            var DefaultCleric = JSON.parse(JSON.stringify(DefaultSquadMember));
            DefaultCleric.name = "Fiora";
            DefaultCleric.class = "Cleric";

            var DefaultRogue = JSON.parse(JSON.stringify(DefaultSquadMember));
            DefaultRogue.name = "Luned";
            DefaultRogue.class = "Rogue";

            var DefaultWarrior = JSON.parse(JSON.stringify(DefaultSquadMember));
            DefaultWarrior.name = "Eira";
            DefaultWarrior.class = "Warrior";
            DefaultWarrior.current_hp = "24";

            var campaign = {
                "title": "Testing New Function",
                "id": (campaignsSize + 1),
                "created": new Date().toISOString(),
                "updated": new Date().toISOString(),
                "resources": DefaultResources,
                "city": DefaultCity,
                "squad": [
                    DefaultArcher,
                    DefaultRogue,
                    DefaultCleric,
                    DefaultWarrior
                ],
                "inventory": {

                },
                "checkpoints": [],
                "dungeons": DefaultDungeons
            };

            campaigns.campaigns.push(campaign);

            fs.writeFileSync("./public/data/campaigns.json", JSON.stringify(campaigns, null, 4));
            return campaign;
        }
    };

    return (
        <CampaignManagerContext.Provider value={CampaignManager}>
            <CurrentCampaignContext.Provider value={CurrentCampaign}>
                { children }
            </CurrentCampaignContext.Provider>
        </CampaignManagerContext.Provider>
    )
}