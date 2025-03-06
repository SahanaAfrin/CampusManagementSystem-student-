import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import SubmitStudent from "./pages/SubmitStudent";
import SignUp from "./pages/SignUp"; // Import the SignUp component
import GetStudent from "./pages/GetStudent";
import UpdateStudent from "./pages/UpdateStudent";
import DeleteStudent from "./pages/DeleteStudent";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
    const [students, setStudents] = useState([
        { RollNumber: "S001", name: "John Doe", address: "123 Main St", contact: "1234567890" },
        { RollNumber: "S002", name: "Jane Smith", address: "456 Elm St", contact: "0987654321" },
    ]); // Static student data

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login />} />
                <Route path={"/signup"} element={<SignUp />} />
                <Route path={"dashboard"} element={<SharedLayout />}>
                    <Route index element={<Home />} />
                    <Route path={"submit"} element={<SubmitStudent students={students} setStudents={setStudents} />} />
                    <Route path={"get"} element={<GetStudent students={students} />} />
                    <Route path={"update"} element={<UpdateStudent />} />
                    <Route path={"delete"} element={<DeleteStudent />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
