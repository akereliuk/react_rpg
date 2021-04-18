export default class CombatHelper {

    static calculateRoundOrder(party, enemies){
        let merged = [...party, ...enemies];
        merged = merged.filter(o => o.name !== "None");
        merged.sort((a, b) => parseInt(a.combat_stats.direct.speed) - parseInt(b.combat_stats.direct.speed)).reverse();
        return merged;
    }

    static resortRoundOrder(order){
        order.sort((a, b) => parseInt(a.combat_stats.direct.speed) - parseInt(b.combat_stats.direct.speed)).reverse();
        return order;
    }

    static calculateHit(player, enemy){
        let finalAcc = player.combat_stats.direct.accuracy - enemy.combat_stats.direct.dodge;
        let roll = this.rollD100();

        if(roll <= finalAcc){
            return true;
        }
        else{
            return false;
        }
    }

    static calculateCrit(player, enemy){
        let finalCrit = player.combat_stats.direct.crit_rate;
        let roll = this.rollD100();

        if(roll <= finalCrit){
            return true;
        }
        else{
            return false;
        }
    }

    static calculateDamage(player, enemy, didCrit, dmgMod, element){

        let damageType;

        if(player.equips.weapon === "none"){
            damageType = "melee";
        }
        else{
            let weaponName = player.equips.weapon;
            const weaponObj = require('../models/equips/'+weaponName);
            damageType = weaponObj.type;
        }

        let min_damage = player.combat_stats.direct[damageType].min_damage;
        let max_damage = player.combat_stats.direct[damageType].max_damage;

        let roll = this.getRandomInRange(min_damage, max_damage);
        let moddedDmg = dmgMod * roll;

        let elementMod = this.calculateElementalMod(element, enemy);
        let eleModdedDmg = moddedDmg * elementMod;

        let critModdedDmg;
        if(didCrit){
            critModdedDmg = eleModdedDmg * (1 + (player.combat_stats.direct.crit_damage / 100));
        }
        else{
            critModdedDmg = eleModdedDmg;
        }

        let protModdedDmg = critModdedDmg * (1 + (enemy.combat_stats.direct.protection / 100));

        return protModdedDmg;
    }

    static calculateStatus(player, enemy, statusMod){
        let finalStatus = player.combat_stats.direct.status_rate - enemy.combat_stats.direct.status_resist;
        let roll = this.rollD100();

        if(roll <= finalStatus){
            return true;
        }
        else{
            return false;
        }
    }

    calculateElementalMod(element, enemy){
        if(element === enemy.element_weakness){
            return 1.5;
        }
        else if(element === enemy.element_strenth){
            return 0.5;
        }
        else{
            return 1;
        }
    }

    rollD100(){
        return Math.floor(Math.random() * 101);
    }

    getRandomInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}