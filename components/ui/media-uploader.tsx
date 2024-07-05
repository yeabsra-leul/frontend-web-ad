'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
const API_BASE_URL = '/api/ad';
interface FileWithPreview extends File {
  preview: string;
}

interface ImageUploaderProps {
  onUploadComplete: (uploadedFile: any) => void;
  imageLink:string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete,imageLink }) => {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [imageUrl, setUpUrl] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const selectedFile = acceptedFiles[0];
    setFile(Object.assign(selectedFile, {
      preview: URL.createObjectURL(selectedFile)
    }));
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
      onUploadComplete(data.result);
      setUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
      setFile(null);
      setUploaded(false);
    }
    if (!file && imageUrl !== '') {
      //URL.revokeObjectURL(file.preview);
      setFile(null);
      setUploaded(false);
      setUpUrl('');
    }
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);
  useEffect(() => {
    if (imageLink !== '') {
      setUpUrl(imageLink);
      setUploaded(true);
    }
  }, [imageLink]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: uploaded
  });

  return (
    <div>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <p>Drop the file here...</p> :
          <p>{uploaded ? "File uploaded" : "Drag 'n' drop a file here, or click to select a file"}</p>
        }
      </div>
      {file && (
        <div style={styles.previewContainer}>
          <div key={file.name} style={styles.preview}>
            <Image
              src={file.preview}
              alt={file.name}
              style={styles.image}
              width={100}
              height={100}
            />
            <p>{file.name}</p>
          </div>
        </div>
      )}
      {file === null && imageUrl !== '' && (
        <div style={styles.previewContainer}>
          <div style={styles.preview}>
            <Image
              src={imageUrl}
              alt={imageUrl}
              style={styles.image}
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
      <div style={styles.buttons}>
        {file && !uploading && !uploaded && (
          <button onClick={handleUpload} style={styles.button}>Upload</button>
        )}
        {file && !uploading && (
          <button onClick={resetFile} style={styles.button}>Reset</button>
        )}
        {file === null && imageUrl !== '' && (
          <button onClick={resetFile} style={styles.button}>Reset</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #0087F7',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border .3s ease-in-out',
  } as React.CSSProperties,
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
  } as React.CSSProperties,
  preview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
  } as React.CSSProperties,
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    objectFit: 'cover',
  } as React.CSSProperties,
  buttons: {
    marginTop: '20px',
  } as React.CSSProperties,
  button: {
    marginRight: '10px',
    padding: '10px 20px',
    backgroundColor: '#0087F7',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  } as React.CSSProperties
};

export default ImageUploader;
