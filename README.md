# hilbertProject

Synopsis and goal: The goal of the project is to create an artistic experience by converting an image to a unique sound pattern. This will be done by converting each pixel's RGB values to a frequency and playing a sound that matches that frequency when the mouse is clicked over that pixel. More specifically, we will be having a "spotlight", where a radius of pixels will generate a frequency, and this frequency is averaged. Therefore, dragging the mouse over the image will create gradual differences in the sound to create a more interesting, enjoyable experience.

Applications and Consequences: Apart from the concept of connecting our senses and having art create other art (each visual art piece produces a unique musical pattern), we highlight the interconnectedness of our sight and hearing. We hope that the project can aid people with visual impairments because they will be able to experience visual art in a new way (and perhaps the app can be used to develop sight through pitch association - create wearable glasses). With some minor tweaks, the algorithm can be made to sense depth perception (i.e. playing a higher pitch when something is nearby in the image).

Libraries that need to be leveraged:
- Convert an image into an array of pixels with RGB values.
- Given a frequency, play a sound matching that frequency.

## Instructions
Change directory project
run `npm i` or `yarn`
After run `npm run start` or `yarn start`