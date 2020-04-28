'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const moviesData = require('./movies-data-small.json');
const helmet = require('helmet');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

console.log(process.env.API_TOKEN);

// app.use(function validateBearerToken(req, res, next) {
//   const apiToken = process.env.API_TOKEN;
//   const authToken = req.get('Authorization');
//   console.log(apiToken,authToken);
//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     return res.status(401).json({ error: 'Unauthorized request' });
//   }
//   next();
// });

app.get('/movie', (req, res) => {
  const { genre, country, avg_vote } = req.query;
  let results = moviesData;

  if (genre) {
    results = results.filter(app =>
      app.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    );
  }

  if (country) {
    results = results.filter(app =>
      app.country.toLocaleLowerCase().includes(country.toLocaleLowerCase())
    );
  }

  if (avg_vote) {
    results = results.filter(app =>
      Number(app.avg_vote) >= Number(avg_vote));
  }

  res.json(results);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});