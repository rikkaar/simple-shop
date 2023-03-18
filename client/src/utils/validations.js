export function validatePassword(password) {
    let errors = []
    if (!password) {
        return ["Введите пароль"]
    }
    if (!/\d/.test(password)) {
        errors.push("Пароль должен содержать хотя бы одну цифру")
    }
    if (password.length < 5 || password.length > 32) {
        errors.push("Длина пароля должна быть 5-32 символа")
    }
    return errors
}

export function validateEmail(email) {
    if (!email) {
        return ["Введите почту"]
    }
    let errors = []
    if (!email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
    )) {
        errors.push("Email невалиден")
    }
    return errors
}