// // import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
// import { Card, Form, Input, Button, Select, Upload, message, Steps } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const { Step } = Steps;

// const Dashboard = () => {
//   const [form] = Form.useForm();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [users, setUsers] = useState([]); // ✅ Add state for users

//   // ✅ Load categories & subcategories from localStorage on mount
//   useEffect(() => {
//     const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
//     const storedSubCategories = JSON.parse(localStorage.getItem("subCategories")) || [];
  
//     setCategories(storedCategories);
//     setSubCategories(storedSubCategories);
//   }, []); 
  
//   useEffect(() => {
//     fetch("http://localhost:5001/api/subcategory/get")
//       .then(response => response.json())
//       .then(data => {
//         setSubCategories(data);
//         localStorage.setItem("subCategories", JSON.stringify(data)); // ✅ Store in localStorage
//       })
//       .catch(error => console.error("Error fetching subcategories:", error));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/category/get") // ✅ Ensure this matches your backend route
//       .then((response) => response.json())
//       .then((data) => {
//         setCategories(data);
//         localStorage.setItem("categories", JSON.stringify(data)); // ✅ Store in localStorage for persistence
//       })
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);
  
  
//   // // // ✅ Fetch users from backend API
//   // useEffect(() => {
//   //   fetch("http://localhost:5001/api/users") // ✅ Add full URL
//   //     .then(response => response.json())
//   //     .then(data => setUsers(data))
//   //     .catch(error => console.error("Error fetching users:", error));
//   // }, []);


//   // Handle category submission
//   // ✅ Function to add a new category
//   const handleCategorySubmit = async (values) => {
//     try {
//       const response = await fetch("http://localhost:5001/api/category/add", { // ✅ Correct backend URL
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: values.categoryName }),
//       });
  
//       if (!response.ok) throw new Error("Failed to add category");
  
//       const newCategory = await response.json();
//       setCategories([...categories, newCategory]);
      
//       message.success("Category added successfully");
//       form.resetFields();
//     } catch (error) {
//       message.error("Error adding category: " + error.message);
//     }
//   };
  

  
// // ✅ Function to add a new subcategory
// const handleSubCategorySubmit = async (values) => {
//   if (!selectedCategory) {
//     message.error("Please select a category first");
//     return;
//   }

//   console.log("Sending Subcategory Data:", { 
//     name: values.subcategoryName, 
//     categoryId: selectedCategory // Ensure categoryId is a valid ObjectId string
//   });

//   try {
//     const response = await fetch("http://localhost:5001/api/subCategory/add", {  
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         name: values.subcategoryName, 
//         categoryId: selectedCategory // Ensure categoryId is a valid ObjectId string
//       }),
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.message || "Failed to add subcategory");
//     }

//     const newSubCategory = await response.json();
//     setSubCategories([...subCategories, newSubCategory]); // ✅ Update state

//     message.success("Subcategory added successfully");

//     // ✅ Fetch updated subcategories after adding a new one
//     fetch("http://localhost:5001/api/subcategory/get")
//       .then(response => response.json())
//       .then(data => setSubCategories(data))
//       .catch(error => console.error("Error fetching subcategories:", error));

//     form.resetFields();
//   } catch (error) {
//     console.error("Frontend Error:", error.message);
//     message.error("Error adding subcategory: " + error.message);
//   }
// };


// // ✅ Function to add a new product
// const handleProductSubmit = async (values) => {
//   if (!selectedSubCategory) {
//     message.error("Please select subcategory");
//     return;
//   }

//   console.log("Sending Product Data:", { 
//     name: values.productName, 
//     description: values.description,
//     size: values.size,
//     color: values.color,
//     // categoryId: selectedCategory,  // ✅ Ensure correct categoryId
//     subCategoryId: selectedSubCategory  // ✅ Ensure correct subCategoryId
//   });

//   try {
//     const response = await fetch("http://localhost:5001/api/product/add", {  
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         name: values.productName, 
//         description: values.description,
//         size: values.size,
//         color: values.color,
//         // categoryId: selectedCategory, 
//         subCategoryId: selectedSubCategory 
//       }),
//     });

//     if (!response.ok) throw new Error("Failed to add product");

//     const newProduct = await response.json();
//     message.success("Product added successfully");

//     // ✅ Refetch products to update UI
//     fetch("http://localhost:5001/api/product/get")
//       .then(response => response.json())
//       .then(data => console.log("Updated Products List:", data))
//       .catch(error => console.error("Error fetching products:", error));

//     form.resetFields();
//   } catch (error) {
//     message.error("Error adding product: " + error.message);
//   }
// };

//   const steps = [
//     {
//       title: 'Category',
//       content: (
//         <Card title="Add/Select Category">
//           <Form form={form} onFinish={handleCategorySubmit}>
//             <Form.Item
//               name="categoryName"
//               rules={[{ required: true, message: 'Please input category name!' }]}
//             >
//               <Input placeholder="New Category Name" />
//             </Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add New Category
//             </Button>
//           </Form>
//           <div style={{ marginTop: 20 }}>
//             {/* <Select
//               style={{ width: '100%' }}
//               placeholder="Select Existing Category"
//               onChange={(value) => {
//                 setSelectedCategory(value);
//                 setCurrentStep(1);
//               }}
//               value={selectedCategory}
//             >
//               {categories?.map((cat) => (
//                 <Select.Option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </Select.Option>
//               ))}
//             </Select> */}
//             <Select
//               style={{ width: '100%' }}
//               placeholder="Select Existing Category"
//               onChange={(value) => {
//                 console.log("Selected Category ID:", value); // ✅ Debugging
//                 setSelectedCategory(value);
//                 setCurrentStep(1);
//               }}
//               value={selectedCategory}
//             >
//               {categories?.map((cat) => (
//                 <Select.Option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </div>
//         </Card>
//       )
//     },
//     {
//       title: 'Subcategory',
//       content: (
//         <Card title="Add/Select Subcategory">
//           <Form form={form} onFinish={handleSubCategorySubmit}>
//             <Form.Item
//               name="subcategoryName"
//               rules={[{ required: true, message: 'Please input subcategory name!' }]}
//             >
//               <Input placeholder="New Subcategory Name" />
//             </Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add New Subcategory
//             </Button>
//           </Form>
//           <div style={{ marginTop: 20 }}>
//             <Select
//               style={{ width: '100%' }}
//               placeholder="Select Existing Subcategory"
//               onChange={(value) => {
//                 setSelectedSubCategory(value);
//                 setCurrentStep(2);        // move to next step 2
//               }}
//               value={selectedSubCategory}
//               disabled={!selectedCategory}
//             >
//               {subCategories
//                 .filter(subCat => subCat.categoryId === selectedCategory)
//                 .map((subCat) => (
//                   <Select.Option key={subCat._id} value={subCat._id}>
//                     {subCat.name}
//                   </Select.Option>
//                 ))}
//             </Select>
//           </div>
//         </Card>
//       )
//     },
//     {
//       title: 'Product',
//       content: (
//         <Card title="Add Product">
//           <Form style={{padding:'10px'}} form={form} onFinish={handleProductSubmit}>
//             <Form.Item
//             // style={{paddingtop: '10px', paddingBottom: '20px'}}
//               name="productName"
//               rules={[{ required: true, message: 'Please input product name!' }]}
//             >
//               <Input placeholder="Product Name" />
//             </Form.Item>
//             <Form.Item
//               name="description"
//               rules={[{ required: true, message: 'Please input description!' }]}
//             >
//               <Input.TextArea placeholder="Description" />
//             </Form.Item>
//             <Form.Item
//               name="size"
//               rules={[{ required: true, message: 'Please input size!' }]}
//             >
//               <Input placeholder="Size" />
//             </Form.Item>
//             <Form.Item
//               name="color"
//               rules={[{ required: true, message: 'Please input color!' }]}
//             >
//               <Input placeholder="Color" />
//             </Form.Item>
//             <Form.Item name="image">
//               <Upload>
//                 <Button icon={<UploadOutlined />}>Upload Image</Button>
//               </Upload>
//             </Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Product
//             </Button>
//           </Form>
//         </Card>
//       )
//     }
//   ];

//   return (
//     <div>
//       {/* <Steps current={currentStep}>
//         {steps.map(item => (
//           <Step key={item.title} title={item.title} />
//         ))}
//       </Steps>
//       <div style={{ marginTop: 24 }}>
//         {steps[currentStep].content}
//       </div>
//       <div style={{ marginTop: 24 }}>
//         {currentStep > 0 && (
//           <Button style={{ margin: '0 8px' }} onClick={() => setCurrentStep(currentStep - 1)}>
//             Previous
//jiuiu           </Button>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react'

const Dashboard = () => {
  return (
    <div></div>
  )
}

export default Dashboard