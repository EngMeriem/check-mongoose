const express = require('express');
const router = express.Router();

const personCtrl = require('../controllers/personController');

//Static Routes
router.post('/newPerson', personCtrl.createNewPerson);
router.post('/newPeople', personCtrl.createManyPeople);
router.get('/findByName', personCtrl.findPeopleByName);
router.get('/findOneByFood', personCtrl.findOneByFood);
router.get('/findById', personCtrl.findPersonById);
router.put('/updateFood', personCtrl.findEditThenSave);
router.put('/updateAge', personCtrl.findAndUpdate);
router.delete('/removeById', personCtrl.removeById);
router.delete('/removeByName', personCtrl.removeManyPeople);
router.get('/queryChain', personCtrl.queryChain);

// Dynamic Routes (Using Request Body Or Request Params)
router.post('/newPersonByReq', personCtrl.createNewPersonDyn);
router.post('/newPeopleByReq', personCtrl.createManyPeopleDyn);
router.get('/findByName/:name', personCtrl.findPeopleByNameDyn);
router.get('/findOneByFood/:food', personCtrl.findOneByFoodDyn);
router.get('/findById/:id', personCtrl.findPersonByIdDyn);
router.put('/updateFood/:id', personCtrl.findEditThenSaveDyn);
router.put('/updateAge/:name', personCtrl.findAndUpdateDyn);
router.delete('/removeById/:id', personCtrl.removeByIdDyn);
router.delete('/removeByName/:name', personCtrl.removeManyPeopleDyn);
router.get('/queryChain/:food', personCtrl.queryChainDyn);


module.exports = router;