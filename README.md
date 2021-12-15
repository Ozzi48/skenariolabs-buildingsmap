BuildinsMap

An application used to check buildings on the map by address and add, update or delete this buildings in profile. Built with React, Redux, JavaScript, and Styled Components.

## Project Screen Shot(s)
![project screen 1](https://finstudy.lt/GitScreen1.png)

## Installation and Setup Instructions 

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000`  

## Reflection

This was a 2 day project build to show skills in Redux and React. The task was to create a React frontend application with Redux store to
allow the user to add, view, update, edit their portfolio buildings. Users should have possibility to add new buildings with parameters such as building name, street, house number, country. Before saving the building into the Redux store application must get coordinates for the provided building via the forward-geocoding https://www.geoapify.com/geocoding-api api. Users should be able to see all of their buildings with enriched coordinates in portfolio, and be able to edit the building's details if need be.  