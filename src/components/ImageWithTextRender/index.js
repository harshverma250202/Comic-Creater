import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import { Box, Typography, } from '@mui/material';

const ImageWithText = ({ ImageUrl, Prompt, PanelNumber }) => {
    const [stageSize, setStageSize] = useState({ width: 500, height: 500 });
    const [textObjects, setTextObjects] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = window.innerWidth * 0.8; // Adjust as needed
            const containerHeight = window.innerHeight * 0.8; // Adjust as needed

            // Set stage dimensions based on container size
            setStageSize({ width: containerWidth, height: containerHeight });
        };

        // Initial sizing
        handleResize();

        // Update size on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const imageObj = new window.Image();
        imageObj.src = ImageUrl;

        imageObj.onload = () => {
            setBackgroundImage(imageObj);
        };
    }, [ImageUrl]);

    const handleStageClick = (e) => {
        const stage = e.target.getStage();
        const position = stage.getPointerPosition();

        setTextObjects((prevTextObjects) => [
            ...prevTextObjects,
            {
                x: position.x,
                y: position.y,
                text: 'Your text here',
            },
        ]);
    };

    return (
        <Box>
            <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} style={{ marginBottom: '10px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                    Panel {PanelNumber}
                </Typography>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    Input Prompt: {Prompt}
                </Typography>
            </Box>

            <Stage width={stageSize.width} height={stageSize.height} onClick={handleStageClick}>
                <Layer>
                    {/* Background Image */}
                    {backgroundImage && (
                        <KonvaImage
                            image={backgroundImage}
                            width={stageSize.width}
                            height={stageSize.height}
                        />
                    )}

                    {/* Render text objects */}
                    {textObjects.map((textObject, index) => (
                        <Text
                            key={index}
                            x={textObject.x}
                            y={textObject.y}
                            text={textObject.text}
                            fontSize={16}
                            draggable
                        />
                    ))}
                </Layer>
            </Stage>

        </Box>
    );
};

export default ImageWithText;
