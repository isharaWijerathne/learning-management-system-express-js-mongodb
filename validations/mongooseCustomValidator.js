
//email calidator for mongoose
exports.emaliValidator = function emaliValidator(value)
{
    return value.includes('@') && value.includes(".com")
}

// password validator
exports.passwordValidator = function passwordValidator(value)
{
    //symbles for regular expression
    const symble = /[^a-zA-Z0-9]/ ;

    //uppercase for regular expression
    const upperCase = /[A-Z]/

    //max password length
    const length = 8

    return value.length > length && symble.test(value)  && upperCase.test(value)
}