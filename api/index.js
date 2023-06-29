require('dotenv').config();

const axios = require('axios');
const express = require('express');
const path = require('path');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const header = { headers: { Authorization: process.env.GITHUB_API_KEY } };

// const header1 = { 'Authorization': process.env.GITHUB_API_KEY }
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./client/dist'));

//PRODUCTS
app.get('/products', (req, res) => {
  axios.get(`${url}/products/?count=50`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/products/:id', (req, res) => {
  axios.get(`${url}/products/${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/products/:id/styles', (req, res) => {
  axios.get(`${url}/products/${req.params.id}/styles`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/products/:id/related', (req, res) => {
  axios.get(`${url}/products/${req.params.id}/related`, header)
    .then(result => res.status(200).send(result.data));
});

// REVIEWS
// get 100 reviews by id
app.get('/reviews/:id/count', (req, res) => {
  axios.get(`${url}/reviews/?product_id=${req.params.id}&count=100`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/reviews/:id', (req, res) => {
  axios.get(`${url}/reviews/?product_id=${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/reviews/meta/:id', (req, res) => {
  axios.get(`${url}/reviews/meta/?product_id=${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

app.post('/reviews', (req, res) => {
  console.log('req.body', req.body)
  axios.post(`${url}/reviews`, req.body, header)
    .then((result) => {
      console.log('result', result);
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log(error);
      console.log('error.response.data', error.response.data)
      res.sendStatus(404);
    })
});

// PUT
// req.body.review_id = reveiw_id
app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('req.body', req.body);
  axios.put(`${url}/reviews/${req.params.review_id}/helpful`, req.body, header)
    .then(res.sendStatus(204))
    .catch(err => console.log(err))
});


/* -------------------------------------------------- */
/*  QUESTIONS & ANSWERS  */
// GET all questions data
app.get('/qa/questions/:id', (req, res) => {
  axios.get(`${url}/qa/questions?product_id=${req.params.id}&count=100`, header)
    .then(result => res.status(200).send(result.data));
});
// GET all answers data
app.get('/qa/questions/:id/answers', (req, res) => {
  axios.get(`${url}/qa/questions/${req.params.id}/answers?count=100`, header)
    .then(result => res.status(200).send(result.data));
});

// POST/ADD Quesion
app.post('/qa/questions', (req, res) => {
  axios.post(`${url}/qa/questions`, req.body, header)
    .then(result => res.status(201).end())
    .catch(err => console.log(err));
});

// POST/ADD Answer
app.post('/qa/questions/:id/answers', (req, res) => {
  axios.post(`${url}/qa/questions/${req.params.id}/answers`, req.body, header)
    .then(result => res.status(201).end())
    .catch(err => console.log(err));
});

// PUT Question Helpfulness
app.put('/qa/questions/:id/helpful', (req, res) => {
  const params = { question_id: req.params.id };
  axios.put(`${url}/qa/questions/${req.params.id}/helpful`, params, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

// PUT Question Report
app.put('/qa/questions/:id/report', (req, res) => {
  const params = { question_id: req.params.id };
  axios.put(`${url}/qa/questions/${req.params.id}/report`, params, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

// PUT Answer Helpfulness
app.put('/qa/answers/:id/helpful', (req, res) => {
  const params = { answer_id: req.params.id };
  axios.put(`${url}/qa/answers/${req.params.id}/helpful`, params, header)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => console.log(err));
});

// PUT Answer Report
app.put('/qa/answers/:id/report', (req, res) => {
  const params = { answer_id: req.params.id };
  axios.put(`${url}/qa/answers/${req.params.id}/report`, params, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

/* -------------------------------------------------- */
// CART
app.get('/cart', (req, res) => {
  axios.get(`${url}/cart`, header)
    .then(result => res.status(200).send(result.data));
});

/* -------------------------------------------------- */
// INTERACTIONS
app.post('/interactions', (req, res) => {
  axios.post(`${url}/interactions`, req.body, header)
    .then(result => {
      res.status(201).send(req.body);
    })
    .catch(err => console.log(err));
});

module.exports = app;

// const PORT = process.env.PORT || 3000;

// app.listen(PORT);
// console.log(`Server listening at http://localhost:${PORT}`);