// import axios from "axios";

// const serverBaseUrl = "http://localhost:8080";

// const checkAuth = async () => {
//   try {
//     const response = await axios.get(`${serverBaseUrl}/api/auth/check`, {
//       withCredentials: true,
//     });
//     return response.status === 200;
//   } catch (error) {
//     if (error.response) {
//       console.error("Authentication check failed:", error.response.status);
//       return false;
//     } else if (error.request) {
//       console.error("No response received for authentication check");
//       return false;
//     } else {
//       console.error("Error setting up authentication check:", error.message);
//       return false;
//     }
//   }
// };

// export default checkAuth;
