const router = require("express").Router()
const isSignedIn = require("../middleware/is-signed-in.js")
const Entry = require("../models/Entry.js");

router.get('/new', isSignedIn, (req, res) => {
    res.render('entries.ejs');
});

router.get('/', async (req, res) => {

    const entries = await Entry.find({ isPublic: true });

    res.render('all-entries.ejs', { entries });

});


router.post('/', isSignedIn,async (req, res) => {
    console.log(req.session.user)

    req.body.owner = req.session.user._id;

    req.body.isPublic = req.body.isPublic === 'on';

    await Entry.create(req.body);

    res.redirect('/');

})

router.get('/my-entries', isSignedIn, async (req, res) => {

    const entries = await Entry.find({
        owner: req.session.user._id
    });

    res.render('my-entries.ejs', { entries });

});


module.exports = router;