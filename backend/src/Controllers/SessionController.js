const connection = require('../database/connection');

module.exports ={
    async autho(request, response) {
        const { userID, userPassword } = request.body;

        const user = await connection('user')
            .where({
                id: `${userID}`,
                password: `${userPassword}`,
            })
            .select('*')
            .first();

            if(!user) {
                return response.status(400).json({ erro: 'Password is incorrect or user does not exist' });
            }

            return response.json(user);

    }
}