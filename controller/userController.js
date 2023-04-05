/**
 * we can interact with mongoose in 3 ways
 * * callback
 * * promise
 * * async/await
 */
const User = require('../models/User')
const Deck = require('../models/Deck')

const index = async (req, res, next) =>{
    //call back
    await User.find()
        .then((users) =>{
            return res.status(200).json({ users })
        })
}

const newUser = async (req, res, next) =>{
    console.log('req.body content ', req.body)
    const newUser = new User(req.body)
    console.log(newUser)
    await newUser.save()
                .then(()=> res.status(200).json({ newUser }))

}

const newUserDecks = async (req, res, next) =>{
    const newDeck = new Deck(req.body)

    //get user
    var user=new User();
    await User.findById(req.params.userID)
            .then(u => user=u)
    //Assign user as a deck's owner
    newDeck.owner = user
    //save the deck
    await newDeck.save()
    //add deck to user's decks array
    user.decks.push(newDeck._id)         
    //save user
    await user.save()  

    return res.status(200).json({deck: newDeck})
}

const getUser = async (req, res, next) =>{

    await User.findById(req.params.userID)
             .then((user)=> res.status(200).json({ user })) 
}

const getUserDecks = async (req, res, next) =>{
    await User.findById(req.params.userID).populate('decks')
             .then(user => {
                decks = user.decks
                return res.status(200).json({decks})
             })
}

const updateUser = async (req, res, next) =>{
    await User.findByIdAndUpdate(req.params.userID, req.body)
            .then((user)=> res.status(200).json({ user })) 
}

const replaceUser = async (req, res, next) =>{
    // enforce new user to old user
    await User.findByIdAndUpdate(req.params.userID, req.body)
            .then((user)=> res.status(200).json({ user })) 
}

module.exports ={
    index, 
    newUser, 
    getUser, 
    updateUser, 
    replaceUser, 
    getUserDecks,
    newUserDecks
}