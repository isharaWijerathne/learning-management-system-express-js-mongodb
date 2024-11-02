
//email calidator for mongoose
export function emaliValidator(value)
{
    return String(value).includes('@') && String(value).includes(".com")
}

// password validator
export function passwordValidator(value)
{
    //symbles for regular expression
    const symble = /[^a-zA-Z0-9]/ ;

    //uppercase for regular expression
    const upperCase = /[A-Z]/

    //max password length
    const length = 8

    return String(value).length > length && symble.test(value)  && upperCase.test(value)
}