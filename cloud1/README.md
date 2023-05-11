
# Building the container 

```bash
# Build the image 
docker build -t api-persons .

# Run the Docker container
docker run -p  5000:5000 api-persons

```
# How to test the CRUD operations using postman

GET http://localhost:5000/persons
POST http://localhost:5000/persons with a body contains the person data
GET http://localhost:5000/persons/{id}
PUT http://localhost:5000/persons/{id} with a body contains the person data
DELETE http://localhost:5000/persons/{id}

