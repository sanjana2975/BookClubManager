import React from 'react';
import { Link } from 'react-router-dom';
import Nav from "../layout/Nav";
import Card from "../cards/Card";
import clubs from "../../data/BookClubs";
import user from "../../data/UserData";

function Home() {
  // Filter the list to get only the enrolled book clubs
  const enrolledClubs = clubs.filter((club) => user.enrolledBookClubs.includes(club.bookClubName));

  return (
    <>
      <Nav />
      {enrolledClubs.length > 0 && (
        <h2 className="mt-2 text-2xl text-center font-bold text-gray-900 mb-6">View All Your Enrolled Book Clubs:</h2>
      )}
      <div className="-mt-3 flex items-center flex-col">
        {enrolledClubs.length > 0 ? (
          enrolledClubs.map((club) => (
            <Card
              key={club.id}
              bookClubName={club.bookClubName}
              description={club.description}
              organizer={club.organizer}
              bookName={club.bookName}
              noOfAttendees={club.noOfAttendees}
              cadence={club.cadence}
              status={club.status}
              isEnrolled={true}
            />
          ))
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 text-center w-80 mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Oh no! You're not part of any book clubs yet.</h3>
            <p className="mt-4 text-gray-600">Explore and join a club to start connecting with other readers and sharing your thoughts on your favorite books.</p>
            <Link to="/manage">
                <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Explore Now
                </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
