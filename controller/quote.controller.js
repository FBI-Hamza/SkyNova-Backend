const quote = require('../models/quote.model'); 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../firebase.config');
const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
const warHero = require('../models/warhero.model'); 


const createQuote = async (req, res) => {
    try {
        const {text,warHeroId} = req.body;
  
          const newQuote = new quote({
          text,
        });
    
        await newQuote.save();

        const warHeroes = await warHero.findById(warHeroId);
        if (!warHeroes) {
            return res.status(404).json({ message: 'War Hero not found' });
        }
        warHeroes.famousQuote.push(newQuote._id);
        await warHeroes.save();
    
        res.status(200).json({ message: 'Quote created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
  }
};

const viewQuotes = async (req, res, next) => {
  try {
    const quotes = await quote.find({ });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const quoteViewById= async (req,res,next)=>{
    quote.find({_id:req.params.id}).then((quotes)=>{
    return res.json(quotes);   
    }).catch((error)=>{
    return error;
    })   
};

const deleteQuote = async (req, res, next) => {
  try {
    const quoteId = req.params.id;

    const deletedQuote = await quote.deleteOne({_id: quoteId});

    if (deletedQuote.deletedCount === 0) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateQuote= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
    try {
      const quotes = await quote.findByIdAndUpdate(_Id, {$set:updated},{new:true});

      if (!quotes) {
        return res.status(404).send('Quote not found');
      }
  
      res.json(quotes);
    } catch (err) {
      console.error('Error patching Quote:', err);
      res.status(500).send('Internal server error');
    }
  };

module.exports = {
  createQuote,
  viewQuotes,
  deleteQuote,
  quoteViewById,
  updateQuote
};