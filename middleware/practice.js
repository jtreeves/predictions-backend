function practice(number) {
    if (number !== null) {
        if (number % 2 === 0) {
            if (number > 3) {
                return {
                    code: 200,
                    message: 'Large even!'
                }
            } else {
                return {
                    code: 209,
                    message: 'Small even!'
                }
            }
        } else {
            throw {
                code: 402,
                message: 'Odd number; must be even'
            }
        }
    } else {
        throw {
            code: 403,
            message: 'Not a number!'
        }
    }
}

module.exports = practice