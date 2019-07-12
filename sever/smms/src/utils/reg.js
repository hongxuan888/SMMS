

/* 

密码正则验证规则

*/

export const regPwd = ( value ) => {
    //正则表达式
    const patrn = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    return patrn.test(value)
}

export const regPwdNum = ( value ) => {
    //正则表达式
    const patrn = /^[0-9]+$/
    return patrn.test(value)
}