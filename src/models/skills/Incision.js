import CombatHelper from '../../helpers/CombatHelper';

export default class Incision{

    constructor(){
        this.name = "Incision";
        this.description = "A deep cut that bleeds your foes.";
        this.usePosition = [1,2];
        this.partyTargets = [];
        this.partyAOE = false;
        this.enemyTargets = [1,2];
        this.enemyAOE = false;
        this.dmgMod = 1;
        this.accMod = 1;
        this.SEMod = 1;
        this.element = "none";
    }

    useOnParty(player, party){

        if(this.partyTargets.length){

        }

        return [player, party];

    }

    useOnEnemy(player, enemy){

        if(this.enemyTargets.length){
            calcHit = CombatHelper.calculateHit(player, enemy);
            calcCrit = CombatHelper.calculateCrit(player, enemy);

            if(calcHit){
                calcDamage = CombatHelper.calculateDamage(player, enemy, calcCrit, dmgMod, element);
                calcStatus = CombatHelper.calculateStatus(player, enemy, SEMod);

                enemy.takeDamage(calcDamage);
                
                if(calcStatus){
                    enemy.addStatusEffect("Bleed", (1 * player.level), 2);
                }
            }
        }

        return [player, enemy];
    }
}