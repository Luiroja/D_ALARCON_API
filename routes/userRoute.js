const express =require('express');
const router = express.Router();
const {registerUser, loginUser, 
        updateUser, getUser, 
        deleteUser, getUsers, stats} 
        = require("../controllers/userControllers");

const {protect} = require("../middlewares/authMiddleware")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post ('/user/:id', protect, updateUser);


router.get('/find/:id', getUser );
router.delete('/find/:id', deleteUser ); //Add the protectAdmin after getUser
router.get('/', getUsers ); // Add the protectAdmin
router.get('/stats', stats ); // Add the protectAdmin


module.exports = router; 