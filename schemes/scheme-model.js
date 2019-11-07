
const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove,
};

//WORKING
// - `find()`:
//   - Calling find returns a promise that resolves to an array of all schemes in the database.
//   - No steps are included.
function find(){
    return db.select('*')
    .from('schemes');
}

//WORKING
// - `findById(id)`:
//   - Expects a scheme `id` as its only parameter.
//   - Resolve to a single scheme object.
//   - On an invalid `id`, resolves to `null`.
function findById(id){
    return db('schemes')
        .where({ id })
        .first();
}

//Almost Working
// - `findSteps(id)`:
//   - Expects a scheme `id`.
//   - Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
//   - This array should include the `scheme_name` _not_ the `scheme_id`.
function findSteps(id){
    return db('schemes as sc')
    .join('steps as st', 'sc.id', '=', 'st.sc.id')
    .select('st.id', 'st.scheme_name', 'st.step_number', 'st.instructions')
    .where({ id })
}

//WORKING (sends error failed to create new scheme)
// - `add(scheme)`:
//   - Expects a scheme object.
//   - Inserts scheme into the database.
//   - Resolves to the newly inserted scheme, including `id`.
function add(schemeData){
    return db('schemes')
    .insert(schemeData)
    .then(id => {
        return getById(id)
    });
}

//WORKING
// - `update(changes, id)`:
//   - Expects a changes object and an `id`.
//   - Updates the scheme with the given id.
//   - Resolves to the newly updated scheme object.
function update(changes, id){
    return db('schemes')
    .where({ id: id })
    .update(changes, id);
}

//WORKING
// - `remove(id)`:
//   - Removes the scheme object with the provided id.
//   - Resolves to the removed scheme
//   - Resolves to `null` on an invalid id.
//   - (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)
function remove(id){
    return db('schemes')
    .where('id', id)
    .del();
}

//STRETCH! 
// ^^^^^

//NOT WORKING
// - `addStep(step, scheme_id)`: This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.
// - You may use `POST /api/schemes/:id/addStep` to test this method.
function addStep(stepData, id){
    return db('schemes')
    .insert(stepData, id)
    .then(id => {
        return findById(id)
    })
}
