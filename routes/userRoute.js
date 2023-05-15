const express =require('express');
const router = express.Router();
const {registerUser, loginUser, 
        updateUser, getUser, 
        deleteUser, getUsers, stats} 
        = require("../controllers/userControllers");

const {protect, protectAdmin, protectAuth} = require("../middlewares/authMiddleware")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post ('/user/:id', protectAuth, updateUser);


router.get('/user/:id', protectAdmin, getUser );
router.delete('/user/:id', protectAdmin,deleteUser ); //Add the protectAdmin after getUser
router.get('/', getUsers ); // Add the protectAdmin
router.get('/stats',protectAdmin, stats ); // Add the protectAdmin


module.exports = router; 