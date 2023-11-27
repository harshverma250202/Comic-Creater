import React, { createContext, useContext, useEffect, useState } from 'react';
import { PopupContext } from '../PopUpContext';


const ComicContext = createContext();

const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
const API_KEY = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

const ComicProvider = ({ children }) => {


    const { openPopup, closePopup } = useContext(PopupContext);

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
                    openPopup('An error occurred while fetching images. ' + err.message, 'error');
                    console.error('API error:', err);
                    break;
                }
            }
        }
        if (error === '') {
            openPopup('Images fetched successfully!', 'success');
        }

        setLoading(false);
    };

    const query = async ({ inputs }) => {
        const headers = {
            "Accept": "image/png",
            "Authorization": `Bearer ${API_KEY}`,
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


    const reGenerateImage = async (index) => {
        const input = inputs[index];
        try {
            openPopup("Re-generating image...", 'info')
            const image = await query({ inputs: input });
            setImages(images => [...images.slice(0, index), image, ...images.slice(index + 1)]);
            openPopup("Image re-generated successfully!", 'success')
        } catch (err) {
            openPopup("Unable to re-generate image. Please try again later.", 'error')
            console.error('API error:', err);
        }

    }


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
        reGenerateImage,
    };
    return <ComicContext.Provider value={contextValues}>{children}</ComicContext.Provider>;
};

export { ComicContext, ComicProvider };