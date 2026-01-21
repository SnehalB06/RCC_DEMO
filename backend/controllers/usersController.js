const users = require('../models/users');

//Add new employees

const createNewUser = async (req,res)=>{
  //add new user to db
  try {
    const newUser = await users.create(req.body); // directly pass req.body
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getOneUser = async (req,res)=>{
  //add new user to db
  try {
    const username = req.params.username;
    console.log('Searching by username:', username);

    const user = await users.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const fetchAllUser = async (req,res)=>{
  //add new user to db
  try {
    const allUsers = await users.find().sort({timestamps:-1}); // directly pass req.body
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}; 

const deleteOneUser = async (req,res)=>{
  //add new user to db
  try {
    const username = req.params.username;
    console.log('Searching by username:', username);

    const user = await users.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const updateOneUser = async (req,res)=>{
  //add new user to db
  try {
    const username = req.params.username;
    console.log('Searching by username:', username);

    const user = await users.findOneAndUpdate({ username:username },{...req.body});
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

module.exports = {
  createNewUser,
  fetchAllUser,
  getOneUser,
  deleteOneUser,
  updateOneUser
}