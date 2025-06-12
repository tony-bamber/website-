const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;
const storage = require('./storage'); // Ensure this file exists and exports the Review class
const storageInstance = new storage();



// Set the public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  const storage = storageInstance.getAllstorage();
  res.render('index', { storage });
});

app.get('/add', function (req, res) {
  res.render('add');
});

app.post('/add', function (req, res) {
  const storage = storageInstance.getAllstorage();

  // Create a new review object
  const newstorage = {
    id: storage.length ? storage[storage.length - 1].id + 1 : 1,
    item: req.body.item,
    storage: req.body.storage,
  };

  // Add the new review to the instance
  storageInstance.addNewSstorage(newstorage);
  console.log(newstorage);

  // Redirect to the newly created review details page
  res.redirect(`/details/${newstorage.id}`);
});

app.get('/details/:id', function (req, res) {
  const storageId = parseInt(req.params.id, 10); // Convert to number
  const filterData = storageInstance.getOnestorage(storageId); // Ensure method name is correct

  if (!filterData) {
    return res.status(404).send('Review not found');
  }

  res.render('details', { filterData });
});

app.get('/about', function (req, res) {
  res.render('about');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
