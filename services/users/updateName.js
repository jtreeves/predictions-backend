async function updateName(id, name) {
    try {
        const updatedUser = await db.User.updateOne(
            {_id: id},
            {$set: {name: name}}
        )
        return updatedUser
    } catch (error) {
        return error
    }
}

module.exports = updateName