module.exports = {
    dragonTreasure: async(req, res) => {
        const db = req.app.get('db');
        const theTreasure = await db.get_dragon_treasure(1);
        return res.status(200).send(theTreasure);
    },

    getUserTreasure: async(req, res) => {
        const db = req.app.get('db');
        const theTreasure = await db.get_dragon_treasure([req.session.user.id]);
        return res.status(200).send(theTreasure);
    },

    addUserTreasure: async(req, res) => {
        const {treasureURL} = req.body;
        const {id} = req.session.user;
        const db = req.app.get('db');
        const userTreasure = await db.add_user_treasure([treasureURL, id]);
        return res.status(200).send(userTreasure);

    },

    getAllTreasure: async(req, res) => {
        const db = req.app.get('db');
        const theTreasure = await db.get_all_treasure();
        return res.status(200).send(theTreasure);
    }
}

// const result = await db.get_user([username]);
//         const existingUser = result[0];
//         if(existingUser){
//             return res.status(409).send('Username taken')
//         }

//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(password, salt);
//         const registeredUser = await db.register_user([isAdmin, username, hash]);
//         const user = registeredUser[0];
        
//         req.session.user = {isAdmin: user.is_admin, username: user.username, id: user.id};
//         return res.status(201).send(req.session.user);

//     },