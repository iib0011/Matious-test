function swap(json){
    let ret = {};
    for(let key in json){
        ret[json[key]] = key;
    }
    return ret;
}

module.exports={swap}
