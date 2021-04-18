import { useLocation } from 'react-router-dom';
import { Enemy } from '../models/Enemy.js';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Portrait from './Portrait';
import CombatHelper from '../helpers/CombatHelper';

const BattleView = () => {

    const location = useLocation();
    const [party, setParty] = useState(location.state.party);
    const enemy_names = location.state.enemies;
    let new_enemies = [];
    let position = 1;
    enemy_names.forEach(name => {
        new_enemies.push(new Enemy(name, position));
        position++;
    });
    const [enemies, setEnemies] = useState(new_enemies);
    const [round, setRound] = useState(1);
    const [roundOrder, setRoundOrder] = useState([{name: "name"}]);
    const currentTile = location.state.currentTile;

    useEffect(() => {
        setRoundOrder(CombatHelper.calculateRoundOrder(party, enemies)); 
    }, []);

    const attackEnemy = (position) => {

        let attackedEnemy = enemies.filter(enemy => {
            return enemy.position === position
        });
        attackedEnemy[0].takeDamage(5);
        setEnemies(enemies.map(enemy => {
            return enemy.position === position ? attackedEnemy[0] : enemy
        }));

        let newRoundOrder = roundOrder;
        newRoundOrder.shift();
        if(newRoundOrder.length === 0){
            newRoundOrder = CombatHelper.calculateRoundOrder(party, enemies);
        }
        else{
            newRoundOrder = CombatHelper.resortRoundOrder(newRoundOrder);
        }
        setRoundOrder(newRoundOrder);
    };

    return (
        <div className="d-flex flex-column max-height">
            <div className="d-flex justify-content-center align-items-center flex-1">
                Round {round} - {roundOrder[0].name}'s turn
            </div>
            <div className="d-flex justify-content-center align-items-center flex-1">
                Battle Log
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
                <button type="button" onClick={() => attackEnemy(1)} className="btn btn-info mb-2 menu-button bottom-button">
                    Attack
                </button>
            </div>
        </div>
    );
}
 
export default BattleView;