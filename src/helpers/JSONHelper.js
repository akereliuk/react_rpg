export default class JSONHelper {

    readTemplate(filename){
        var fs = window.require('fs');
        var json_return = JSON.parse(fs.readFileSync(`./public/data/templates/${filename}.json`, 'utf8'));
        return json_return;
    }

    readClass(filename){
        var fs = window.require('fs');
        var json_return = JSON.parse(fs.readFileSync(`./public/data/classes/${filename}.json`, 'utf8'));
        return json_return;
    }

    readGeneric(filename, type){
        var fs = window.require('fs');
        var json_return = JSON.parse(fs.readFileSync(`./public/data/${type}/${filename}.json`, 'utf8'));
        return json_return;
    }

    sumObjectKeys(...objs){
        return objs.reduce((a, b) => {
            for (let k in b) {
              if (b.hasOwnProperty(k))
                a[k] = (a[k] || 0) + b[k];
            }
            return a;
        }, {});
    }

}