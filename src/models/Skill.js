import Incision from './skills/Incision';
import Rend from './skills/Rend';

const skills = {
    Incision,
    Rend
};

class Skill{

    constructor(skillName, opts){
        return new skills[skillName](opts);
    }

}

export default Skill;