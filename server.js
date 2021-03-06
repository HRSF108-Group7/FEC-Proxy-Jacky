const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/restaurants/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/restaurants/:id/profile', (req, res)=> {
  axios.get(`http://ec2-18-225-9-230.us-east-2.compute.amazonaws.com/restaurants/${req.params.id}/profile`)
    .then((response) => {

      res.status(202).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
})

app.get('/restaurants/:id/menu-items', (req, res)=> {
  axios.get(`http://ec2-13-57-210-63.us-west-1.compute.amazonaws.com/restaurants/${req.params.id}/menu-items`)
    .then((response) => {
      res.status(202).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
})

app.get('/restaurants/:id/menu-items/:itemId', (req, res)=> {
  axios.get(`http://ec2-13-57-210-63.us-west-1.compute.amazonaws.com/${req.params.id}/menu-items/${req.params.itemId}`)
    .then((response) => {
      res.status(202).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
})


app.get('/restaurants/:id/suggestions', (req, res)=> {
  axios.get(`http://ec2-54-183-207-43.us-west-1.compute.amazonaws.com/restaurants/${req.params.id}/suggestions`)
    .then((response) => {
      res.status(202).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
})

app.get('/restaurants/:id/reviews', (req, res)=> {
  axios.get(`http://ec2-54-183-220-92.us-west-1.compute.amazonaws.com/restaurants/${req.params.id}/reviews`)
    .then((response) => {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
})


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
