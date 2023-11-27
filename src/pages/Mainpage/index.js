import React, { useState } from 'react';
import { Input, Button, CircularProgress, Typography, Box } from '@mui/material';
import ImageWithText from '../../components/ImageWithTextRender';
import { ComicContext } from '../../utils/ContexApi/ComicContext';
const ComicCreator = () => {
    const { inputs, images, loading, error, handleSubmit, handleAddInput, handleInputChange } = React.useContext(ComicContext);
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        padding: '20px',
    };

    const inputStyle = {
        marginBottom: '10px',
        dispaly: 'flex',
        width: '80vw'
    };

    const buttonStyle = {
        marginTop: '10px',
        marginBottom: '10px',
    };

    const errorStyle = {
        color: 'red',
        marginTop: '10px',
    };

    const formStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    };
    const imageContainer = {
        display: 'flex',
        flexDirection: 'column',
    }
    const imageBox = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        margin: '10px',
    }

    return (
        <Box style={containerStyle}>

            {/* heading for the page Create Comic */}
            <Typography variant="h3" style={{ marginBottom: '10px' }}>
                Create Comic
            </Typography>

            <form style={formStyle} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {inputs.map((input, index) => (
                    <Input
                        key={index}
                        type="text"
                        value={input}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder={`Panel ${index + 1} Prompt text`}
                        style={inputStyle}
                    />
                ))}
                <Button type="submit" disabled={loading} variant="contained" style={buttonStyle}>
                    {loading ? <CircularProgress size={24} /> : 'Create Comic'}
                </Button>
            </form>
            <Button onClick={handleAddInput} variant="outlined" style={buttonStyle}>
                Add Input Prompt Box
            </Button>
            {error && <Typography variant="body1" style={errorStyle}>{error}</Typography>}
            <div className="comic-panel" style={imageContainer} >
                {images.map((image, index) => (
                    <>
                        <div style={imageBox} >
                            <ImageWithText key={index} ImageUrl={URL.createObjectURL(image)} Prompt={inputs[index]} PanelNumber={index + 1} />
                        </div>

                    </>
                ))}
            </div>

            {/* Made By Harsh Verma Github: harshverma250202 */}
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Made By @Harsh Verma, Github: harshverma250202
            </Typography>
        </Box>
    );
};

export default ComicCreator;
