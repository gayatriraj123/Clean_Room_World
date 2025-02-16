import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Category from "../Category/Category";

const { Sider, Content } = Layout;

const AntdLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category);
    setSelectedCategory(category.title);
    navigate(`/category/${category._id}`); // Update the URL dynamically
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Layout>
        {/* Sidebar with click handler */}
        <Sider width={280} theme="light">
          <Sidebar onCategoryClick={handleCategoryClick} />
        </Sider>

        {/* Main content area */}
        <Content
          style={{
            marginLeft: "36px",
          }}
        >
          {/* Render the selected category */}
          <Outlet context={{ selectedCategory }} />
          {/* <Category selectedCategory={selectedCategory} /> */}
        </Content>

        {/* Pass selected category to Category component */}
        {/* <Category selectedCategory={selectedCategory} /> */}
      </Layout>
    </Layout>
  );
};

export default AntdLayout;



// import React, { useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import { Layout } from "antd";
// import { Outlet, useNavigate } from "react-router-dom";
// import Category from "../Category/Category";

// const { Sider, Content } = Layout;

// const AntdLayout = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const navigate = useNavigate();

//   const handleCategoryClick = async (category) => {
//     console.log("Category clicked:", category);
//     setSelectedCategory(category.title);

//     try {
//       // Fetch subcategories directly on category click
//       const response = await fetch(
//         `http://localhost:5001/api/subcategory/${category._id}`
//       );
//       const data = await response.json();
//       setSubcategories(data);

//       // Navigate dynamically with category ID (optional)
//       navigate(`/category/${category._id}`);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Navbar />
//       <Layout>
//         {/* Sidebar with click handler */}
//         <Sider width={280} theme="light">
//           <Sidebar onCategoryClick={handleCategoryClick} />
//         </Sider>

//         {/* Main content area */}
//         <Content style={{ marginLeft: "36px" }}>
//           {/* Pass subcategories to Category component */}
//           <Category selectedCategory={selectedCategory} subcategories={subcategories} />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AntdLayout;
