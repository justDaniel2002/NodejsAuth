const User = require("../models/User");
const Deck = require("../models/Deck");

const index = async (req, res, next) => {
  //call back
  await Deck.find().then((decks) => {
    return res.status(200).json({ decks });
  });
};

const newDeck = async (req, res, next) => {
  const newDeck = new Deck(req.body);
  console.log("req.body content ", req.body);

  console.log();

  if (req.body.owner !== undefined) {
    await User.findById(req.body.owner).then((owner) => {
      owner.decks.push(newDeck);
      owner.save();
    });
  }

  await newDeck.save().then(() => res.status(200).json({ newDeck }));
};

// const newUserDecks = async (req, res, next) =>{
//     const newDeck = new Deck(req.body)

//     //get user
//     var user=new User();
//     await User.findById(req.params.userID)
//             .then(u => user=u)
//     //Assign user as a deck's owner
//     newDeck.owner = user
//     //save the deck
//     await newDeck.save()
//     //add deck to user's decks array
//     user.decks.push(newDeck._id)
//     //save user
//     await user.save()

//     return res.status(200).json({deck: newDeck})
// }

const getDeck = async (req, res, next) => {
  await Deck.findById(req.params.deckID).then((deck) =>
    res.status(200).json({ deck })
  );
};

// const getUserDecks = async (req, res, next) =>{
//     await User.findById(req.params.userID).populate('decks')
//              .then(user => {
//                 decks = user.decks
//                 return res.status(200).json({decks})
//              })
// }

const updateDeck = async (req, res, next) => {
  await Deck.findById(req.params.deckID).then((deck) => {
    if (req.body.owner !== undefined && req.body.owner != deck.owner) {
      User.findById(deck.owner).then((oldowner) => {
        oldowner.decks.filter((id) => id != deck._id);
        oldowner.save();
      });

      User.findById(req.body.owner).then((newowner) => {
        if (!newowner.decks.includes(req.params.deckID)) {
          newowner.decks.push(newDeck);
          newowner.save();
        }
      });
    }
  });

  await Deck.findByIdAndUpdate(req.params.deckID, req.body).then((deck) => {
    return res.status(200).json({ deck });
  });
};

const replaceDeck = async (req, res, next) => {
  await Deck.findById(req.params.deckID).then((deck) => {
    if (req.body.owner !== undefined && req.body.owner != deck.owner) {
      User.findById(deck.owner).then((oldowner) => {
        oldowner.decks.filter((id) => id != deck._id);
        oldowner.save();
      });

      User.findById(req.body.owner).then((newowner) => {
        if (!newowner.decks.includes(req.params.deckID)) {
          newowner.decks.push(newDeck);
          newowner.save();
        }
      });
    }
  });

  await Deck.findByIdAndUpdate(req.params.deckID, req.body).then((deck) => {
    return res.status(200).json({ deck });
  });
};

module.exports = {
  index,
  newDeck,
  getDeck,
  updateDeck,
  replaceDeck,
};
