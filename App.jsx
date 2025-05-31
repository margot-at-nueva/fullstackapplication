
import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';

function PetDashboard( {pet} ){
 return (
  <div className="information">
     <h2>{pet.name}</h2>
     <div className="innerrabbitinfocontainer">
       <ul>
         <li><strong>Name:</strong> {pet.name}</li>
         <li><strong>Type:</strong> {pet.type}</li>
         <li><strong>Breed:</strong> {pet.breed}</li>
         <li><strong>Gender:</strong> {pet.gender}</li>
         <li><strong>Age:</strong> {pet.age}</li>
         <li><strong>Personality:</strong> {pet.personality}</li>
         <li><strong>Favorite food:</strong> {pet.favoritefood}</li>
         <li><strong>Other:</strong> {pet.other}</li>
         <li><strong>Owner:</strong> {pet.human}</li>
       </ul>
       <img src= "miffy.png" className="petpic" alt={pet.name} />
     </div>
   </div>
   ); 
}

//Functions below fetch the pets and human data:
async function fetchAllPets() { //fetches all the pets
  try {
    const data = await fetch('http://localhost:3000/searchpets/all');
    return data.json();
  }catch(e){
    console.log("Error fetching these pets", e);
  }
}

async function fetchAllHumans() { //fetches all the humans
  try {
    const data = await fetch('http://localhost:3000/searchhumans/all');
    return data.json();
  }catch(e){
   console.log("Error fetching these pets", e);
  }
}


function App() {
 const [pets, setPets] = useState([]); //making a variable to get the pets
 const [humans, setHumans] = useState([]); //variable for all the humans

 useEffect(() => {

  fetchAllPets().then(data => { //sets the data from the database into the pets variable
      setPets(data);
    
  });

  fetchAllHumans().then(data => { //sets the data from the database into the humans variable
      setHumans(data);
    
  });

 }, []);

 const [newPet, setNewPet] = useState({ //this sets each variable info
  name: '',
  type: '',
  breed: '',
  gender: '',
  age: '',
  personality: '',
  favoritefood: '',
  other: '',
  human: '',
  petpic: ''
});

const addNewPet = async (name, type, breed, gender, age, personality, favoritefood, other, human, petpic) => { //adding a new pet using the post endpoint
  const res = await fetch('http://localhost:3000/addpet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      type,
      breed,
      gender,
      age,
      personality,
      favoritefood,
      other,
      human,
      petpic
    }),
  });

  const result = await res.json();
  console.log(result);
  fetchAllPets().then(setPets);
};

 return (
   <>
     <div className="header">
       <h1>Pets of Nueva</h1>
       <img src="miffy.png" className="rabbiticon" alt="rabbit icon" />
     </div>
     <h1>Add New Pet</h1>
    <div className="petformcontainer">
     
      <form onSubmit={(e) => {e.preventDefault(); addNewPet( //form to ask user for info about the pet which is then stored
        newPet.name,
        newPet.type,
        newPet.breed,
        newPet.gender,
        newPet.age,
        newPet.personality,
        newPet.favoritefood,
        newPet.other,
        newPet.human,
        newPet.petpic
      );
      }}
        className="petform">
            <input placeholder="Name" onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />
            <input placeholder="Type" onChange={(e) => setNewPet({ ...newPet, type: e.target.value })} />
            <input placeholder="Breed" onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} />
            <input placeholder="Gender" onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })} />
            <input placeholder="Age" type="number" onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}/>
            <input placeholder="Personality" onChange={(e) => setNewPet({ ...newPet, personality: e.target.value })}/>
            <input placeholder="Favorite Food" onChange={(e) => setNewPet({ ...newPet, favoritefood: e.target.value })}/>
            <input placeholder="Other Info" onChange={(e) => setNewPet({ ...newPet, other: e.target.value })} />
            <input placeholder="Owner Name" onChange={(e) => setNewPet({ ...newPet, human: e.target.value })} />
            <input placeholder="Image URL" onChange={(e) => setNewPet({ ...newPet, petpic: e.target.value })}/>
        <button type="submit">Add Pet</button>
      </form>
      </div>
     <div className="petsinfocontainer">
        {!pets || pets.length === 0 ? (
          <p>Loading pets...</p>
        ) : (
          pets.map((pet, index) => ( 
            <PetDashboard key={index} pet={pet} /> //loops through list of pets in database and prints them to the screen
          ))
        )}
      </div>
  
   </>   
 )
}


export default App
