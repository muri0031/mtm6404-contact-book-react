import { useEffect, useState } from "react"
import { db } from "../utils/db"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { useParams, useNavigate } from "react-router-dom"
import { EditForm } from "../components/EditForm"
import { Link } from "react-router-dom"

export const UpdateContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact]  = useState({});

const fetchContactById = async (contactId) => {
    const docRef = doc(db, "contacts", contactId);
    const docSnapshot = await getDoc(docRef);

if (docSnapshot.exists()) {
   setContact({
id: docSnapshot.id,
...docSnapshot.data()

   })

} else {
    console.log('document does not exist!')
    return null;
}

};

const handleUpdate = async (updatedContact) => {
try {
const docRef = doc(db, "contacts", id)
await updateDoc(docRef, updatedContact)
navigate('/');
} catch (error) {
console.log("error updating contacts", error)
} 
}

const handleContactDelete = async () => {
    const msg = "Are you sure you want to delete?";
    try {
        if (confirm(msg) == true) {
            const docRef = doc(db, "contacts", id);
            await deleteDoc(docRef);
            setContact({});
            navigate('/');
        } else {
           navigate(0); 
        }
    } catch (error) {
        console.log("Error deleting contact!", error);
    }
 
}

useEffect(() => {
fetchContactById(id)

}, [id])

const DeleteButton = () => {
    return (
        <button onClick={handleContactDelete} className="delete">Delete Contact</button>
    )
}



    return (
<div className="contact-details">
<div className="buttons"><Link to="/" >
                <button className="back-to">
                 <span class="material-symbols-outlined">
                 arrow_back_ios</span> 
                 <span>Contacts</span>
                 </button>
            </Link>
            </div>
            <h2>Edit Contact</h2>
{contact ? (
                <>
                <div className="update-container">
                    <EditForm contact={contact} onUpdate={handleUpdate} />
                  
                    </div>
                    <div>
                    <DeleteButton />
</div>
                </>
            ) : (
               <p>Loading contact details...</p> 
            )}
</div>   

     ) 
}

