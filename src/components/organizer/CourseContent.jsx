import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Nav from "../layout/Nav.jsx";
import { useParams } from 'react-router-dom';
import axios from "axios";



const CourseContent = () => {
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

  const { courseId } = useParams();
  
  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await axios.get(`/api/contents/${courseId}/`);
        const data = response.data;
  
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

    fetchCourseContent();
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
      const courseContentData = {
        bookClub: courseId,
        chapters: chapters.map(({id, ...chapter}) => chapter) // Remove id before sending
      };

      const response = await axios.post('/api/contents', courseContentData);

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
      <div className="container mx-auto p-4 space-y-6">
        {/* Course Content Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Course Content</h2>
            <div className="flex justify-end gap-4">
            <button
              onClick={addChapter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Chapter
            </button>
              <button onClick={saveData} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Save</button>
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
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter) => (
                  <tr key={chapter.id}>
                    <td className="border p-2">
                      <input
                        type="text"
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
                    <td className="border p-2">
                      <button
                        onClick={() => deleteChapter(chapter.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Tracking Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Tracker</h2>
          <div className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Participant</th>
                <th className="border p-2">Attendance Status</th>
                <th className="border p-2">Present Count</th>
                <th className="border p-2">Absent Count</th>
                <th className="border p-2">Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((name) => {
                const counts = attendanceCounts[name] || {
                  present: 0,
                  absent: 0,
                  total: 0,
                };
                const attendanceRate =
                  counts.total > 0
                    ? ((counts.present / counts.total) * 100).toFixed(1)
                    : "0.0";
                const currentStatus = attendance[selectedDate]?.[name] || "";

                return (
                  <tr key={name}>
                    <td className="border p-2">{name}</td>
                    <td className="border p-2">
                      <div className="flex flex-col gap-2">
                        <AttendanceToggle
                          name={name}
                          status="present"
                          currentStatus={currentStatus}
                          onClick={() => updateAttendance(name, "present")}
                        />
                        <AttendanceToggle
                          name={name}
                          status="absent"
                          currentStatus={currentStatus}
                          onClick={() => updateAttendance(name, "absent")}
                        />
                      </div>
                    </td>
                    <td className="border p-2 text-center text-green-600">
                      {counts.present}
                    </td>
                    <td className="border p-2 text-center text-red-600">
                      {counts.absent}
                    </td>
                    <td className="border p-2 text-center">
                      <span
                        className={`${
                          parseFloat(attendanceRate) >= 75
                            ? "text-green-600"
                            : parseFloat(attendanceRate) >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {attendanceRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
