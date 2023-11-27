import React, { createContext, useContext, useEffect, useState } from 'react';
import { PopupContext } from '../PopUpContext';


const ComicContext = createContext();

const ComicProvider = ({ children }) => {

    const [inputs, setInputs] = useState(['']); // Initialize with one input
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleAddInput = () => {
        setInputs([...inputs, '']);
    };
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };


    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setImages([]);

        for (const input of inputs) {
            if (input) {
                try {
                    const image = await query({ inputs: input });
                    setImages(images => [...images, image]);
                } catch (err) {
                    setError('An error occurred while fetching images.');
                    console.error('API error:', err);
                    break;
                }
            }
        }

        setLoading(false);
    };

    const query = async ({ inputs }) => {
        const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
        const headers = {
            "Accept": "image/png",
            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", // Replace with your actual API key
            "Content-Type": "application/json"
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ inputs })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.blob();
    };

    
  //ALL CONTEXT VALUES WHICH ARE EXPORTED
  const contextValues = {
    inputs,
    setInputs,
    images,
    setImages,
    loading,
    setLoading,
    error,
    setError,
    handleAddInput,
    handleSubmit,
    handleInputChange,


  };
  return <ComicContext.Provider value={contextValues}>{children}</ComicContext.Provider>;
};

export { ComicContext, ComicProvider };