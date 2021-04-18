import JSONHelper from '../helpers/JSONHelper';
import { Entity } from '../models/Entity.js';

export class Player extends Entity{

    constructor(name, className, player_data, position){
        
        const jsH = new JSONHelper();
        const RPGClass = jsH.readClass(className);

        let stats = player_data.stats;
        let multiplied_primary = {};
        let multiplied_secondary = {};
        let multiplied_direct = {};
        let summed_primary = {};
        let summed_secondary = {};
        let summed_direct = {};

        for (const name in RPGClass.growths.primary) {
            multiplied_primary[name] = RPGClass.growths.primary[name] * (stats.level - 1);
            summed_primary[name] = RPGClass.base_stats.primary[name] + multiplied_primary[name];
        }

        for (const name in RPGClass.growths.secondary) {
            multiplied_secondary[name] = RPGClass.growths.secondary[name] * (stats.level - 1);
            summed_secondary[name] = RPGClass.base_stats.secondary[name] + multiplied_secondary[name];
        }

        for (const name in RPGClass.growths.direct) {
            if(name === "melee"){
                multiplied_direct["melee"] = {};
                multiplied_direct["melee"]["min_damage"] = RPGClass.growths.direct["melee"]["min_damage"] * (stats.level - 1);
                multiplied_direct["melee"]["max_damage"] = RPGClass.growths.direct["melee"]["max_damage"] * (stats.level - 1);
                summed_direct["melee"] = {};
                summed_direct["melee"]["min_damage"] = RPGClass.base_stats.direct["min_damage"] + multiplied_direct["melee"]["min_damage"];
                summed_direct["melee"]["max_damage"] = RPGClass.base_stats.direct["max_damage"] + multiplied_direct["melee"]["max_damage"];
            }
            else if(name === "magic"){
                multiplied_direct["magic"] = {};
                multiplied_direct["magic"]["min_damage"] = RPGClass.growths.direct["magic"]["min_damage"] * (stats.level - 1);
                multiplied_direct["magic"]["max_damage"] = RPGClass.growths.direct["magic"]["max_damage"] * (stats.level - 1);
                summed_direct["magic"] = {};
                summed_direct["magic"]["min_damage"] = RPGClass.base_stats.direct["min_damage"] + multiplied_direct["magic"]["min_damage"];
                summed_direct["magic"]["max_damage"] = RPGClass.base_stats.direct["max_damage"] + multiplied_direct["magic"]["max_damage"];
            }
            else if(name === "ranged"){
                multiplied_direct["ranged"] = {};
                multiplied_direct["ranged"]["min_damage"] = RPGClass.growths.direct["ranged"]["min_damage"] * (stats.level - 1);
                multiplied_direct["ranged"]["max_damage"] = RPGClass.growths.direct["ranged"]["max_damage"] * (stats.level - 1);
                summed_direct["ranged"] = {};
                summed_direct["ranged"]["min_damage"] = RPGClass.base_stats.direct["min_damage"] + multiplied_direct["ranged"]["min_damage"];
                summed_direct["ranged"]["max_damage"] = RPGClass.base_stats.direct["max_damage"] + multiplied_direct["ranged"]["max_damage"];
            }
            else{
                multiplied_direct[name] = RPGClass.growths.direct[name] * (stats.level - 1);
                summed_direct[name] = RPGClass.base_stats.direct[name] + multiplied_direct[name];
            }
        }

        let combat_stats = {
            "primary": summed_primary,
            "secondary": summed_secondary,
            "direct": summed_direct
        };

        super(name, stats, combat_stats, RPGClass.element_strength, RPGClass.element_weakness, RPGClass, position);

        this.experience = stats.experience;
        this.equips = player_data.equips;
        this.traits = player_data.traits;
        this.achievement_progress = player_data.achievement_progress;
        this.achievements = player_data.achievements;
        this.checkpoints = player_data.checkpoints; 
    }

    toJSON(){
        return {};
    }

}