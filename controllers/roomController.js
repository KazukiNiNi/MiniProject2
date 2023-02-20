const Rooms = require('../models/Room');

// get all rooms
const rooms_index = async (req, res) => {
    const limit = 5;
    const page = 1;
    const search = '';

    const total = await Rooms.countDocuments({
        roomName: {$regex: search, $options: 'i'}
    });

    Rooms.find().sort({createdAt: 1})
    .then((result) => {
        res.render('room',{title:"ROOMS", data: result, total, limit, page, search});
    })
    .catch(err => console.log(err))
}

// add room
const rooms_add = (req, res) => {
    // console.log(req.body);
    const room = new Rooms(req.body)
    room.save()
    .then(result => res.redirect("/room"))
    .catch(err => console.log(err))
}

// find room
const rooms_find = (req,res) => {
    const id = req.params.id;
    Rooms.findById(id)
    .then((result) => {
        if(result){
            let viewOrEdit = req.params.viewOrEdit;
            if(viewOrEdit=='view'){
                res.render('room-view', {data: result, title:'VIEW ROOM'});
            }else if(viewOrEdit=='edit'){
                res.render('room-edit', {data: result, title:'EDIT ROOM'});
            }
            console.log('Get a record');
        }else{
            res.status(400).send('Id does not exist');
            // res.render('noPageFound', {title:'PAGE NOT FOUND'});
        }
    })
    .catch(err => console.log(err))
}

// update room
const rooms_update = async (req, res) => {
    let id = req.params.id;

    let roomUpdate = await Rooms.findByIdAndUpdate(id, {
        roomName: req.body.roomName,
        roomPic: req.body.roomPic,
        roomLimit: req.body.roomLimit,
        roomPrice: req.body.roomPrice
    })

    if(!roomUpdate) return res.status(404).send(`Book can't be updated`);
    res.redirect('back')
}

// delete room
const rooms_delete = async (req, res) => {
    console.log('delete record');
    const id = req.params.id;

    const deleteRoom = await Rooms.findByIdAndDelete(id);

    if(!deleteRoom){
        return res.status(404).send(`Book can't be deleted`);
    }
    res.redirect('back');
}

// search room
const rooms_search =  async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        // console.log(`page: ${page + 1}`);
        const limit = parseInt(req.query.limit) || 5;
        // console.log("limit: ", limit);
        const search = req.query.search || '';

        //total search items
        const total = await Rooms.countDocuments({
            roomName: {$regex: search, $options: 'i'}
        });

        //check/ search from database 
        const rooms = await Rooms.find({roomName: {$regex: search, $options: 'i'}})
        // .where(search)
        .limit(limit)
        .skip(page * limit);

        res.render('room',{title:"ROOMS", data: rooms, total, limit, page: page+1, search});
        // res.render('room',{title:"ROOMS", data: rooms, total, limit, page, search});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    rooms_index,
    rooms_add,
    rooms_find,
    rooms_update,
    rooms_delete,
    rooms_search
}