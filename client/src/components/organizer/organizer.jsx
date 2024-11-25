import React, { useState, useEffect } from "react";
import Nav from "../layout/Nav";
import Dialog from "./Dialog";
import CreateForm from "../cards/CreateForm";
import EditBookClub from "./EditBookClub";
import axios from "axios";
import { currentUserStore } from "../../data/currentUserStore";

function Organizer() {
    const initialFormData = {
        bookClubName: "",
        bookName: "",
        description: "",
        organizer: "",
        noOfAttendees: 1,
        participants: "",
        cadence: "",
        location: "",
    };

    const [isOpen, setIsOpen] = useState(false);
    const [organizerBookClubs, setOrganizerBookClubs] = useState([]);
    const { userName } = currentUserStore();

    useEffect(() => {
        const fetchBookClubs = async () => {
            const response = await axios.get("/api/bookClubs");
            const filteredClubs = response.data.filter((club) => club.organizer === userName);
            setOrganizerBookClubs(filteredClubs);
        };
        fetchBookClubs();
    }, [organizerBookClubs]);

    async function handleSubmit(formData) {
        try {
            const formattedData = {
                ...formData,
                participants: formData.participants.split(",").map((p) => p.trim()),
                status: "active",
                authcode: Math.floor(1000 + Math.random() * 9000),
            };

            const response = await axios.post("/api/bookclubs", formattedData);

            if (response.status === 201) {
                setIsOpen(false);
            }
        } catch (error) {
            alert("Failed to create book club. Please try again.");
        }
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col items-center w-full py-6 space-y-4">
                {organizerBookClubs.length === 0 && (
                    <div className="text-center text-gray-500">
                        <h2 className="text-xl font-semibold">
                            Oops! Looks like you haven't created any book clubs yet. 😅
                        </h2>
                        <p className="mt-2">
                            Don't worry, it's never too late! Hit the <strong>"Create New Book Club"</strong> button and start your learning today📖
                        </p>
                    </div>
                )}
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
                    <CreateForm
                        initialFormData={initialFormData}
                        onSubmit={handleSubmit}
                        onClose={handleClose}
                    />
                </Dialog>
                {organizerBookClubs.map((club, index) => (
                    <EditBookClub
                        key={index}
                        Id={club._id}
                        Name={club.bookClubName}
                        Description={club.description}
                    />
                ))}
            </div>
        </>
    );
}

export default Organizer;