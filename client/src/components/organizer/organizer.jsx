import React, { useState, useEffect } from "react";
import Nav from "../layout/Nav.jsx";
import Dialog from "./Dialog.jsx";
import Input from "./input.jsx";
import CreatedBookClub from "./CreatedBookClub.jsx";
import axios from 'axios';
import { currentUserStore } from "../../store/currentUserStore.js";

function Organizer() {
    const initialFormData = {
        bookClubName: '',
        bookName: '',
        description: '',
        organizer: '',
        noOfAttendees: 1,
        participants: '',
        cadence: '', 
        location: ''
    };

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [organizerBookClubs, setOrganizerBookClubs] = useState([]);
    const { userName, setUserName } = currentUserStore();
     

    useEffect(() => {

        const fetchBookClubs = async () => {
            const response = await axios.get('/api/bookClubs');
            const filteredClubs = response.data.filter(club => club.organizer === userName);
            setOrganizerBookClubs(filteredClubs);
        }  
        fetchBookClubs();
    }, [organizerBookClubs])
    
    console.log(organizerBookClubs);
   

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleNumberChange(name, increment) {
        setFormData(prevState => {
            const currentValue = parseInt(prevState[name]) || 1;
            const newValue = increment 
                ? Math.max(1, currentValue + 1)
                : Math.max(1, currentValue - 1);
            return {
                ...prevState,
                [name]: newValue
            };
        });
    }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     try {
    //         console.log('Book Club Created:', formData);
    //         setFormData(initialFormData);
    //         setIsOpen(false);
    //     } catch (error) {
    //         console.error('Error creating book club:', error);
    //     }
    // }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // Format participants from string to array
            console.log(formData)
            const formattedData = {
                ...formData,
                participants: formData.participants.split(',').map(p => p.trim()),
                status: 'active' // Adding default status
            };
    
            const response = await axios.post('/api/bookclubs', formattedData);
            
            if (response.status === 201) {
                console.log('Book Club Created:', response.data);
                setFormData(initialFormData);
                setIsOpen(false);
                // Optionally refresh the page or update the list
                window.location.reload();
            }
        } catch (error) {
            console.error('Error creating book club:', error);
            alert('Failed to create book club. Please try again.');
        }
    }

    function handleClose() {
        setFormData(initialFormData);
        setIsOpen(false);
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col items-center w-full py-6 space-y-4">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    {"Create New Book Club"}
                </button>

                <Dialog isOpen={isOpen} onClose={handleClose}>
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold">Create Book Club</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Book Club Name"
                                id="bookClubName"
                                name="bookClubName"
                                value={formData.bookClubName}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Book Name/Course Name"
                                id="bookName"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleChange}
                                required
                            />

                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                            </div>

                            <Input
                                label="Organizer"
                                id="organizer"
                                name="organizer"
                                value={formData.organizer}
                                onChange={handleChange}
                                required
                            />

                            <div>
                                <label htmlFor="noOfAttendees" className="block mb-2 text-sm font-medium text-gray-900">
                                    Number of Attendees
                                </label>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleNumberChange('noOfAttendees', false)}
                                        className="bg-gray-200 px-3 py-1 rounded-l"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        id="noOfAttendees"
                                        name="noOfAttendees"
                                        value={formData.noOfAttendees}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-16 text-center border-t border-b border-gray-300 text-gray-900 text-sm p-2.5"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleNumberChange('noOfAttendees', true)}
                                        className="bg-gray-200 px-3 py-1 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <Input
                                label="Participants"
                                id="participants"
                                name="participants"
                                value={formData.participants}
                                onChange={handleChange}
                                placeholder="Enter participant names separated by commas"
                                required
                            />

                            <div>
                                <label htmlFor="cadence" className="block mb-2 text-sm font-medium text-gray-900">
                                    Cadence
                                </label>
                                <select
                                    id="cadence"
                                    name="cadence"
                                    value={formData.cadence}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Select cadence</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="biweekly">Bi-weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            <Input
                                label="Location"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create Book Club
                            </button>
                        </form>
                    </div>
                </Dialog>
                {/* <CreatedBookClub Name="JavaScript Mastery" Description="A book club dedicated to mastering JavaScript concepts, from beginner to advanced. Discussions are based on books and courses to help improve coding skills."/> */}
                {organizerBookClubs.map((club, index) => (
                    <CreatedBookClub Key={index} Id={club._id} Name={club.bookClubName} Description={club.description}/>
                ))}
            </div>
        </>
    );
}
export default Organizer;