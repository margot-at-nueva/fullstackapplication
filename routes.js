const express = require('express')
const router = express.Router()
const HumanSchema = require('../models/Human.js')
const PetSchema = require('../models/Pet.js')

                                                        // GET FUNCTIONS BELOW

//  1. TO SEARCH FOR AND LOOK AT THE ENTIRE DATABASE OF PETS
router.get('/searchpets/all', (req, res) => {
    PetSchema.find({
    })
    //'then' happens if find is succesful
    .then(pet => {
      console.log("succesfully got the entire database!")
      console.log(pet)
      res.json(pet)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      console.error(err)
    })
})

//  2. TO SEARCH FOR AND LOOK AT A PET BY SEARCHING THEIR ID
router.get('/searchpets/byid/:id', (req, res) => {
    PetSchema.findById(req.params.id)
    .then(pet => {
      console.log("succesfully got the pet based on their ID!")
      console.log(pet)
      res.json(pet)
    })
    .catch(err => {
      console.error(err)
    })
})

//  3. TO SEARCH FOR AND LOOK AT A PET BY SEARCHING THEIR NAME
router.get('/searchpets/byname/:name', (req, res) => {
  PetSchema.findOne({name: req.params.name})
  .then(pet => {
    console.log("succesfully got the pet based on its name!")
    console.log(pet)
    res.json([pet])
  })
  .catch(err => {
    console.error(err)
  })
})

//  4. TO SEARCH FOR AND LOOK AT THE ENTIRE DATABASE OF HUMANS
router.get('/searchhumans/all', (req, res) => {
  HumanSchema.find({
  })
  //'then' happens if find is succesful
  .then(human => {
    console.log("succesfully got the entire database of humand!")
    console.log(human)
    res.json([human])
  })
  //if theres an error, 'catch' happens instead
  .catch(err => {
    console.error(err)
  })
})

//  5. TO SEARCH FOR AND LOOK AT A HUMAN BY SEARCHING THEIR ID
router.get('/searchhumans/byid/:id', (req, res) => {
  HumanSchema.findById(req.params.id)
  .then(human => {
    console.log("succesfully got the human based on their ID!")
    console.log(human)
    res.json(human)
  })
  .catch(err => {
    console.error(err)
  })
})

//  6. TO SEARCH FOR AND LOOK AT A HUMAN BY SEARCHING THEIR NAME
router.get('/searchhumans/byname/:name', (req, res) => {
HumanSchema.findOne({name: req.params.name})
.then(human => {
  console.log("succesfully got the human based on its name!")
  console.log(human)
  res.json([human])
})
.catch(err => {
  console.error(err)
})
})

                                                        // POST FUNCTIONS BELOW


//  1. TO ADD A NEW PET
router.post('/addpet', (req, res) => {
    PetSchema.create(req.body).then(pet => {
        res.json(pet)
        console.log("succesfully added a new pet!")
        console.log(pet)
    })
    .catch(err => {
      console.error(err)
    })
})

//  2. TO ADD A NEW HUMAN
router.post('/addhuman', (req, res) => {
  HumanSchema.create(req.body).then(human => {
      res.json(human)
      console.log("succesfully added a new human!")
      console.log(human)
  })
  .catch(err => {
    console.error(err)
  })
})

                                                        // PUT FUNCTIONS BELOW


//TO UPDATE A PET
router.put('/updatepet/:id', (req, res) => {
  PetSchema.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => {
      // returns the previously saved model
      res.send(updated)
      console.log("succesfully found a pet by its ID and then updated it!")
      console.log(pet)
    })
    .catch(err => {
      res.json(err)
    })
})

//TO UPDATE A HUMAN
router.put('/updatehuman/:id', (req, res) => {
  HumanSchema.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => {
      // returns the previously saved model
      res.send(updated)
      console.log("succesfully found a human by its ID and then updated it!")
      console.log(human)
    })
    .catch(err => {
      res.json(err)
    })
})

                                                        // DELETE FUNCTIONS BELOW


//TO DELETE A PET
router.delete('/deletepet/:id', (req, res) => {
  PetSchema.findByIdAndDelete(req.params.id)
  .then(deleted => {
    res.send(deleted)
    console.log("succesfully found a pet by its ID and then deleted it!")
    console.log(pet)
  })
  .catch(err => {
    res.json(err)
  })
})

//TO DELETE A HUMAN
router.delete('/deletehuman/:id', (req, res) => {
  HumanSchema.findByIdAndDelete(req.params.id)
  .then(deleted => {
    res.send(deleted)
    console.log("succesfully found a human by its ID and then deleted it!")
    console.log(human)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router
