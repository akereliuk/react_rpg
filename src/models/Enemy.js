import JSONHelper from '../helpers/JSONHelper';
import { Entity } from '../models/Entity.js';

export class Enemy extends Entity{

    constructor(name, position){

        name = name.replace(/\s/g, '');
        
        if(name !== "None"){
            const jsH = new JSONHelper();
            const RPGEnemy = jsH.readGeneric(name, "enemies");

            let combat_stats = RPGEnemy.base_stats;

            super(name, null, combat_stats, RPGEnemy.element_strength, RPGEnemy.element_weakness, null, position, true, RPGEnemy.equips);
            this.attackable = true;
            this.skills = RPGEnemy.skills;
        }
        else{
            super(name, null, {}, "none", "none", null, position, false, {});
            this.attackable = false;
        }
    }

    tickStatusEffects(){
        return super.tickStatusEffects();
    }

    takeDamage(damage){
        super.takeDamage(damage);
    }

    toJSON(){
        return {};
    }

}