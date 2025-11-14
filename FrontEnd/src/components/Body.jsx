import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";

import Home from "../pages/Home";
// import Favorites from "../pages/Favorites";
import CreatePost from "../pages/CreatePost";
// import Stories from "../pages/Stories";
import Posts from "../pages/Posts";
// import StoryDetail from "../pages/StoryDetail";
import PostDetail from "../pages/PostDetail";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Resources from "../pages/Resources";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";

// import AuthProvider, { useAuth } from "../context/AuthProvider";

import { useAuth } from "../context/AuthProvider";

// function RequireAuth({ children }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }

export const Body = ({ sFlag, sClose }) => {
    // const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();

    return (
        // <div className='grid grid-cols-16 text-center pt-4 gap-4 px-4'>
        //   <div className='bg-gray-200 grid gap-4 pl-4 pt-4 col-start-1 col-end-4'>
        //     <button className='flex items-center gap-2 hover:bg-gray-100'>
        //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-linejoin="round" d="M4.5 21.25V10.875a.25.25 0 0 1 .1-.2l7.25-5.438a.25.25 0 0 1 .3 0l7.25 5.438a.25.25 0 0 1 .1.2V21.25a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m22 9-9.1-6.825a1.5 1.5 0 0 0-1.8 0L2 9"></path></svg>
        //       <p>Home</p>
        //     </button>
        //     <button className='flex items-center gap-2 hover:bg-gray-100'>
        //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" d="M6.44 6.69a1.5 1.5 0 0 1 1.06-.44h9a1.5 1.5 0 0 1 1.06.44l.354-.354-.353.353A1.5 1.5 0 0 1 18 7.75v14l-5.694-4.396-.306-.236-.306.236L6 21.75v-14c0-.398.158-.78.44-1.06Z"></path><path stroke="currentColor" stroke-linecap="round" d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"></path></svg>
        //       <p>Favorites</p>
        //     </button>
        //     <button className='flex items-center gap-2 hover:bg-gray-100'>
        //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"></path><path stroke="currentColor" stroke-linecap="round" d="M8 8.5h8M8 15.5h5M8 12h8"></path></svg>
        //       <p>My Stories</p>
        //     </button>
        //     <button className='flex items-center gap-2 hover:bg-gray-100'>
        //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle><path stroke="currentColor" stroke-linecap="round" d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"></path></svg>
        //       <p>Profile</p>
        //     </button>
        //   </div>
        //   <div className='bg-gray-400 col-start-4 col-end-13'>
        //     2
        //   </div>
        //   <div className='bg-gray-600 col-start-13 col-end-17'>
        //     3
        //   </div>
        // </div>
        <div className="flex items-start gap-6 px-4 lg:px-8">
            {user ? <Sidebar open={sFlag} onClose={sClose} /> : null}

            <main className="flex-1 py-8">
                <div className="max-w-3xl space-y-8 mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/favorites" element={<Favorites />} /> */}
                        <Route path="/stories/new" element={<CreatePost />} />
                        <Route path="/stories" element={<Posts />} />
                        <Route path="/stories/:id" element={<PostDetail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};
