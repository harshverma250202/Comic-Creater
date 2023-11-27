import React, { useState } from 'react';
import {Input} from '@mui/material';
import ImageWithText from '../../components/ImageWithTextRender';

const ComicCreator = () => {
    const [inputs, setInputs] = useState(Array(10).fill(''));
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setImages([]);
        console.log("inputs :", inputs);
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

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {inputs.map((input, index) => (
                    <Input 
                        key={index} 
                        type="text" 
                        value={input} 
                        onChange={(e) => handleInputChange(index, e.target.value)} 
                        placeholder={`Panel ${index + 1} text`} 
                    />
                ))}
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Create Comic'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="comic-panel">
                {images.map((image, index) => (



                    // <img key={index} src={URL.createObjectURL(image)} alt={`Comic Panel ${index + 1}`} />
                    <>
                        <ImageWithText ImageUrl={URL.createObjectURL(image)} />
                    </>
              
              
              
              ))}
            </div>
        </div>
    );
};

export default ComicCreator;