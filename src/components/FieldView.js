import { useLocation } from 'react-router-dom';
import { Dungeon } from '../models/Dungeon.js';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Portrait from './Portrait';

const FieldView = () => {

    const location = useLocation();
    const party = location.state.party;
    const dungeon = new Dungeon("DankCave");
    const [currentTile, setCurrentTile] = useState(0);
    const [eventText, setEventText] = useState("At the dungeon entrance");
    const [eventCommands, setEventCommands] = useState([]);
    const history = useHistory();

    const moveTile = e => {

        setCurrentTile(currentTile + 1);
        let eventType = dungeon.tileList[currentTile].type;

        if(eventType === "Combat" || eventType === "Boss"){
            let enemiesList = "";
            let comma = "";
            dungeon.tileList[currentTile].enemies.forEach(enemyName => {
                if(enemyName !== "None"){
                    enemiesList += comma + enemyName;
                    comma = ", ";
                }
            });
            setEventText(`
                ${dungeon.tileList[currentTile].type} Encounter with
                ${enemiesList}
            `);
            setEventCommands([{
                func: beginCombat,
                btnClass: "btn btn-info mb-2 btn-danger",
                btnText: "Engage"
            }]);
        }
        else if(eventType === "Event"){

        }
    };

    const beginCombat = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/battleview',
            state: {
                party: party,
                enemies: dungeon.tileList[currentTile].enemies,
                currentTile: currentTile
            }
        });
    };

    return ( 
        <div className="d-flex flex-column max-height">
            <div className="d-flex justify-content-center align-items-center flex-1">
                You are in: {dungeon.name}
                <br/>
                Current Tile: {currentTile}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                <button type="button" onClick={moveTile} className="btn btn-info mb-2 menu-button bottom-button">Continue</button>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                {eventText}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                {eventCommands.map(eventCommand => (
                    <button type="button" onClick={eventCommand.func} className={eventCommand.btnClass}>{eventCommand.btnText}</button>
                ))}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                {party.map((partymember, i) => (
                    <div key={i} className="d-flex">
                        <Portrait location={partymember.RPGClass.name.toLowerCase()} filename={`20${partymember.RPGClass.name.toLowerCase()}`}/>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                Bottom Bar
            </div>
        </div>
    );
}
 
export default FieldView;