import BaseSkill from './BaseSkill';

export default class Rend extends BaseSkill {

    constructor(){
        super();
        this.name = "Rend";
        this.description = "A heavy swing with killing intent.";
        this.usePosition = [1,2];
        this.partyTargets = [];
        this.partyAOE = false;
        this.enemyTargets = [1,2];
        this.enemyAOE = false;
        this.dmgMod = 1.5;
        this.accMod = 1;
        this.SEMod = 1;
        this.element = "none";
    }
}