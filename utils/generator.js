//this function genarate next id for database table
//last used id => xxx-00000
//idCode => xxx
exports.nextIDGenarator = function(lastUsedID,idCode)
{
    //0000
    const usedNumber = Number(lastUsedID.substring(4));
    const nextAvailableNumber = usedNumber + 1;
    const numberafterPadLeft = String(nextAvailableNumber).padStart(5,'0');
    return idCode + '-' + numberafterPadLeft;

}
