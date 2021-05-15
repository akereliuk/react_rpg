import BaseSkill from './BaseSkill';

export default class Incision extends BaseSkill {

    constructor(){
        super();
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
        this.SEName = "Bleed";
        this.SETurns = 3;
        this.SEDmg = 1;
        this.element = "none";
    }
}