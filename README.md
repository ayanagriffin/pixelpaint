# Pixel Paint!

Welcome to pixel paint! This app allows you to cycle through and choose an image: your blank canvas! Once you have found an image that you like, use the colors to fill each one of the pixels in. You can adjust the number of colors and the block size to make your artwork more/less detailed.

## Current Features

---

**Random Default Images**

The current loaded images are defaults. Using the "new image" button, the user can cycle through these default images to select which one they'd like to paint

**Color Factoring**

This program takes an image, sections it out into blocks then finds the average color of each block. After all average colors are found, these colors are compared to each other to see if any are similar enough to be considered the same color. This is done by comparing the RGB values of the colors, and if these values are within a specified distance from each other, they are considered the same color. This distance can be changes by the user using the "adjust number of colors" slider.

Each one of the final colors is then assigned a number which will be used in the template so that the user knows which color to use for each pixel. The actual colors are also displayed on the right side of the canvas; the user can click each of these colors to change the current color they are painting with.

**Painting Completion**

After the user is finished with their painting, they can click the "i'm done" button. This will remove the black borders around each square as well as the numbers. It will also display a gold star with a positive message to congratulate the user on finishing.

## Future Plans/Ideas

---

Add an instructions screen

---
