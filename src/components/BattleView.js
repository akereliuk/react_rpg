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

    useEffect(() => {
        setRoundOrder(CombatHelper.calculateRoundOrder(party, enemies));
    }, []);

    const attackEnemy = (player_pos, positions) => {

        let objSkill = new Skill("Incision");
        let player = roundOrder[0];

        let attackedEnemies = enemies.filter(enemy => {
            return positions.includes(enemy.position)
        });

        attackedEnemies.forEach((enemy, index) => {
            let newLog = battleLog;
            let newLogStr = "";
            [player, attackedEnemies[index], newLogStr] = objSkill.useOnEnemy(player, enemy);
            newLog.push(newLogStr);
            setBattleLog(newLog);
        });

        setEnemies(enemies.map((enemy, index) => {
            return positions.includes(enemy.position) ? attackedEnemies[index] : enemy
        }));

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
    };

    const enemyTurn = () => {

        let enemy = roundOrder[0];
        let objSkill = new Skill(enemy.skills[0]);
        let randomPos = [];

        if(objSkill.enemyAOE){

        }
        else{
            let targetPos = objSkill.enemyTargets;
            randomPos = [targetPos[Math.floor(Math.random() * targetPos.length)]];
        }

        let attackedParty = [];
        
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
                    {party.map(partymember => {
                        return partymember.isAlive ?
                        (
                        <div className="d-flex flex-column m-3">
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
                    {enemies.map(enemy => {
                        return enemy.isAlive && enemy.name !== "None" ? 
                        (
                        <div className="d-flex flex-column m-3">
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
                <button type="button" onClick={() => attackEnemy(1, [1])} className="btn btn-info mb-2 menu-button bottom-button">
                    Attack
                </button>
            </div>
        </div>
    );
}
 
export default BattleView;