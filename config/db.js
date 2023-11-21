const Mongoose =require('mongoose');


 function loginDetails() {
    Mongoose.connect(process.env.url) 

    // Mongoose.connection.once('open',() => {
    //     console.log('connected success');
        const db = Mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
        console.log('Connected to MongoDB');

  // Now, you can initialize GridFSBucket or perform other MongoDB operations here
});
        
}


module.exports=loginDetails;
