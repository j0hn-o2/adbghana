// import React, { useState, useEffect } from 'react';

// const ImageUpload = ({ image, setImage }) => {
//   const [hover, setHover] = useState(false);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemove = () => {
//     setImage(null);
//   };

//   return (
//     <div
//       onDrop={handleDrop}
//       onDragOver={(e) => e.preventDefault()}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       className="relative w-48 h-48 border-2 border-dashed rounded-xl flex justify-center items-center bg-gray-100 overflow-hidden"
//     >
//       {image ? (
//         <>
//           <img src={image} alt="Uploaded" className="object-cover w-full h-full" />
//           {(hover || true) && (
//             <button
//               onClick={handleRemove}
//               className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs"
//             >
//               Remove
//             </button>
//           )}
//         </>
//       ) : (
//         <label className="text-gray-500 text-center cursor-pointer">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <p>Click or Drag & Drop</p>
//         </label>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;


// import React, { useState } from 'react';
// import './ImageUpload.css'; 

// const ImageUpload = ({ image, setImage }) => {
//   const [hover, setHover] = useState(false);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemove = () => {
//     setImage(null);
//   };

//   return (
//     <div
//       className="image-upload-container"
//       onDrop={handleDrop}
//       onDragOver={(e) => e.preventDefault()}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       {image ? (
//         <>
//           <img src={image} alt="Uploaded" className="image-preview" />
//           {(hover || true) && (
//             <button className="remove-button" onClick={handleRemove}>
//               Remove
//             </button>
//           )}
//         </>
//       ) : (
//         <label className="upload-label">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="file-input"
//           />
//           <div>
//             <p className="upload-text">Click or Drag & Drop</p>
//             <p className="upload-subtext">JPG, PNG under 5MB</p>
//           </div>
//         </label>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

// components/ImageUpload.jsx
import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ image, setImage }) => {
  const [hover, setHover] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
  };

  return (
    <div
      className="image-upload-container"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {image ? (
        <>
          <img src={image} alt="Uploaded" className="image-preview" />
          {(hover || true) && (
            <button className="remove-button" onClick={handleRemove}>
              Remove
            </button>
          )}
        </>
      ) : (
        <label className="upload-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <p className="upload-heading">Upload Profile Photo</p>
            <p className="upload-text">Click or Drag & Drop</p>
            <p className="upload-subtext">JPG, PNG under 5MB</p>
          </div>
        </label>
      )}
    </div>
  );
};

export default ImageUpload;


