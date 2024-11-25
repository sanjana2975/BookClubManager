import React from "react";
import Input from "../organizer/input";
import InputNumber from "../cards/Input";
import { useState, useEffect } from "react";

function CreateForm({ initialFormData, onSubmit, onClose }) {
    const [formData, setFormData] = useState(initialFormData);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData); // Pass formData to the parent component's onSubmit handler
    }

    return (
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
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
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

                <InputNumber
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
                    <label
                        htmlFor="cadence"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
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
    );
}

export default CreateForm;

