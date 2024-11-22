import express from 'express';
import {
  getAllUsers,
  registerUser,
  deleteUser,
} from "../controller/user.controller.js";



const router = express.Router();

/*
router.get('/users', function(req, res) {
    getAllUsers()
    .then(users => {
        console.log("From route: ", req.baseUrl);
        
        console.log('Users: ', users);
        
    }).catch(err => {
        console.error('Error: ', err);
        
    });
});

router.post('/users', function(req, res) {
    registerUser()
    .then(user => {
        console.log('User added:', req.body);
        
    })
    .catch(err => {
        console.error('Error: ', err);
        
    })
});
*/

// Use controllers directly as route handlers
router.get("/users", getAllUsers);
router.post("/users", registerUser);
router.delete("/users/:chatId", deleteUser);

export default router;