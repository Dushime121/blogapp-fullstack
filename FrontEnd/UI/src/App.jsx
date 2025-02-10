// import "./app.scss";
// import Main from "./pages/main/Main";
// import SignIn from "./pages/sign/Signin";
// import SignUp from "./pages/sign/SignUp";
// import Create from "./pages/create/Create";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Main />} />
//         <Route path="/" element={<Create />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import "./app.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/main/Main";
import SignIn from "./pages/sign/Signin";
import SignUp from "./pages/sign/SignUp";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import View from "./pages/view/View";

// Check if the user is logged in
// const isAuthenticated = () => {
//   console.log("From the local storage: ", localStorage.getItem("userName"));
//   return localStorage.getItem("userName") !== null; // Assuming userId is stored after sign-in or sign-up
// };

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<Main />} />

        {/* Redirect to SignIn if not logged in */}
        <Route path="/create" element={<Create />} />

        {/* SignIn Route */}
        <Route path="/signin" element={<SignIn />} />

        {/* SignUp Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Edit Route */}
        <Route path="/edit/:id" element={<Edit />} />
        {/* View Route */}
        <Route path="/post/:id" element={<View />} />
      </Routes>
    </Router>
  );
};

export default App;
