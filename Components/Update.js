import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useHref } from 'react-router-dom';
import { redirect } from 'next/navigation';


function Products() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [Details, setDetails] = useState('');
    const [brand, setbrand] = useState('');
    const [color, setcolor] = useState('');
    const [size, setsize] = useState('');
    const [gender, setgender] = useState('');
    const [images, setImages] = useState([]);
    const [category, setcategory] = useState([]);
    
    return (

        <div className='className="flex mx-auto max-w-2xl justify-center '>
            <form  >
                {/* Title */}
                <div className="grid grid-cols-2 items-center ">
                    <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Title</label>
                    <div className="col-span-2">
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                            placeholder="Title of product"
                            required
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        />
                    </div>
                </div>
                {/* Options */}
                <div>
                    <label htmlFor="category" className="block text-lg font-medium text-gray-900">
                        Select Category
                    </label>
                    <select
                        className="mt-1.5 p-3 w-full rounded-md border border-gray-300 text-gray-700"
                        value={category}
                        onChange={(ev) => setcategory(ev.target.value)}
                    >
                        <option value="0">No category selected</option>
                        <option value="Tshirts">Tshirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Wallets">Wallets</option>
                        <option value="Shoes">Shoes</option>

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
                                Upload
                            </label>
                            {/* <input id="fileInput" type="file" className="hidden" accept="image/*" multiple onChange={uploadImages} /> */}
                        </div>
                    </div>
                </div>
                {/* Description Input */}
                <div className="grid grid-cols-2 items-center my-4">
                    <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Description</label>
                    <div className="col-span-2">
                        <textarea
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                            placeholder="Description about the product"
                            rows={6}
                            required
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                    </div>
                </div>
                {/* Product Details Input */}
                <div className="grid grid-cols-2 items-center my-4">
                    <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
                        Product Details
                    </label>
                    <div className="col-span-2">
                        <textarea
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                            placeholder="Product details"
                            rows={6}
                            required
                            value={Details}
                            onChange={(ev) => setDetails(ev.target.value)}
                        />
                    </div>
                </div>

                {/* more details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label>Brand</label>
                        <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Brand Name"
                            type="text"
                            value={brand}
                            onChange={ev => setbrand(ev.target.value)}
                        />
                    </div>

                    <div>
                        <label>Gender</label>
                        <select
                            className="mt-0.5 p-2 w-full rounded-md border border-gray-300 text-gray-700"
                            value={gender}
                            onChange={(ev) => setgender(ev.target.value)}
                        >
                            <option value="0">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label>Sizes</label>
                        <select
                            // required:true
                            className="mt-0.5 p-2 w-full rounded-md border border-gray-300 text-gray-700"
                            value={size}
                            onChange={(ev) => setsize(ev.target.value)}
                        >
                            <option value="0">Select Size</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>


                        </select>
                    </div>

                    <div >
                        <label>Color Options</label>
                        <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Color"
                            type="text"
                            value={color}
                            onChange={ev => setcolor(ev.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center my-4">
                    <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Price</label>
                    <div className="col-span-2">
                        <input
                            type="number"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
                            placeholder="Price"
                            required
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="items-center my-4 justify-center mt-10">
                    <div className="col-span-2 col-start-2">
                        <button
                             
                            className="rounded-lg border border-green-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300  bg-green-500"
                        >
                            Update Product
                        </button>
                    </div>
                </div>




            </form>
        </div>
    )
}

export default Products;
