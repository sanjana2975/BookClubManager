import React, { useState } from 'react';
import Nav from "../layout/Nav";
import useBookClubStore from '../../data/BookClubStore';

const CreateBookClub = () => {
  const addClub = useBookClubStore((state) => state.addClub);
  const [formData, setFormData] = useState({
    bookClubName: '',
    bookName: '',
    description: '',
    organizer: '',
    noOfAttendees: '',
    participants: '',
    cadence: '',
    location: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generateUniqueId = () => {
    return `club_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newClub = {
      id: generateUniqueId(),
      ...formData,
      participants: formData.participants.split(',').map(p => p.trim()),
      noOfAttendees: parseInt(formData.noOfAttendees),
      status: 'active'
    };

    addClub(newClub);

    setFormData({
      bookClubName: '',
      bookName: '',
      description: '',
      organizer: '',
      noOfAttendees : '',
      participants: '',
      cadence: '',
      location: ''
    });
    setFormSubmitted(true);
  };

  const handleCreateAnother = () => {
    setFormSubmitted(false);
  };

  return (
    <>
      <Nav />
      <div className="p-6 max-w-2xl mx-auto">
        {!formSubmitted ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Create a Book Club</h2>
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

              <Input
                label="Number of Attendees"
                id="noOfAttendees"
                name="noOfAttendees"
                type="number"
                value={formData.noOfAttendees}
                onChange={handleChange}
                required
              />

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
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="max-w-sm p-6 bg-green-100 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-green-600">Wohoo!!🎉</h3>
              <p className="text-lg text-gray-700 mt-2">Your Book Club has been successfully created!</p>
              <button
                onClick={handleCreateAnother}
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create Another Club
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateBookClub;