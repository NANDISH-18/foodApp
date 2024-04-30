const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://nandishmohanty10:Mohanty1818@cluster0.mumblqz.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0';



mongoose.connect(mongoURL);

const db = mongoose.connection;


// If error in mongodb connection
db.on('error', console.error.bind(console, 'error in connection DB'));
// If success
db.once('open', async () => {
    console.log('successfully connected to database');
    const fetchData = await mongoose.connection.db.collection('food_items');
    fetchData.find({ })
        .toArray()
        .then(async (data) => {
            const foodCategory = await mongoose.connection.db.collection('foodcategory');
            // Map through the data and add reference to
            foodCategory.find({})
            .toArray()
            .then((cat_data) => {
                global.food_items = data;
                global.food_categories = cat_data;
            })
            global.food_items = data;
        });

});

module.exports = db;
