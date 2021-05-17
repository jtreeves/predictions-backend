function createSession(email, password) {
    try {
        const currentUser = await db.User.findOne({email})
        if (currentUser) {
            const isMatch = await bcrypt.compare(
                password, currentUser.password
            )
            if (isMatch) {
                const payload = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name
                }
                jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}, (error, token) => {
                    return {
                        success: true,
                        token: `Bearer ${token}`
                    }
                })
            } else {
                return 'Password is incorrect'
            }
        } else {
            return 'User not found'
        }
    } catch (error) {
        return error
    }
}

module.exports = createSession