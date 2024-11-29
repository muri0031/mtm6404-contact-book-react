import { useState } from "react"
import { db } from "../utils/db"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Add = () => {
    const navigate = useNavigate();

const [formData, setFormData] = useState({
firstName:"",
lastName:"",
email:"",
phoneNumber:"",
address:"",
})

const handleChange = (e) => {

    const  { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
    [name]: value,
    }));

};

const handleSubmit = async (e) => {
    e.preventDefault();

    const  c = collection(db, "contacts")
    try {
        const contact = await addDoc(c, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address
        })
        navigate('/');
    } catch (error) {
console.log('contact cannot be added', error)
    }
}

const handleCancel = () => {
    navigate('/')
};
    return (
        <div className="new-contact">
         <div className="buttons"><Link to="/" >
                <button className="back-to">
                 <span class="material-symbols-outlined">
                 arrow_back_ios</span> 
                 <span>Contacts</span>
                 </button>
            </Link>
            </div>
        <h2>New Contact</h2>
        <div className="form-container">
     <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-field">
            <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} />
        </div> 
        <div className="form-field">
            <input type="text" name="lastName" placeholder="Last Name"  required value={formData.lastName} onChange={handleChange} />
        </div>
        </div>
        <div className="form-row">
        <div className="form-field">
            <input type="text" name="phoneNumber" placeholder="Phone Number" required value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
            <input type="email" name="email" placeholder="Email"  required value={formData.email} onChange={handleChange} />
        </div>
        </div>
        <div className="form-row">
        <div className="form-field">
            <input type="text" name="address" placeholder="Address" required  value={formData.address} onChange={handleChange} />
            </div>
            </div>
            <div className="form-row buttons-row">  
  <button type="submit" className="add-contact">Add Contact</button>
  <button type="button" className="cancel" onClick={handleCancel}> Cancel </button>
  </div>
    </form>
    </div>
</div>
    )
}