import CombatHelper from '../../helpers/CombatHelper';

export default class BaseSkill{

    constructor(){
        
    }

    useOnParty(player, party, log){

        if(this.partyTargets.length){

        }

        return [player, party, log];

    }

    useOnEnemy(player, enemy){

        let log = "";

        if(this.enemyTargets.length){
            let calcHit = CombatHelper.calculateHit(player, enemy);
            let calcCrit = CombatHelper.calculateCrit(player, enemy);

            if(calcHit){
                let [calcDamage, didCrit] = CombatHelper.calculateDamage(player, enemy, calcCrit, this.dmgMod, this.element);
                let calcStatus = CombatHelper.calculateStatus(player, enemy, this.SEMod);
                
                enemy.takeDamage(calcDamage);
                
                if(calcStatus){
                    enemy.addStatusEffect("Bleed", (1 * player.level), 2);
                    log = `${player.name} used ${this.name} on ${enemy.name} for ${calcDamage} and applied Bleed.`;
                }
                else{
                    log = `${player.name} used ${this.name} on ${enemy.name} for ${calcDamage}.`;
                }
            }
            else{
                log = `${player.name} used ${this.name} and missed ${enemy.name}.`;
            }
        }

        return [player, enemy, log];
    }
}