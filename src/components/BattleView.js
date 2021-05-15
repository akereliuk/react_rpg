import { useLocation } from 'react-router-dom';
import { Enemy } from '../models/Enemy.js';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Portrait from './Portrait';
import CombatHelper from '../helpers/CombatHelper';
import Skill from '../models/Skill.js';
import { Player } from '../models/Player.js';

const BattleView = () => {

    const location = useLocation();
    const [party, setParty] = useState(location.state.party);
    const [enemies, setEnemies] = useState(() => {

        // Lazy initialization of enemies
        const enemy_names = location.state.enemies;
        let new_enemies = [];
        let position = 1;
        enemy_names.forEach(name => {
            new_enemies.push(new Enemy(name, position));
            position++;
        });

        return new_enemies;
    });
    const [round, setRound] = useState(1);
    const [roundOrder, setRoundOrder] = useState([{name: "name"}]);
    const [battleLog, setBattleLog] = useState([]);
    const currentTile = location.state.currentTile;
    const [battleState, setBattleState] = useState("In Progress");
    const [bottomBar, setBottomBar] = useState([]);
    // State can be In Progress, Won, or Lost

    useEffect(() => {
        let roundOrder = CombatHelper.calculateRoundOrder(party, enemies);
        setRoundOrder(roundOrder);
        setBottomBar(roundOrder[0].constructor.name === "Enemy" ? roundOrder[0].skills : roundOrder[0].RPGClass.skills);
    }, []);

    const attackEnemy = (skill, positions) => {

        let player = roundOrder[0];

        // Grab enemies from positions passed in
        let attackedEnemies = enemies.filter(enemy => {
            return positions.includes(enemy.position)
        });

        // Use skill on all enemies found in positions
        attackedEnemies.forEach((enemy, index) => {
            let newLog = battleLog;
            let newLogStr = "";
            [player, attackedEnemies[index], newLogStr] = skill.useOnEnemy(player, enemy);
            newLog.push(newLogStr);
            setBattleLog(newLog);
        });

        setEnemies(enemies.map((enemy, index) => {
            return positions.includes(enemy.position) ? attackedEnemies[index] : enemy
        }));
        determineOrder();
    };

    const playerTurn = () => {

        let partymember = roundOrder[0];
        let player = new Player(partymember.name, partymember.RPGClass.name, partymember, partymember.position);
        setBottomBar(player.RPGClass.skills);

        // Tick status effects
        let newParty = party;
        let [logArr, type] = player.tickStatusEffects();

        let newLog = battleLog;
        logArr.forEach((log) => {
            newLog.push(log);
        });
        setBattleLog(newLog);

        newParty.map(obj => obj.position === player.position ? player : obj);
        setParty(newParty);

        // If effected by a status effect that skips a turn
        if(type === "SkipTurn"){
            determineOrder();
            return;
        }
    };

    const playerSkillPressed = (skill) => {

        let objSkill = new Skill(skill.action);

        objSkill.enemyTargets.length > 0 && objSkill.enemyTargets.forEach((target_pos) => {
            let enemy_div = document.querySelector(`#enemy${target_pos}`);
            enemy_div.classList.add("selectable");
            enemy_div.addEventListener("click", (() => playerTargetPressed(enemy_div, objSkill, objSkill.enemyAOE ? objSkill.enemyTargets : [target_pos])));
        });
    };

    const playerTargetPressed = (div, skill, pos) => {
        div.removeEventListener("click", playerTargetPressed);
        div.classList.remove("selectable");
        attackEnemy(skill, pos);
    };

    const enemyTurn = () => {

        let enemy = roundOrder[0];
        let objSkill = new Skill(enemy.skills[0]);
        let randomPos = [];

        // Tick status effects
        let newEnemies = enemies;
        let [logArr, type] = enemy.tickStatusEffects();
        let newLog = battleLog;
        logArr.forEach((log) => {
            newLog.push(log);
        });
        setBattleLog(newLog);

        newEnemies.map(obj => obj.position === enemy.position ? enemy : obj);
        setEnemies(newEnemies);

        // If effected by a status effect that skips a turn
        if(type === "SkipTurn"){
            determineOrder();
            return;
        }

        // Determine potential party targets from skill
        let targetPos = objSkill.enemyTargets;

        // Remove dead party members so they cannot be attacked
        targetPos.forEach((pos, index) => {
            let foundParty = party.find(partymember => partymember.position === pos);
            if(!foundParty.isAlive){
                targetPos.splice(index, 1);
            }
        });

        // If no targets left alive in attackable positions, skip turn
        if(targetPos.length === 0){
            determineOrder();
            return;
        }

        // Choose a random target from those left alive
        randomPos = [targetPos[Math.floor(Math.random() * targetPos.length)]];

        let attackedParty = [];
        
        // Use skill on all targets
        party.forEach((partymember, index) => {
            if(randomPos.includes(partymember.position)){
                let newLog = battleLog;
                let newLogStr = "";
                let newPartyMember = new Player(partymember.name, partymember.RPGClass.name, partymember, partymember.position);
                [enemy, attackedParty[index], newLogStr] = objSkill.useOnEnemy(enemy, newPartyMember);
                newLog.push(newLogStr);
                setBattleLog(newLog);
            }
        });

        let newParty = party.map((partymember, index) => {
            return randomPos.includes(partymember.position) ? attackedParty[index] : partymember
        });

        setParty(newParty);
        determineOrder();
    };

    const determineOrder = () => {

        // Check if battle lost
        if(battleState === "In Progress"){

            let battleLost = true;
            for(let i=0; i<party.length; i++){
                if(party[i].isAlive){
                    battleLost = false;
                    break;
                }
            }

            if(battleLost){
                setBattleState("Lost");
            }
        }

        // Check if battle won
        if(battleState === "In Progress"){
            let battleWon = true;
            for(let i=0; i<enemies.length; i++){
                if(enemies[i].isAlive){
                    battleWon = false;
                    break;
                }
            }

            if(battleWon){
                setBattleState("Won");
            }
        }

        // Determine new round order by comparing all participant's speed values
        let newRoundOrder = roundOrder;
        newRoundOrder.shift();
        if(newRoundOrder.length === 0){
            newRoundOrder = CombatHelper.calculateRoundOrder(party, enemies);
            setRound(round+1);
        }
        else{
            newRoundOrder = CombatHelper.resortRoundOrder(newRoundOrder);
        }
        
        setRoundOrder(newRoundOrder);

        if(newRoundOrder[0].constructor.name === "Enemy"){
            enemyTurn();
        }
        else{
            playerTurn();
        }
    };

    return (
        <div className="d-flex flex-column max-height">
            <div className="d-flex justify-content-center align-items-center flex-1">
                Round {round} - {roundOrder[0].name}'s turn
            </div>
            <div className="d-flex justify-content-center flex-1">
                <div className="d-flex vert-scroller align-items-start">
                    {battleLog.map(logEntry => {
                        return (<div>{logEntry}</div>)
                    })}
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-1">
                <div className="d-flex">
                    {party && party.map((partymember, index) => {
                        return partymember.isAlive ?
                        (
                        <div className="d-flex flex-column m-3" id={`party${4 - index+1}`}>
                            <div className="d-flex">
                                Damage Numbers
                            </div>
                            <div className="d-flex">
                                HP: {partymember.current_hp} / {partymember.combat_stats.primary.max_hp}
                            </div>
                            <div className="d-flex">
                                Fatigue: {partymember.fatigue} / {partymember.combat_stats.primary.max_fatigue}
                            </div>
                            <div className="d-flex">
                                Fullness: {partymember.fullness} / {partymember.combat_stats.primary.max_fullness}
                            </div>
                            <div className="d-flex">
                                <Portrait location={partymember.RPGClass.name.toLowerCase()} filename={`20${partymember.RPGClass.name.toLowerCase()}`}/>
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className="d-flex flex-column m-3">
                            None
                        </div>
                        )  
                    })}
                </div>
                <div className="d-flex">
                    {enemies && enemies.map((enemy, index) => {
                        return enemy.isAlive && enemy.name !== "None" ? 
                        (
                        <div className="d-flex flex-column m-3" id={`enemy${index+1}`}>
                            <div className="d-flex">
                                Damage Numbers
                            </div>
                            <div className="d-flex">
                                HP: {enemy.current_hp} / {enemy.combat_stats.primary.max_hp}
                            </div>
                            <div className="d-flex">
                                Fatigue: {enemy.fatigue} / {enemy.combat_stats.primary.max_fatigue}
                            </div>
                            <div className="d-flex">
                                Fullness: {enemy.fatigue} / {enemy.combat_stats.primary.max_fatigue}
                            </div>
                            <div className="d-flex">
                                Enemy Portrait
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className="d-flex flex-column m-3">
                            None
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                {bottomBar && bottomBar.map(action => {
                    return (
                        <button type="button" onClick={() => playerSkillPressed({action})} className="btn btn-info mb-2 menu-button bottom-button">
                            {action}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
 
export default BattleView;