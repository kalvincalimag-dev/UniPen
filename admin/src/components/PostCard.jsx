import React from 'react';
import dateFormat from 'dateformat';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function PostCard({ post, onDeleteClick }) {
  if (!post) return null;
  const { title, thumbnail, tags, meta, createdAt, slug } = post;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="relative">
        <img
          className="w-full h-60 object-cover"
          src={thumbnail || './blank.jpg'}
          alt={title}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="bg-gray-800 bg-opacity-50 text-white py-4 px-6 w-full">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-300">{meta.substring(0, 100) + '...'}</p>
          </div>
        </div>
      </div>
      <div className="py-3 px-3 bg-gray-100 ">
        <div className="flex justify-between items-center">
          <p style={{fontSize: '13px'}} className="text-stone-500 bg-transparent shadow-md rounded-lg p-1">{dateFormat(createdAt, 'longDate')}</p>
          <p style={{fontSize: '13px'}} className="text-stone-500 bg-transparent shadow-md rounded-lg p-1">{tags.join(', ')}</p>
        </div>
        <div className="flex justify-between mt-3">
        <Link
          to={`/update-post/${slug}`}
          className="text-xs flex items-center text-green-900 hover:text-green-500 transition duration-300 ease-in-out rounded-full p-2 border border-green-900 hover:border-green-500"
        >
          <HiOutlinePencilAlt className="w-6 h-6 mr-2" />
          <span>Edit Article</span>
        </Link>

        <button
          onClick={onDeleteClick}
          className="text-xs flex items-center text-red-700 hover:text-red-600 transition duration-300 ease-in-out rounded-full p-2 border border-red-400 hover:border-red-600 ml-4"
        >
          <FiTrash className="w-6 h-6 mr-2" />
          <span>Unpublish</span>
        </button>

        </div>
      </div>
    </div>
  );
}
