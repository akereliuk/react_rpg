import JSONHelper from '../helpers/JSONHelper';

export class Dungeon{

    constructor(name){
        this.filename = name;
        this.properties = {};
        this.tileList = [];
        this.loadDungeon(name);
    }

    loadDungeon(name){
        const jsH = new JSONHelper();
        this.properties = jsH.readGeneric(name, "dungeons");
        this.name = this.properties.name;
        this.populateTiles();
    }

    populateTiles(){

        let divider = 1;
        if(this.properties.events > 0){  
            divider = Math.floor(this.properties.enemies / this.properties.events);
        }

        let i=0;
        while(i<this.properties.tiles-1){
            
            for(let j=0;j<divider;j++){

                let combattile = {
                    type: "Combat",
                    enemies: this.properties.spawns[0].enemies
                };

                this.tileList.push(combattile);
                i++;
            }

            if(this.properties.events > 0){

                let eventtile = {
                    type: "Event"
                };

                this.tileList.push(eventtile);
                i++;
            }
        }
        
        let bosstile = {
            type: "Boss",
            enemies: this.properties.boss_spawns[0].enemies
        };

        this.tileList.push(bosstile);
    }

}