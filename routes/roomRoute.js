const roomController = require('../controllers/roomController')
const router = require('express').Router();

// Rooms Page / Get all
// router.get("/", roomController.rooms_index);
// use room search

// Rooms Add page
router.get("/add", (req, res)=> {
    res.render("room-add",{title: "ADD ROOMS"});
});

// Rooms Add record
router.post("/addRoom", roomController.rooms_add);

// Delete Room
router.get("/delete/:id", roomController.rooms_delete)

// Find Room
router.get("/:viewOrEdit/:id", roomController.rooms_find)

// Update Room
router.post("/updateRoom/:id", roomController.rooms_update)

// Search Room
router.get("/", roomController.rooms_search)

module.exports = router;