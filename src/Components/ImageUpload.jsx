// import React, { useState, useContext, useEffect,useRef} from 'react';
// import './ImageUpload.css';
// import { ImageContext } from '../context/ImageContext';

// const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'user_uploads'); // ✅ Change to your preset

//   const response = await fetch('https://api.cloudinary.com/v1_1/dckj5brue/image/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();
//   if (data.secure_url) {
//     return data.secure_url;
//   } else {
//     throw new Error(data.error?.message || 'Upload failed');
//   }
// };

// const ImageUpload = ({}) => {
//   const [hover, setHover] = useState(false);
//   const { setImage } = useContext(ImageContext);
//   const [imageFile, setImageFile] = useState(null); 
//   const formData = new FormData();

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
//     if (!file) return;

//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//      setImageFile(file); 

//        const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = reader.result;
//       sessionStorage.setItem('image', reader.result); // 
//        setImage(base64); 
//     };
//     reader.readAsDataURL(file);

//     if (imageFile) {
//     formData.append('image', imageFile); 
//   }
//   };

//     const imageFileRef = useRef(null);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//      try {
//       const cloudUrl = await uploadImage(file);
//       sessionStorage.setItem('image', cloudUrl);
//       alert('Image uploaded successfully!');
//     } catch (err) {
//       alert('Upload failed: ' + err.message);
//     }
//   };

//     setImageFile(file); 

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = reader.result;
//       sessionStorage.setItem('image', base64);
//       setImage(base64); 
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemove = () => {
//     setImage(null);
//   };

//    useEffect(() => {
//     const base64 = sessionStorage.getItem('image');
//     if (base64) setImage(base64);
//   }, [setImage]);

  
//   useEffect(() => {
//     if (imageFile) {
//       sessionStorage.setItem('image', imageFile.name);
//     }
//   }, [imageFile]);


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
//           <div className="upload-placeholder">
//             <div className="upload-icon">📷</div>
//             <p className="upload-heading">Upload Profile Photo</p>
//             <p className="upload-text">Click or Drag & Drop</p>
//             <p className="upload-subtext">JPG, PNG under 5MB</p>
//           </div>
//         </label>
//       )}
//     </div>

//     <div>
      
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//     </div>
//   );
// };

// export default ImageUpload;

// import React, { useState, useContext, useEffect, useRef } from 'react';
// import './ImageUpload.css';
// import { ImageContext } from '../context/ImageContext';

// const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'user_uploads'); // ✅ Change to your preset

//   const response = await fetch('https://api.cloudinary.com/v1_1/dckj5brue/image/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();
//   if (data.secure_url) {
//     return data.secure_url;
//   } else {
//     throw new Error(data.error?.message || 'Upload failed');
//   }
// };

// const ImageUpload = () => {
//   const [hover, setHover] = useState(false);
//   const { setImage } = useContext(ImageContext);
//   const [imageFile, setImageFile] = useState(null);
//   const imageFileRef = useRef(null);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const cloudUrl = await uploadImage(file);
//       sessionStorage.setItem('image', cloudUrl);
//       setImage(cloudUrl);
//       alert('Image uploaded successfully!');
//     } catch (err) {
//       alert('Upload failed: ' + err.message);
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = reader.result;
//       sessionStorage.setItem('imagePreview', base64); // Optional preview
//     };
//     reader.readAsDataURL(file);

//     setImageFile(file);
//   };

//   const handleRemove = () => {
//     setImage(null);
//   };

//   useEffect(() => {
//     const base64 = sessionStorage.getItem('image');
//     if (base64) setImage(base64);
//   }, [setImage]);

//   useEffect(() => {
//     if (imageFile) {
//       sessionStorage.setItem('imageName', imageFile.name);
//     }
//   }, [imageFile]);

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//     </div>
//   );
// };

// export default ImageUpload;

// import React, { useRef } from 'react';
// import './ImageUpload.css'; 

// function ImageUpload({ image, setImage }) {
//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleRemove = () => {
//     setImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; 
//     }
//   };

//   return (
//     <div className="image-upload-container">
//       {image ? (
//         <>
//           <img src={image} alt="Preview" className="image-preview" />
//           <button type="button" className="remove-button" onClick={handleRemove}>
//             Remove
//           </button>
//         </>
//       ) : (
//         <label className="upload-label">
//           <div className="upload-placeholder">
//             <div className="upload-heading">Upload Photo</div>
//             <div className="upload-text">Click to upload a photo</div>
//             <div className="upload-subtext">JPG, PNG, max 5MB</div>
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             className="file-input"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//           />
//         </label>
//       )}
//     </div>
//   );
// }

// export default ImageUpload;


// import React, { useState, useContext, useEffect, useRef } from 'react';
// import './ImageUpload.css';
// import { ImageContext } from '../context/ImageContext';

// const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'user_uploads'); // Replace with your Cloudinary preset

//   const response = await fetch('https://api.cloudinary.com/v1_1/dckj5brue/image/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();
//   if (data.secure_url) {
//     return data.secure_url;
//   } else {
//     throw new Error(data.error?.message || 'Upload failed');
//   }
// };

// const ImageUpload = () => {
//   const [imagePreview, setImagePreview] = useState(null);
//   const { setImage } = useContext(ImageContext);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const storedUrl = sessionStorage.getItem('image');
//     const preview = sessionStorage.getItem('imagePreview');
//     if (storedUrl) setImage(storedUrl);
//     if (preview) setImagePreview(preview);
//   }, [setImage]);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith('image/')) return;

//     try {
//       const cloudUrl = await uploadImage(file);
//       sessionStorage.setItem('image', cloudUrl);
//       setImage(cloudUrl);
//       // alert('Image uploaded successfully!');
//     } catch (err) {
//       alert('Upload failed: ' + err.message);
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = reader.result;
//       sessionStorage.setItem('imagePreview', base64);
//       setImagePreview(base64);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemove = () => {
//     setImage(null);
//     setImagePreview(null);
//     sessionStorage.removeItem('image');
//     sessionStorage.removeItem('imagePreview');
//     fileInputRef.current.value = '';
//   };

//   return (
//     <div className="image-upload-container">
//       {imagePreview ? (
//         <>
//           <img src={imagePreview} alt="Preview" className="image-preview" />
//           <button type="button" className="remove-button" onClick={handleRemove}>
//             Remove
//           </button>
//         </>
//       ) : (
//         <label className="upload-label">
//           <div className="upload-placeholder">
//             <div className="upload-heading">Upload Photo</div>
//             <div className="upload-text">Click to upload a photo</div>
//             <div className="upload-subtext">JPG, PNG, max 5MB</div>
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="file-input"
//             ref={fileInputRef}
//           />
//         </label>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

import React, { useState, useContext, useEffect, useRef } from 'react';
import './ImageUpload.css';
import { ImageContext } from '../context/ImageContext';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'user_uploads'); // ✅ Use your Cloudinary preset

  const response = await fetch('https://api.cloudinary.com/v1_1/dckj5brue/image/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error(data.error?.message || 'Upload failed');
  }
};

const ImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { setImage } = useContext(ImageContext);
  const fileInputRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await processImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await processImage(file);
    }
  };

  const processImage = async (file) => {
    try {
      const cloudUrl = await uploadImage(file);
      sessionStorage.setItem('image', cloudUrl);
      setImage(cloudUrl);
    } catch (err) {
      alert('Upload failed: ' + err.message);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      sessionStorage.setItem('imagePreview', base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setImage(null);
    setImagePreview(null);
    sessionStorage.removeItem('image');
    sessionStorage.removeItem('imagePreview');
    fileInputRef.current.value = '';
  };

  useEffect(() => {
    const storedUrl = sessionStorage.getItem('image');
    const preview = sessionStorage.getItem('imagePreview');
    if (storedUrl) setImage(storedUrl);
    if (preview) setImagePreview(preview);
  }, [setImage]);

  return (
    <div
      className={`image-upload-container ${isDragging ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {imagePreview ? (
        <>
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <button type="button" className="remove-button" onClick={handleRemove}>
            Remove
          </button>
        </>
      ) : (
        <label className="upload-label">
          <div className="upload-placeholder">
            <div className="upload-heading">Upload Photo</div>
            <div className="upload-text">Click or drag & drop</div>
            <div className="upload-subtext">JPG, PNG, max 5MB</div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
            ref={fileInputRef}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;


