const { json } = require('body-parser');
const express =require('express');
const adminEmployees = express.Router();
const users = require('../models/users');
const {createNewUser, 
  fetchAllUser,
  getOneUser,deleteOneUser,
    updateOneUser} =require('../controllers/usersController')

adminEmployees.get('/',fetchAllUser);

//SINGLE employee details
adminEmployees.get('/:username',getOneUser);

//Add new employees
adminEmployees.post('/', createNewUser);

// Delete employees
adminEmployees.delete('/:username',deleteOneUser);

// Update employees
adminEmployees.patch('/:username',updateOneUser);


module.exports = adminEmployees;