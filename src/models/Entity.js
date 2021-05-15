export class Entity{

    constructor(name, stats, combat_stats, element_strength, element_weakness, RPGClass = null, position, isAlive, equips){
        this.name = name;
        if(stats === null && name !== "None"){
            this.current_hp = combat_stats.primary.max_hp;
            this.height = combat_stats.primary.height;
            this.weight = combat_stats.primary.weight;
            this.fatigue = 0;
            this.fullness = 0;
            this.insanity = 0;
            this.corruption = 0;
        }
        else if(name === "None"){
            this.current_hp = 0;
        }
        else{
            this.level = stats.level;
            this.current_hp = stats.hp;
            this.height = stats.height;
            this.weight = stats.weight;
            this.fatigue = stats.fatigue;
            this.fullness = stats.fullness;
            this.insanity = stats.insanity;
            this.corruption = stats.corruption;
        }
        this.combat_stats = combat_stats;
        this.equips = equips;
        this.isAlive = isAlive;
        this.element_strength = element_strength;
        this.element_weakness = element_weakness;
        this.RPGClass = RPGClass;
        this.position = position;
        this.statusEffects = [];
        this.isAlive = isAlive;
    }

    addStatusEffect(name, damage, turns){
        this.statusEffects.push({
            name: name,
            damage: damage,
            turns: turns
        });
    }

    tickStatusEffects(){

        let log = [];
        let type = "";

        this.statusEffects.forEach((SE, index) => {

            if(SE.damage > 0){
                this.takeDamage(SE.damage);
                log.push(`${this.name} receives ${SE.damage} ${SE.name} damage.`);
                type = "DoT";
            }
            else{
                log.push(`${this.name} is effected by ${SE.name}.`);
                type = "SkipTurn";
            }

            this.statusEffects[index].turns--;

            if(this.statusEffects[index].turns === 0){
                this.statusEffects.splice(index, 1);
            }
        });

        return [log, type];
    }

    takeDamage(damage){
        this.current_hp = Math.max(0, this.current_hp - damage);

        if(this.current_hp === 0){
            this.isAlive = false;
        }
    }

}