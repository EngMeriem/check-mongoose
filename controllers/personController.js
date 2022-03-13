const { deleteOne } = require('../models/personSchema');
const Person = require('../models/personSchema');

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*--------------------------------------STATIC OPERATIONS---------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////////////////////

/*****************************************************************************************************/
/********************************** [C]RUD PART I : CREATE  ******************************************/
/*****************************************************************************************************/

// Create and Save a Record of a Model:

exports.createNewPerson =   (req,res,next) => {
    const newPerson = new Person({
        name: "meriem",
        age: 22,
        favoriteFoods: ['pizza', 'humburger'],
    });
    newPerson.save((err,data)=>{
        err ? res.status(400).json({error}) : res.status(201).json({message: 'Person saved successfully!'});
    })
}

// Create Many Records with model.create()

exports.createManyPeople =(req,res,next) => {
    const arrayOfPeople = [
        { name: "Meriem", age: 30, favoriteFoods: ["Pizza", "Sushi"] },
        { name: "Olfa", age: 20, favoriteFoods: ["Mlawi", "kouskous"] },
        { name: "Habiba", age: 15, favoriteFoods: ["rouz jerbi", "Pasta", "Mhammas"] },
        { name: "Mohamed", age: 6, favoriteFoods: ["Madfouna"] },
        { name: "Ahmed", age: 10, favoriteFoods: ["Mouloukhia", "Kouskous bel 7out"] },
        { name: "Meriem", age: 24, favoriteFoods: ["Pasta", "Cheeseburgers", "French Fries"] },
        ];
        Person.create(arrayOfPeople, (err, data) => {
            err ? console.log(err) : res.status(201).json({ message: 'People added successfully!'});
        });
    }

/*****************************************************************************************************/
/********************************** C[R]UD PART II : RESERCH  ****************************************/
/*****************************************************************************************************/

// Find all the people having a  name Meriem

exports.findPeopleByName = (req, res, next) => {
    let query = {name:"Meriem"};
    Person.find(query, {...req.body},(error,people)=>{
        error ? res.status(404).json({error}) : res.status(200).json(people); 
    });
};

// Find just one person which has the Pizza as a favorites food

exports.findOneByFood = (req, res, next) => {
    let query = {favoriteFoods:'Pizza'};
    Person.findOne(query,{...req.body}, (error,person)=>{
        error ? res.status(404).json({error}) : res.status(200).json(person);
    });
};

// Find the (only!!) person having a given _id

exports.findPersonById = (req, res, next) => {
    const personId = "622d3e27dcd58d7f2db0a91a";
    Person.findById(personId,{...req.body},(error,person)=>{
        error ? res.status(404).json({error}) : res.status(200).json(person);
    });
};

/*****************************************************************************************************/
/********************************** CR[U]D PART III : UPDATE  ****************************************/
/*****************************************************************************************************/

// Perform Classic Updates by Running Find, Edit, then Save

exports.findEditThenSave = (req,res,next) => {
    const personId = "622d3a357cb5cb18de6b79cd";
    const foodToAdd = "Hamburger";
    Person.findById(personId, (error,person)=>{
        if(error){console.log(error)}
        person.favoriteFoods.push(foodToAdd)
        person.save()
        .then((person) => {
            res.status(200).json({person});
        })
        .catch((error) => {
            res.status(404).json({error});
        });
    })       
};

// Perform New Updates on a Document Using model.findOneAndUpdate()

/* find a person by Name and set the person's age to 20 */

exports.findAndUpdate = (req,res,next) => {
    let query = {name:"Meriem"};
    let update = {$set: {"age": 20}};
    let options = {new : true};
    Person.findOneAndUpdate(query, update, options, (error, message)=>{
        error ? res.status(400).json({error}) : res.status(201).json({message : "Meriem's age was updated to 20 successfully !"});
    });     
};


/*****************************************************************************************************/
/********************************** CRU[D] PART IV : DELETE  *****************************************/
/*****************************************************************************************************/

// Delete One Document Using model.findByIdAndRemove

/* Delete one person by his _id */

exports.removeById = (req,res,next) => {
    const personId = "622dd72fe87d869874a920fd";
    Person.findByIdAndRemove(personId, (error, message)=>{
        error ? res.status(400).json({error}) : res.status(200).json({message : "Dhaker was deleted successfully !"});
    });     
};

// MongoDB and Mongoose - Delete Many Documents with model.remove() 

// collection.remove is deprecated. Using deleteMany or bulkWrite instead.
/* Delete all the people whose name is "Mary" */

exports.removeManyPeople = (req,res,next) => {
    const nameToRemove = "Ahmed";
    const NumberOfDeleted = Person.count( { name: nameToRemove } );
    Person.deleteMany({name : nameToRemove}, (error, NumberOfDeleted)=>{
        error ? res.status(400).json({error}) : res.status(200).json({message : "People are deleted successfully !", NumberItemsDeleted : `${NumberOfDeleted.deletedCount}`});
    });     
};

/*****************************************************************************************************/
/******************************** C[R]UD PART V : MORE ABOUT QUERIES  ********************************/
/*****************************************************************************************************/

// Chain Search Query Helpers to Narrow Search Results
// Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age.

exports.queryChain = (req,res,next) => {
    const foodToSearch = "Burrito";
    Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 })
        .exec((err, data) => {
            err ? res.status(400).json({error}) : res.status(200).json({data});
        });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*--------------------------------------DYNAMIC OPERATIONS---------------------------------------------*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/*****************************************************************************************************/
/********************************** [C]RUD PART I : CREATE  ******************************************/
/*****************************************************************************************************/

// Create and Save a Record of a Model using Body Request

exports.createNewPersonDyn =   (req,res,next) => {
    const newPerson = new Person(req.body);
    newPerson.save((err,message)=>{
        err ? res.status(400).json({error}) : res.status(201).json({message: 'Person created successfully!'});
    })
}

// Create Many Records with model.create() using Body Request

exports.createManyPeopleDyn =(req,res,next) => {
    const arrayOfPeople = req.body;
        Person.create(arrayOfPeople, (err, data) => {
            err ? console.log(err) : res.status(201).json({ message: 'People are created successfully!'});
        });
    }

/*****************************************************************************************************/
/********************************** C[R]UD PART II : RESERCH  ****************************************/
/*****************************************************************************************************/

// Find all the people having a  name given as params

exports.findPeopleByNameDyn = (req, res, next) => {
    let query = {name:req.params.name};
    Person.find(query, (error,people)=>{
        error ? res.status(404).json({error}) : res.status(200).json(people); 
    });
};

// Find just one person which has favorite food given as params

exports.findOneByFoodDyn = (req, res, next) => {
    let query = {favoriteFoods: req.params.food};
    Person.findOne(query, {...req.body}, (error, person)=>{
        error ? res.status(404).json({error: error}) : res.status(200).json(person);
    });
};

// Find the (only!!) person having a given _id as a params

exports.findPersonByIdDyn = (req, res, next) => {
    let query = {_id : req.params.id};
    Person.findById(query, {...req.body}, (error, person)=>{
        error ? res.status(404).json({error}) : res.status(200).json(person);
    });
};

// Perform Classic Updates by Running Find, Edit, then Save

exports.findEditThenSaveDyn = (req,res,next) => {
    const foodToAdd = req.body.favoriteFoods;
    let query = {_id : req.params.id};
    Person.findById(query, (err,person)=>{
        if(err){console.log(err)}
        person.favoriteFoods.push(foodToAdd)
        person.save()
        .then((person) => {
            res.status(201).json({person});
        })
        .catch((error) => {
            res.status(400).json({error});
        });
    });       
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
//find a person by Name and set his age in Request

exports.findAndUpdateDyn = (req,res,next) => {
    let query = {name:req.params.name};
    let update = {$set: {"age": req.body.age}};
    let options = {new : true};
    Person.findOneAndUpdate(query, update, options, (error, message)=>{
        error ? res.status(400).json({error}) : res.status(201).json({message : `${req.params.name}'s age was updated to ${req.body.age} successfully !`});
    });           
};


/*****************************************************************************************************/
/********************************** CRU[D] PART IV : DELETE  *****************************************/
/*****************************************************************************************************/

// Delete One Document Using model.findByIdAndRemove
// Delete one person by the person's _id given as params

exports.removeByIdDyn = (req,res,next) => {
    Person.findByIdAndRemove({_id : req.params.id}, (error, message)=>{
        error ? res.status(400).json({error}) : res.status(200).json({message : "person was deleted successfully !"});
    });     
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()

/* Delete all the people whose name given as params */

exports.removeManyPeopleDyn = (req,res,next) => {
    const nameToRemove = req.params.name;
    Person.deleteMany({name : nameToRemove}, (error, message)=>{
        error ? res.status(400).json({error}) : res.status(200).json({message : `People whose name's ${req.params.name} are deleted successfully !`});
    });     
};

/*****************************************************************************************************/
/******************************** C[R]UD PART V : MORE ABOUT QUERIES  ********************************/
/*****************************************************************************************************/

// Chain Search Query Helpers to Narrow Search Results
// Find people who like food given as params. Sort them by name, limit the results to two documents, and hide their age.

exports.queryChainDyn = (req,res,next) => {
    const foodToSearch = req.params.food;
    Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 })
        .exec((err, data) => {
            err ? res.status(400).json({error}) : res.status(200).json({data});
        });
};