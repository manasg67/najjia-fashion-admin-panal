import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function CategoryFormModal({ show, onClose, fetchCategories, editedCategory }) {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (editedCategory) {
      setName(editedCategory.name);
    } else {
      setName('');
    }
  }, [editedCategory]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please upload an image.');
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', imageFile);

      const response = await axios.post('http://localhost:8000/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success("Category created successfully");
      router.push('/categories');
      if (fetchCategories) {
        fetchCategories();
      }

      onClose();
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const updateCategories = async (e) => {
    e.preventDefault();
    try {
      const { _id } = editedCategory; // Assuming editedCategory has the _id field

      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', imageFile); // Assuming imageFile is the File object from input

      const response = await axios.put(`http://localhost:8000/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(`Category updated successfully: ${response.data.name}`);
      onClose();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${show ? 'flex' : 'hidden'} items-center justify-center p-4 sm:p-0`}>
      <div className="fixed inset-0 bg-gray-300/50"></div>
      <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-lg">
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editedCategory ? 'Edit Category' : 'Add Category'}
          </h3>
          <form onSubmit={editedCategory ? updateCategories : handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                className="block w-full rounded-md border border-slate-300 py-2.5 pl-2 pr-16 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                placeholder="Category Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary-400 sm:text-sm"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={handleCancel} className="px-1 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border border-blue-100 bg-blue-100 text-blue-600 shadow-sm hover:border-blue-200 hover:bg-blue-200"
                disabled={loading}
              >
                {loading ? 'Loading...' : editedCategory ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
