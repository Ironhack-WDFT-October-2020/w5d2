const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
 Movie.find().populate('cast').then(data=> 
    data.forEach(e => {
        console.log(e.cast)
    })
    )


router.get('/movies/new', (req,res,next) => {
    Celebrity.find()
    .then(data => res.render('movies/new', {celebData:data}) )
    .catch(err => next(err))
})

router.get('/movies', (req,res,next) => {
    Movie.find().populate('cast')
    .then(data => res.render('movies/index', {movieData:data}))
    .catch(err => next(err))
})



router.get('/movies/:id', (req,res,next) => {
    const id = req.params.id
    Movie.findById(id)
    .then(data =>res.render('movies/show',{movieData:data} ) )
    .catch(err => next(err))
})

router.get('/movies/:id/edit', (req,res,next) => {
    const id = req.params.id
    Movie.findById(id)
    .then(data =>res.render('movies/edit',{movieData:data} ) )
    .catch(err => next(err))
})

router.post('/movies/:id', (req,res,next) =>{
    const {title, genre, plot} = req.body
    const id = req.params.id
    Movie.findByIdAndUpdate(id, {title, genre, plot})
    .then(() =>res.redirect('/movies') )
    .catch(err => next(err))
} )
router.post('/movies', (req,res,next) => {
    const {title, genre, plot, celebrityName} = req.body
     Movie.create({title:title, genre:genre, plot:plot, cast:celebrityName})
     .then( data => res.redirect('/movies'))
    .catch(err => next(err))
    
})




module.exports = router;