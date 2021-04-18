import JSONHelper from '../helpers/JSONHelper';
import { Entity } from '../models/Entity.js';

export class Enemy extends Entity{

    constructor(name, position){

        name = name.replace(/\s/g, '');
        
        if(name !== "None"){
            const jsH = new JSONHelper();
            const RPGEnemy = jsH.readGeneric(name, "enemies");

            let combat_stats = RPGEnemy.base_stats;

            super(name, null, combat_stats, RPGEnemy.element_strength, RPGEnemy.element_weakness, null, position);
            this.isAlive = true;
            this.attackable = true;
        }
        else{
            super(name, null, {}, "none", "none", null, position);
            this.isAlive = false;
            this.attackable = false;
        }
    }

    takeDamage(damage){
        super.takeDamage(damage);
    }

    toJSON(){
        return {};
    }

}