const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//Import Routes
const policeRoutes = require('./routes/police');
const caseRoutes = require('./routes/stolencase');

//App
const app = express();

//Database connection
mongoose
  .connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err.message);
    //Exit the process with failure
    process.exit(1);
  });

//Init middleware
app.use(express.json({ extends: false }));

//Routes middleware
app.use('/api/police', policeRoutes);
app.use('/api/stolencase', caseRoutes);

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
