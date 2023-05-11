import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { Component } from 'react'

const api = axios.create({
  baseURL: 'http://localhost:5000/persons'
})

class App extends Component {

  // define the initial state of the component
  state = {
    person: [],
    name: '',
    age: '',
    gender: '',
    email: ''
  }

  constructor(){
    super();
    
  }

  // fetch all persons
  getPersons = async () => {
    try {
      let data = await api.get('/').then(({data})=>
      data);
      this.setState({ person: data })
    }catch(err){
      console.log(err);
    }
    
  }
  
// create a new person
  createPerson = async (event) => {
    event.preventDefault(); 
    const { name, age, gender, email } = this.state;
    
    let res = await api
      .post('/', { "id":5, "name": name, "age": age, "gender": gender, "email": email })
      .catch(err=>console.log(err))

    console.log(res);
  }

  // delete a person by id 
  deletePerson = async(id) => {
    let data = await api.delete(`/${id}`);
    
    this.getPersons();
  }

  // get a person by id
  getPersonById = async (id) => {
    try {
      let data = await api.get(`/${id}`).then(({data}) => data);
      console.log(data);
      this.setState({ person: [data] })
    } catch(err) {
      console.log(err);
    }
  }

  //  update a person by id
  updatePerson = async (id) => {
    const { name, age, gender, email } = this.state;
    
    let data = await api
      .put(`/${id}`, { "name": name, "age": age, "gender": gender, "email": email })
      .catch(err=>console.log(err))
    
    // this.getPersons();
  }


  render(){
    const { name, age, gender, email } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">

          <h1>Create,Update,get 
            and Delete</h1>
         
         {/* from to create a new person */}
          <form onSubmit={this.createPerson} >
            <input type='text' placeholder='name'  value={name} onChange={(event) => this.setState({ name: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10 ,border: '2dp', borderColor: 'white' }}></input>
            <input type='number'  placeholder='age' value={age} onChange={(event) => this.setState({ age: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10 , borderColor: 'white'}}></input>
            <input type='text' placeholder='gender' value={gender} onChange={(event) => this.setState({ gender: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10 , borderColor: 'white'}}></input>
            <input type='text'  placeholder='email' value={email} onChange={(event) => this.setState({ email: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10 , borderColor: 'white'}}></input>
            <input type='submit'  value="Create" style={{ width: '200px', borderRadius: '5px',backgroundColor: '#A996D3' ,borderColor: 'white'}}></input>
          </form>
          <hr style={{width:'650px' ,borderColor: 'white'}}></hr>
          <form onSubmit={(event) => {
              event.preventDefault();
              let id = document.getElementById('updateId').value;
              this.updatePerson(id)
              }}>
            
            <input type='text' id='updateId' placeholder='id' style={{ width: '150px' , borderRadius: '5px' ,margin:10, borderColor: 'white'}}></input>
            <input type='text' placeholder='name' value={name} onChange={(event) => this.setState({ name: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10, borderColor: 'white'}}></input>
            <input type='number' placeholder='age' value={age} onChange={(event) => this.setState({ age: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10, borderColor: 'white'}}></input>
            <input type='text' placeholder='gender' value={gender} onChange={(event) => this.setState({ gender: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10, borderColor: 'white'}}></input>
            <input type='text' placeholder='email' value={email} onChange={(event) => this.setState({ email: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10, borderColor: 'white'}}></input>
            <input type='submit' value='update person'style={{ width: '200px', borderRadius: '5px' ,backgroundColor: '#A996D3', margin:10 , borderColor: 'white'}}></input>
          </form>
          <hr style={{width:'650px' ,borderColor: 'white'}}></hr>

          <form onSubmit={(event) => {
              event.preventDefault();
              let id = document.getElementById('personId').value;
              this.getPersonById(id);
              }}>
        
            <input type='text' id='personId'placeholder='id' style={{ width: '200px' , borderRadius: '5px', borderColor: 'white'}}></input>
            <input type='submit' value='Get person'style={{ width: '150px' , borderRadius: '5px' ,margin:10,backgroundColor: '#A996D3', borderColor: 'white'}}></input>
          </form>
          <hr style={{width:'650px' ,borderColor: 'white'}}></hr>
        
          <button onClick={this.getPersons} style={{ width: '200px' , borderRadius: '5px' ,margin:20,backgroundColor: '#A996D3', borderColor: 'white'}}>get all</button>
          {this.state.person.map( p => <h2 key={p.id}>{  p.name  }<button onClick={()=>this.deletePerson(p.id)}>delete</button></h2> )}

        </header>
      </div>
    );
  }
  
}

export default App