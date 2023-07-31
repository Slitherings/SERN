import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../input.css';

const Profile = () => {
  // Define state for the user profile
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    email: '',
    image: '', // Add image property to the profile state
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Function to handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, image: reader.result }));
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the profile data
    console.log(profile);
    // Reset the form fields
    setProfile({
      name: '',
      age: '',
      email: '',
      image: '',
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <div className="relative inline-block">
          <label htmlFor="imageUpload">
            <FaUserCircle className="text-6xl text-blue-500 cursor-pointer" />
            <input
              id="imageUpload"
              type="file"
              accept=".jpg,.png"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
            />
          </label>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-lg">Name:</span>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />
        </label>
        <label className="block">
          <span className="text-lg">Age:</span>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />
        </label>
        <label className="block">
          <span className="text-lg">Email:</span>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};
  
export default Profile;
