import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom"; 

const Sidebar = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/category/get");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // const handleCategoryClick = async (category) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5001/api/subcategory/get/${category._id}`
  //     );
  //     const data = await response.json();
  //     onCategoryClick(category.name, data); // Pass category name and subcategories to parent
  //   } catch (error) {
  //     console.error("Error fetching subcategories:", error);
  //   }
  // };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category._id}`); // Navigate to the category page
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <nav className="sidebar-nav">
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="nav-item"
              onClick={() => handleCategoryClick(category)}
            >
              <a href="#">{category.name}</a>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import { useState, useEffect } from "react";
// import "./Sidebar.css";

// const Sidebar = ({ onCategoryClick }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/category/get"); // Ensure this matches your backend route
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);


//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-title">Categories</h2>
//       <nav className="sidebar-nav">
//         {loading ? (
//           <p>Loading categories...</p>
//         ) : categories.length > 0 ? (
//           categories.map((category) => (
//             <div
//               key={category._id}
//               className="nav-item"
//               onClick={() => onCategoryClick(category)}
//             >
//               <a>{category.name}</a>
//             </div>
//           ))
//         ) : (
//           <p>No categories found</p>
//         )}
//       </nav>
//     </div>
//   );
// };


// export default Sidebar;
