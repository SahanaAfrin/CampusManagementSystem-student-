import { useState } from "react";
import { Link } from "react-router-dom";
import './DeleteStudent.css'; // Assuming you will create a CSS file for styling

const staticStudents = [
    { RollNumber: "S001", name: "John Doe", address: "123 Main St", contact: "1234567890" },
    { RollNumber: "S002", name: "Jane Smith", address: "456 Elm St", contact: "0987654321" },
]; // Static student data

function DeleteStudent() {
    const [students, setStudents] = useState(staticStudents);
    const [rollNumberToDelete, setRollNumberToDelete] = useState("");
    const [message, setMessage] = useState("");

    function handleDelete() {
        const updatedStudents = students.filter(student => student.RollNumber !== rollNumberToDelete);
        if (updatedStudents.length < students.length) {
            setStudents(updatedStudents);
            setMessage("The student has been deleted.");
        } else {
            setMessage("No student found with that roll number.");
        }
    }

    return (
        <div className="delete-student-container">
            <h1>Delete Student</h1>
            <input 
                type="text" 
                value={rollNumberToDelete} 
                onChange={(e) => setRollNumberToDelete(e.target.value)} 
                placeholder="Enter Roll Number to Delete" 
            />
            <button onClick={handleDelete}>Delete Student</button>
            {message && <p>{message}</p>}
            <h2>Student List</h2>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead>
        <tr>
            <th style={{ border: '2px solid black' }}>Roll Number</th>
            <th style={{ border: '2px solid black' }}>Name</th>
            <th style={{ border: '2px solid black' }}>Address</th>
            <th style={{ border: '2px solid black' }}>Contact</th>
        </tr>
    </thead>
    <tbody>
        {students.map(student => (
            <tr key={student.RollNumber}>
                <td style={{ border: '2px solid black' }}>{student.RollNumber}</td>
                <td style={{ border: '2px solid black' }}>{student.name}</td>
                <td style={{ border: '2px solid black' }}>{student.address}</td>
                <td style={{ border: '2px solid black' }}>{student.contact}</td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
    );
}

export default DeleteStudent;
