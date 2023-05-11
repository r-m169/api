// imports the Express framework
const express = require('express');
//  creates an instance of the Express application
const app = express();
const PORT = 5000;

//Array of persons(data)
let persons = [
  { id: 1, name: 'Ahmed', age: 30, gender: 'male', email: 'Ahmed@gmail.com' },
  { id: 2, name: 'Mostafa', age: 25, gender: 'male', email: 'Mostafa@gmail.com' },
  { id: 3, name: 'Mohammed', age: 40, gender: 'male', email: 'Mohammed.@gmail.com' }
];

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
})

//Returns the persons array as a JSON response.
app.get('/persons', (req, res) => {
  res.json(persons);
});

// Adds a new person object to the persons array
app.post('/persons', (req, res) => {
  const person = req.body;
  person.id = persons.length + 1;
  persons.push(person);
  res.json(person);
});

//Returns a single person object from the persons array based on the id parameter 
app.get('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send();
  }
});

//Updates a single person object from the persons array based on the id parameter
app.put('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personIndex = persons.findIndex(person => person.id === id);
  if (personIndex !== -1) {
    const updatedPerson = { ...persons[personIndex], ...req.body };
    persons[personIndex] = updatedPerson;
    res.json(updatedPerson);
  } else {
    res.status(404).send();
  }
});

//Deletes a single person object from the persons array 
app.delete('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personIndex = persons.findIndex(person => person.id === id);
  if (personIndex !== -1) {
    persons.splice(personIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


app.listen(PORT, () => console.log(`API listening on port ${PORT}`));