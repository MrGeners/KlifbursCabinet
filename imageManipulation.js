function trimTransparency(oldImage) {
    // Create a canvas element
    const canvas = document.createElement("canvas");

    // Set the canvas width and height to match the image
    canvas.width = oldImage.width;
    canvas.height = oldImage.height;

    // Get the canvas context
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    ctx.drawImage(oldImage, 0, 0);

    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Find the top row of the image that has no transparent pixels
    let topRow = 0;
    for (let y = 0; y < imageData.height; y++) {
        let hasOpaquePixel = false;
        for (let x = 0; x < imageData.width; x++) {
            const index = (y * imageData.width + x) * 4;
            if (imageData.data[index + 3] !== 0) {
                hasOpaquePixel = true;
                break;
            }
        }
        if (hasOpaquePixel) {
            topRow = y;
            break;
        }
    }

    // Find the bottom row of the image that has no transparent pixels
    let bottomRow = imageData.height - 1;
    for (let y = imageData.height - 1; y >= 0; y--) {
        let hasOpaquePixel = false;
        for (let x = 0; x < imageData.width; x++) {
            const index = (y * imageData.width + x) * 4;
            if (imageData.data[index + 3] !== 0) {
                hasOpaquePixel = true;
                break;
            }
        }
        if (hasOpaquePixel) {
            bottomRow = y;
            break;
        }
    }

    // Calculate the new height of the image without the transparent rows
    const newHeight = bottomRow - topRow + 1;

    // Create a new canvas with the new dimensions
    const newCanvas = document.createElement("canvas");
    newCanvas.width = imageData.width;
    newCanvas.height = newHeight;

    // Draw the cropped image onto the new canvas
    const newCtx = newCanvas.getContext("2d");
    newCtx.drawImage(
        canvas,
        0,
        topRow,
        imageData.width,
        newHeight,
        0,
        0,
        imageData.width,
        newHeight
    );

    // Create a new image from the new canvas
    const newImage = new Image();
    newImage.src = newCanvas.toDataURL();

    // Return the new image
    return newImage;

}