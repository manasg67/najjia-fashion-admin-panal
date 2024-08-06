import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image'; // Make sure to import the Image component

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;

    const [listcategory, setListCategory] = useState([]);
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        details: '',
        brand: '',
        colors: '',
        sizes: '',
        gender: '',
        images: [],
        category: ''
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                    setImagePreviews(response.data.images);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setError(error);
                });
        }

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categories');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const contentType = response.headers['content-type'];
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError('Expected JSON response from server');
                }
                const data = response.data;
                setListCategory(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError(error);
            }
        };

        fetchCategories();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            for (const key in product) {
                formData.append(key, product[key]);
            }
            if (product.images.length > 0) {
                for (const file of product.images) {
                    formData.append('images', file);
                }
            }
            const response = await axios.put(`http://localhost:8000/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                alert("Product Updated Successfully");
                router.push('/products');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProduct((prev) => ({
            ...prev,
            images: files
        }));

        const filePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(filePreviews);
    };

    if (error) {
        return <div className='w-screen h-screen bg-white'>Error: {error.message}</div>;
    }

    return (
        <div className='bg-white h-screen w-screen'>
            <div className='flex mx-auto max-w-2xl justify-center bg-white h-screen w-screen'>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="grid grid-cols-2 items-center my-4 mt-5">
                        <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Title</label>
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="title"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                                placeholder="Title"
                                value={product.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="category" className="block text-lg font-medium text-gray-900">
                            Select Category
                        </label>
                        <select
                            name="category"
                            className="mt-1.5 p-3 w-full rounded-md border border-gray-300 text-gray-700"
                            value={product.category}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {listcategory.map(option => (
                                <option key={option._id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div> 

                    {/* Upload Image */}
                    <div className="flex flex-col gap-4 mt-5">
                        <div className="flex items-center">
                            <label className="text-lg font-medium text-gray-700 mr-2">Images</label>
                            <div className="flex items-center justify-center rounded-lg">
                                <label htmlFor="fileInput" className="flex items-center gap-1.5 px-3 py-2 text-center text-sm font-medium text-gray-500 border cursor-pointer hover:border-primary-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                        <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                    </svg>
                                    <input type="file" id="fileInput" onChange={handleImageChange} multiple />
                                    Upload
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="image-previews mt-4">
                        {imagePreviews.map((preview, index) => (
                            <Image key={index} src={preview} alt={`Preview ${index}`} width={100} height={100} />
                        ))}
                    </div>
                    {/* Description Input */}
                    <div className="grid grid-cols-2 items-center my-4">
                        <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Description</label>
                        <div className="col-span-2">
                            <textarea
                                name="description"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                                placeholder="Description"
                                rows={6}
                                value={product.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Product Details Input */}
                    <div className="grid grid-cols-2 items-center my-4">
                        <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Product Details</label>
                        <div className="col-span-2">
                            <textarea
                                name="details"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                                placeholder="Product Details"
                                rows={6}
                                value={product.details}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Brand and Gender */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Brand</label>
                            <input
                                name="brand"
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Brand"
                                type="text"
                                value={product.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                className="mt-0.5 p-2 w-full rounded-md border border-gray-300 text-gray-700"
                                value={product.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    {/* Size and Color */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Sizes</label>
                            <select
                                name="sizes"
                                className="mt-0.5 p-2 w-full rounded-md border border-gray-300 text-gray-700"
                                value={product.sizes}
                                onChange={handleChange}
                            >
                                <option value="">Select Size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Color Options</label>
                            <input
                                name="colors"
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Colors"
                                type="text"
                                value={product.colors}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Price */}
                    <div className="grid grid-cols-2 items-center my-4">
                        <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Price</label>
                        <div className="col-span-2">
                            <input
                                type="number"
                                name="price"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                                placeholder="Price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="items-center my-4 justify-center">
                        <div className="col-span-2 col-start-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg border border-green-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 bg-green-500"
                            >
                                {loading ? 'Updating...' : 'Update Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
