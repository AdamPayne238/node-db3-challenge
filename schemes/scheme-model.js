
const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    // findSteps,
    add,
    addStep,
    update,
    remove,
};

//WORKING
function find(){
    return db.select('*').from('schemes');
}

//WORKING
function findById(id){
    return db('schemes')
        .where({ id })
        .first();
}

//NOT WORKING
function findSteps(id){
    return db('schemes')
        .where({ id })
        .first();
}

//WORKING (sends error failed to create new scheme
function add(schemeData){
    return db('schemes')
    .insert(schemeData)
    .then(ids => {
        return getById(id)
    });
}

//NOT WORKING
function addStep(stepData, id){
    return db('schemes')
    .insert(stepData)
    .then(id => {
        return findById(id)
    })
}

//NOT WORKING
function update(id, changes){
    return db('schemes')
    .where({ id })
    .update(changes);
}

//WORKING
function remove(id){
    return db('schemes')
    .where('id', id)
    .del();
}
