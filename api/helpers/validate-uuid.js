const validateUUIDV4 = (str='') => {
    const chunks = str.split('-');
    if(chunks.length !== 5) return false;
    if(
        chunks[0].length !== 8 || 
        chunks[1].length !== 4 || 
        chunks[2].length !== 4 || 
        chunks[3].length !== 4 || 
        chunks[4].length !== 12
    ) return false;
    return true;
};


module.exports = {
    validateUUIDV4
};