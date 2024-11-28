import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Nav from "../layout/Nav.jsx";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ManageViewContent = () => {
  const [participants] = useState([
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Rodriguez",
    "Ethan Kim",
  ]);

  const [chapters, setChapters] = useState([
    {
      id: Date.now(),
      chapterName: "",  // Changed from name to chapterName to match API
      facilitator: "",
      notesLink: "",
      recordingLink: "",
    },
  ]);

  const [bookClubDataState, setBookClubData] = useState([]);

  const { courseId } = useParams();
  
  useEffect(() => {
    const fetchManageViewContent = async () => {
      try {
        const response = await axios.get(`/api/contents/${courseId}/`);
        const data = response.data;
        const bookClubID = data.bookClub;
        const response2 = await axios.get(`/api/bookclubs/${bookClubID}/`);
        const bookClubData = response2.data;
        setBookClubData(bookClubData);
        if (data.chapters && data.chapters.length > 0) {
          const chaptersWithIds = data.chapters.map(chapter => ({
            ...chapter,
            id: chapter.id || Date.now() + Math.random(),
            // No need to map chapterName since it's already in correct format
          }));
          setChapters(chaptersWithIds);
        } else {
          setChapters([{
            id: Date.now(),
            chapterName: "",
            facilitator: "",
            notesLink: "",
            recordingLink: "",
          }]);
        }
      } catch (error) {
        console.error('Error fetching course content:', error);
        setError(error.response?.data?.message || "Error fetching course content");
      }
    };

    fetchManageViewContent();
  }, [courseId]);
  

  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceCounts, setAttendanceCounts] = useState({});

  useEffect(() => {
    const counts = participants.reduce((acc, participant) => {
      let presentCount = 0;
      let absentCount = 0;

      Object.values(attendance).forEach((dateAttendance) => {
        if (dateAttendance[participant] === "present") {
          presentCount++;
        } else if (dateAttendance[participant] === "absent") {
          absentCount++;
        }
      });

      acc[participant] = {
        present: presentCount,
        absent: absentCount,
        total: presentCount + absentCount,
      };
      return acc;
    }, {});

    setAttendanceCounts(counts);
  }, [attendance, participants]);

  const updateAttendance = (name, status) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [name]: status,
      },
    }));
  };

  
  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      chapterName: "",
      facilitator: "",
      notesLink: "",
      recordingLink: "",
    };
    setChapters(chapters => [...chapters, newChapter]);
  };

  const updateChapter = (id, field, value) => {
    setChapters(chapters =>
      chapters.map((chapter) =>
        chapter.id === id ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  const deleteChapter = (id) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter((chapter) => chapter.id !== id));
    } else {
      alert("At least one chapter must remain.");
    }
  };

  const saveData = async () => {
    try {
      // No need to transform chapters since we're already using the correct structure
      const ManageViewContentData = {
        bookClub: courseId,
        chapters: chapters.map(({id, ...chapter}) => chapter) // Remove id before sending
      };

      const response = await axios.post('/api/contents', ManageViewContentData);

      if (response.status === 200 || response.status === 201) {
        alert("Course content saved successfully");
      }    
    } catch (error) {
      console.error('Error saving course content:', error);
      setError(error.response?.data?.message || "Error saving course content");
    }
  };

  const AttendanceToggle = ({ name, status, currentStatus, onClick }) => (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all
        ${
          currentStatus === status
            ? status === "present"
              ? "bg-green-100"
              : "bg-red-100"
            : "hover:bg-gray-50"
        }
      `}
    >
      {status === "present" ? (
        <CheckCircle
          className={`w-5 h-5 ${
            currentStatus === "present" ? "text-green-500" : "text-gray-300"
          }`}
        />
      ) : (
        <XCircle
          className={`w-5 h-5 ${
            currentStatus === "absent" ? "text-red-500" : "text-gray-300"
          }`}
        />
      )}
      <span
        className={`
        font-medium
        ${
          currentStatus === status
            ? status === "present"
              ? "text-green-700"
              : "text-red-700"
            : "text-gray-500"
        }
      `}
      >
        {status === "present" ? "Present" : "Absent"}
      </span>
    </div>
  );

  return (
    <>
      <Nav />
      <div>{bookClubDataState.bookClubName}</div>
      <div className="container mx-auto p-4 space-y-6">
        {/* Course Content Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Course Content</h2>
            <div className="flex justify-end gap-4">
            </div>
          </div> 
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Chapter Name</th>
                  <th className="border p-2">Facilitator</th>
                  <th className="border p-2">Notes Link</th>
                  <th className="border p-2">Recording Link</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter) => (
                  <tr key={chapter.id}>
                    <td className="border p-2">
                      <input
                        type="text"
                        readOnly
                        value={chapter.chapterName}
                        onChange={(e) =>
                          updateChapter(chapter.id, "chapterName", e.target.value)
                        }
                        placeholder="Chapter Name"
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        readOnly        
                        value={chapter.facilitator}
                        onChange={(e) =>
                          updateChapter(
                            chapter.id,
                            "facilitator",
                            e.target.value
                          )
                        }
                        placeholder="Facilitator"
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        readOnly        
                        value={chapter.notesLink}
                        onChange={(e) =>
                          updateChapter(chapter.id, "notesLink", e.target.value)
                        }
                        placeholder="Notes Link"
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="border p-2">
                        <input         
                        type="text"
                        readOnly
                        value={chapter.recordingLink}
                        onChange={(e) =>
                          updateChapter(
                            chapter.id,
                            "recordingLink",
                            e.target.value
                          )
                        }
                        placeholder="Recording Link"
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageViewContent;