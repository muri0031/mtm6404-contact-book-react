import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './utils/db';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import './App.css';

export const Contact = ({ id, firstName, lastName, email, phoneNumber, address}) => {
  return (
    <div className="contact">
    <Link to={`/details/${id}`}>
    <h2>{ `${lastName} ${firstName}`}</h2>
    <p> {email}</p>
    <p> {phoneNumber}</p>
    <p>{address}</p>
    </Link>
    </div>
  );
}


function App() {

const [contactBook, setContactBook] = useState ([]);
const [searchQuery, setSearchQuery] = useState('');
const [filteredContacts, setFilteredContacts] = useState([]);

const fetchContactBook = async () => {
  const q = query(collection(db, "contacts"), orderBy("lastName", "asc"))
const docsSnapshot = await getDocs(q);
const data = docsSnapshot.docs.map(doc => ({id: doc.id,
 ...doc.data()
}));
setContactBook(data);
setFilteredContacts(data);
};
//each-contact
useEffect(() => {
fetchContactBook();
}, []);

console.log(contactBook)

useEffect(() => {
  fetchContactBook();
}, []);


 // Search-bar
useEffect(() => {
  const results = contactBook.filter(contact => 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredContacts(results);
}, [searchQuery, contactBook]);



  return (
<>
<div className='contacts'>
<div className='add-wrap'>
<Link to='/add'><button className='add'>+</button></Link>
</div>
<h1>Contacts</h1>

<input 
   className='search-bar'
    type="text" 
    placeholder="Search..." 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)} 
        />

{filteredContacts.map((contact) => (
<Contact 
  key={contact.id} 
  id={contact.id}
  lastName={contact.lastName} 
  firstName={contact.firstName} 

/>
))};
</div>
</>

  )
   
  
}

export default App
