const buildUrl = (parameters, field, value, redirect=false, pathname='') => {
    let newUrl = '';
    parameters = {...parameters}
    
    parameters[field] = value;

    delete parameters.page;

    if(field === 'healthScore'){
        parameters.order = null;
    } else if(field === 'order'){
        parameters.healthScore = null;
    }
    
    for(let parameter in parameters){
        if(parameters[parameter]){
            if(newUrl.length === 0) newUrl = '?';
            newUrl += (newUrl.length === 1) ? `${parameter}=${parameters[parameter]}` : `&${parameter}=${parameters[parameter]}`;
        }
    }
    console.log(newUrl)
    if(redirect) return redirect.push(`${redirect.location.pathname}${newUrl}`);
    return newUrl;
};

const getUrlRequestApi = (parameters) => {
    let newUrl = '';
    parameters = {...parameters}
    if(parameters.search){
        parameters.name = parameters.search;
        delete parameters.search;
    }

    for(let parameter in parameters){
        if(parameters[parameter]){
            if(newUrl.length === 0) newUrl = '?';
            newUrl += (newUrl.length === 1) ? `${parameter}=${parameters[parameter]}` : `&${parameter}=${parameters[parameter]}`;
        }
    }
    return newUrl;
};


export {
    buildUrl,
    getUrlRequestApi
};