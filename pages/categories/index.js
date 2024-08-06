// import { useState, useEffect } from "react";
// import axios from "axios";
// import CategoryFormModal from "./CategoryFormModal";

// import toast from "react-hot-toast";
// import { useRouter } from "next/router";

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [editedCategory, setEditedCategory] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const router = useRouter();

//   const fetchCategories = () => {
//     axios.get('http://localhost:8000/categories')
//       .then(result => setCategories(result.data))
//       .catch(error => console.error("Error fetching categories", error));
//   };

//   const toggleFormModal = (category = null) => {
//     setEditedCategory(category);
//     setShowFormModal(!showFormModal);
//   };
//   const toggleFormModal2 = (category = null) => {

//     setShowFormModal2(!showFormModal2);
//   };

//   const closeDeleteModal = () => {
//     setCategoryToDelete(null);
//     setShowDeleteModal(false);
//   };

//   const deleteCategory = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:8000/categories/${id}`);
//       if (response.status === 200) {
//         toast.success("Category deleted successfully");
//         fetchCategories();
//         setShowDeleteModal(false);
//       }
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       toast.error("Failed to delete category");
//     }
//   };

//   return (
//     <>
//       <header>
//         <div style={{ backgroundColor: '#fff' }} className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center">
//             <div className="text-center sm:text-left">
//               <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">All Categories</h1>
//               <p className="mt-1.5 text-md text-gray-500">
//                 {editedCategory ? (
//                   <>
//                     Editing category, <span className="text-green-600 font-bold">{editedCategory.name}</span> &nbsp;
//                     <span className="text-blue-500 font-bold">{editedCategory?.parent?.name}</span>
//                   </>
//                 ) : (
//                   'Create a new category!'
//                 )}
//               </p>
//             </div>
//             <button
//               onClick={() => toggleFormModal()}
//               className="mt-4 rounded-lg border border-blue-100 bg-blue-100 px-5 py-3 text-center text-sm font-medium text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-200 sm:mt-3"
//             >
//               {editedCategory ? 'Edit Category' : 'Add Category'}
//             </button>
//           </div>
//           <hr className="my-8 h-px border-0 bg-gray-300" />
//         </div>
//       </header>

//       <CategoryFormModal
//         show={showFormModal}
//         onClose={toggleFormModal}
//         fetchCategories={fetchCategories}
//         editedCategory={editedCategory}

//       />


//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
//           <div className="fixed inset-0 bg-gray-300/50"></div>
//           <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
//             <div className="p-5">
//               <div className="text-center">
//                 <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900">Delete category</h3>
//                 <div className="mt-2 text-sm text-gray-500">Are you sure you want to delete the category <span className="font-bold">{categoryToDelete?.name}</span>?</div>
//               </div>
//               <div className="mt-5 flex justify-end gap-3">
//                 <button onClick={closeDeleteModal} className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100">Cancel</button>
//                 <button onClick={() => deleteCategory(categoryToDelete._id)} className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700">Delete</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div style={{ backgroundColor: '#fff' }} className="overflow-x-auto mx-auto p-4">
//         <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
//           <thead>
//             <tr>
//               <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">#</th>
//               <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">Category Name</th>
//               <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">Image</th>
//               <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category, Index) => (
//               <tr key={category._id} className="bg-white-50">
//                 <td className="px-4 py-2">{Index + 1}</td>
//                 <td className="px-4 py-2">{category.name}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-gray-700">
//                   {category.image ? (
//                     <Image src={category.image} alt={category.name} className="h-10 w-10 object-cover rounded-full" />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//                 <td className="px-4 py-2">
//                   <div className="flex gap-4">
//                     <button
//                       className="flex-1 rounded-lg border border-green-500 bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700"
                      
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700"
//                       onClick={() => {
//                         setCategoryToDelete(category);
//                         setShowDeleteModal(true);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// Updated code 

import { useState, useEffect } from "react";
import axios from "axios";
import CategoryFormModal from "./CategoryFormModal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const router = useRouter();

  const fetchCategories = () => {
    axios
      .get("http://localhost:8000/categories")
      .then((result) => setCategories(result.data))
      .catch((error) => console.error("Error fetching categories", error));
  };

  const toggleFormModal = (category = null) => {
    setEditedCategory(category);
    setShowFormModal(!showFormModal);
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setShowDeleteModal(false);
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/categories/${id}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        fetchCategories();
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const editCategory = async (category) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/categories/${category._id}`,
        category
      );
      if (response.status === 200) {
        toast.success("Category updated successfully");
        fetchCategories();
        setShowFormModal(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  return (
    <>
      <header>
        <div style={{ backgroundColor: '#fff' }} className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">All Categories</h1>
              <p className="mt-1.5 text-md text-gray-500">
                {editedCategory ? (
                  <>
                    Editing category, <span className="text-green-600 font-bold">{editedCategory.name}</span> &nbsp;
                    <span className="text-blue-500 font-bold">{editedCategory?.parent?.name}</span>
                  </>
                ) : (
                  'Create a new category!'
                )}
              </p>
            </div>
            <button
              onClick={() => toggleFormModal()}
              className="mt-4 rounded-lg border border-blue-100 bg-blue-100 px-5 py-3 text-center text-sm font-medium text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-200 sm:mt-3"
            >
              {editedCategory ? 'Edit Category' : 'Add Category'}
            </button>
          </div>
          <hr className="my-8 h-px border-0 bg-gray-300" />
        </div>
      </header>

      <CategoryFormModal
        show={showFormModal}
        onClose={toggleFormModal}
        fetchCategories={fetchCategories}
        editedCategory={editedCategory}
        onSubmit={editCategory} // Pass editCategory function for handling edit submit
      />

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="fixed inset-0 bg-gray-300/50"></div>
          <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
            <div className="p-5">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Delete category</h3>
                <div className="mt-2 text-sm text-gray-500">Are you sure you want to delete the category <span className="font-bold">{categoryToDelete?.name}</span>?</div>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <button onClick={closeDeleteModal} className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100">Cancel</button>
                <button onClick={() => deleteCategory(categoryToDelete._id)} className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: '#fff' }} className="overflow-x-auto mx-auto p-4">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">#</th>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">Category Name</th>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">Image</th>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, Index) => (
              <tr key={category._id} className="bg-white-50">
                <td className="px-4 py-2">{Index + 1}</td>
                <td style={{fontSize:21, fontWeight:'500'}} className="px-4 py-2 ">{category.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                  {category.image ? (
                    <Image src={category.image} alt={category.name} className="h-20 w-20 object-cover " />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-1 py-6">
                  <div className="flex gap-5">
                    <button
                      onClick={() => toggleFormModal(category)}
                      className="flex-1 rounded-lg border border-green-500 bg-green-500 px-1 py-3 text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(category);
                        setShowDeleteModal(true);
                      }}
                      className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
