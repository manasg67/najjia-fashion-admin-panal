import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Index() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Expected JSON response from server');
        }

        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      }
    };

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
        setCategory(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  if (error) {
    return <div className='w-screen h-screen bg-white'>Error: {error.message}</div>;
  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const data = await response.json();
      console.log('Product deleted:', data);
      // Update the product list after deletion
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error);
    }
  };

  const handleEdit = (productId) => {
    router.push(`/update/${productId}`);
  };

  return (
    <div className='w-screen h-screen bg-white'>
      <div className='px-4'>
        <header>
          <div className="mx-auto max-w-screen-2xl py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">View All Products</h1>
                <p className="mt-1.5 text-md text-gray-500 max-w-lg">Let&apos;s create a new product. 🎉</p>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-500 px-5 py-3 text-green-500 transition hover:bg-gray-50 hover:text-green-700 focus:outline-none focus:ring"
                  href={'/products/Add'}
                >
                  <span className="text-sm font-medium">Create Products</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <hr className="my-1 h-px border-0 bg-gray-300" />
        
        {/* Products */}
        <div>
          <div>
            {products.length === 0 ? (
              <p>No Products Found</p>
            ) : (
              <div className="ml-5 mr-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Category</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {products.map(product => (
                      <tr key={product._id}>
                        <td className="px-6 py-4">
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Image src={product.images[0]} alt={product.title} width={35} height={35} style={{ borderRadius: '10px', marginTop: '8px' }} />
                            <span className="ml-3 font-medium text-gray-900">{product.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{product.description}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
                            <button
                              className="flex items-center gap-4 px-6 py-2 font-medium bg-green-500 text-white border-green-500 rounded-xl"
                              onClick={() => handleEdit(product._id.toString())}
                            >
                              Edit
                            </button>
                            <button
                              className="flex items-center gap-4 px-6 py-2 font-medium bg-red-500 text-white border-red-500 rounded-xl"
                              onClick={() => deleteProduct(product._id.toString())}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
