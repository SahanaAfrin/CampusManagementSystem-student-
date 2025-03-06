import { useState } from "react";
import { Link } from "react-router-dom";
import OutputContainer from "../components/OutputContainer";

const staticStudents = [
    { RollNumber: "S001", name: "John Doe", address: "123 Main St", contact: "1234567890" },
    { RollNumber: "S002", name: "Jane Smith", address: "456 Elm St", contact: "0987654321" },
];

function UpdateStudent() {
    const [originalStudent, setOriginalStudent] = useState(null);
    const [student, setStudent] = useState({ nic: "", name: "", address: "", contact: "" });
    const [updatedStudent, setUpdatedStudent] = useState(null);
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setResponseMessage("");
        setErrMessage("");
        setStudent((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    function handleCheckOut() {
        setResponseMessage("");
        setErrMessage("");

        if (!/^[A-Za-z0-9]+$/.test(student.nic)) {
            setErrMessage("Student roll number is empty or invalid");
            document.getElementById("nic").focus();
            return;
        }

        const studentIndex = staticStudents.findIndex(s => s.RollNumber === student.nic);
        if (studentIndex !== -1) {
            const foundStudent = staticStudents[studentIndex];
            setOriginalStudent(foundStudent);  // Show original details
            setUpdatedStudent(null);           // Clear after update table
        } else {
            setErrMessage("No student found with this roll number");
            setOriginalStudent(null);
            setUpdatedStudent(null);
        }
    }

    function handleSubmit(event) { 
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");

        if (!originalStudent) {
            setErrMessage("Inputs didn't check out");
            return;
        }

        const updatedData = { 
            RollNumber: student.nic, 
            name: student.name || originalStudent.name, 
            address: student.address || originalStudent.address, 
            contact: student.contact || originalStudent.contact 
        };

        const studentIndex = staticStudents.findIndex(s => s.RollNumber === student.nic);
        if (studentIndex !== -1) {
            staticStudents[studentIndex] = updatedData; // Update the static list
            setUpdatedStudent(updatedData); // Show updated details
            setResponseMessage("The student's details have been updated successfully");
        } else {
            setResponseMessage("No student found to update");
        }

        setStudent({ nic: "", name: "", address: "", contact: "" }); // Clear input fields
    }

    return (
        <div className="centered-element">
            <img className="student-img" src="https://cdn-icons-png.flaticon.com/512/5349/5349022.png" width="120px" alt="user-logo" />
            <div className="student-container">
                <h1>Update Student Details</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={student.nic} id="nic" name="nic" placeholder="Enter Roll Number *" />
                    <input onChange={handleChange} value={student.name} id="name" name="name" placeholder="Enter Name " />
                    <input onChange={handleChange} value={student.address} id="address" name="address" placeholder="Enter Address" />
                    <input onChange={handleChange} value={student.contact} id="contact" name="contact" placeholder="Enter Contact " />
                    <h5>{errMessage}&nbsp;</h5>
                    <br />
                    <button onClick={handleCheckOut} type="button">Check Out</button>
                    <button type="submit">Update Student Details</button>
                    <Link className="back-link" to="/dashboard">Back</Link>
                </form>
                <br />

                {/* BEFORE UPDATE TABLE */}
                <h2>Before Update:</h2>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{originalStudent?.RollNumber || "-"}</td>
                            <td>{originalStudent?.name || "-"}</td>
                            <td>{originalStudent?.address || "-"}</td>
                            <td>{originalStudent?.contact || "-"}</td>
                        </tr>
                    </tbody>
                </table>

                {/* AFTER UPDATE TABLE */}
                <h2>After Update:</h2>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{updatedStudent?.RollNumber || "-"}</td>
                            <td>{updatedStudent?.name || "-"}</td>
                            <td>{updatedStudent?.address || "-"}</td>
                            <td>{updatedStudent?.contact || "-"}</td>
                        </tr>
                    </tbody>
                </table>

                <OutputContainer
                    nic={updatedStudent?.RollNumber || ""}
                    name={updatedStudent?.name || ""}
                    address={updatedStudent?.address || ""}
                    contact={updatedStudent?.contact || ""}
                />
                <br />
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default UpdateStudent;
