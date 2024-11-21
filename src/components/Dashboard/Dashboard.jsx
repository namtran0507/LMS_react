import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import Profile from "./Profile.jsx";
import Assignment from "../Assignment/Assignment.jsx";
import Users from "../User/Users.jsx";


// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("admin");

  
//   const renderSection = () => {
//     switch (activeSection) {
//       case "dashboard":
//         return (
//           <>
//             <Content />
//             {/* <Profile /> */}
//           </>
//         );
//       case "assignment":
//         return <Assignment />;
//       case "users":
//         return <Users />;
//       case "stats":
//         return <div>Stats Section</div>;
//       case "message":
//         return <div>Message Section</div>;
//       case "help":
//         return <div>Help Section</div>;
//       default:
//         return <Content />;
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
//       <div className="dashboard--content">{renderSection()}</div>
//     </div>
//   );
// };

// export default Dashboard;
const Dashboard = () => {
  return (
      <div>
          <h> cc</h>

      </div>
  );
};

export default Dashboard;