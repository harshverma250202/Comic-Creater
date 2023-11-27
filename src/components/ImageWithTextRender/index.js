import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Rect, Group } from 'react-konva';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Typography, Input, Button } from '@mui/material';
import { ComicContext } from '../../utils/ContexApi/ComicContext';
import { useContext } from 'react';

const ImageWithText = ({ ImageUrl, Prompt, PanelNumber }) => {
    const { reGenerateImage } = useContext(ComicContext);
    const [stageSize, setStageSize] = useState({ width: 512, height: 512 });
    const [textObjects, setTextObjects] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [presentText, setPresentText] = useState('Sample Text');
    const stageRef = useRef();




    // image size is given 512*512 so remove this
    //   useEffect(() => {
    //     const handleResize = () => {
    //       const containerWidth = window.innerWidth * 0.8; // Adjust as needed
    //       const containerHeight = window.innerHeight * 0.8; // Adjust as needed
    //       // Set stage dimensions based on container size
    //       setStageSize({ width: containerWidth, height: containerHeight });
    //     };

    //     // Initial sizing
    //     handleResize();

    //     // Update size on window resize
    //     window.addEventListener('resize', handleResize);

    //     // Cleanup on component unmount
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    //   }, []);

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
                text: presentText,
            },
        ]);
    };

    const handleExportToImage = () => {
        if (stageRef.current) {
            try {
                const dataURL = stageRef.current.toDataURL();

                // Create a link element
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'image_with_text.png';

                // Append the link to the document and trigger a click event
                document.body.appendChild(link);
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error exporting to image:', error);
            }
        }
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
                {/* button to Regenerate Image */}
                <Button variant="contained" color="success" style={{ marginBottom: '10px' }} onClick={() => reGenerateImage(PanelNumber - 1)}>
                    Regenerate Image
                </Button>
            </Box>

            <Stage width={stageSize.width} height={stageSize.height} onClick={handleStageClick} ref={stageRef}>
                <Layer>
                    {/* Background Image */}
                    {backgroundImage && <Rect width={stageSize.width} height={stageSize.height} fillPatternImage={backgroundImage} />}

                    {/* Render text objects */}
                    {textObjects.map((textObject, index) => (
                        <Group key={index}>
                            <Text
                                x={textObject.x}
                                y={textObject.y}
                                text={textObject.text}
                                fontSize={16}
                                draggable
                            />
                        </Group>
                    ))}
                </Layer>
            </Stage>

            <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} style={{ marginTop: '10px' }}>
                <Typography variant="h6">Change Text</Typography>
                <Input placeholder="Change Text to add" style={{ margin: '5px' }} type="text" value={presentText} onChange={(e) => setPresentText(e.target.value)} />
                <Button variant="contained" color="error" style={{ marginTop: '10px' }} onClick={() => setTextObjects([])}>
                    Clear Text
                </Button>

                {/* PDF Export Button */}
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleExportToImage}>
                    Export as Image
                </Button>


            </Box>

        </Box>
    );
};

export default ImageWithText;
