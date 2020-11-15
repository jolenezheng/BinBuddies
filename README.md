# Bin Buddies
While waste disposal and recycling is an easy and achievable way everyone can lesson their carbon footprint, a survey in the USA revealed that 62% of respondents worry their lack of knowledge is causing them to recycle incorrectly. Many admit that they want to be able to recycle properly, but either lack the effort to conduct research or are embarrassed to ask for help. We wanted to create a solution to make recycling more intuitive, accessible, and fun.

User's can either upload an image of what they want to throw away, or be guided through a flow of questions to manually find the object. Our app then detects the object, and categorizes it into a category of waste such as electronics, containers, bottles, etc. Users are then guided through a flow of questions based on the category to better identify the object's state, such as the specific material, whether it's dry/wet, its SPI number, etc. Finally, our app displays how they can best recycle the object, and possibly give suggestions on how to reuse it or local waste disposal centres depending on the specific item.

Bin Buddies is a scalable full-stack web app that was designed for mobile screen sizes. On the front-end, we primarily used React, and served our app from a Node Express server. Our app makes use of 2 open source apis:
Google Cloud Vision API to detect + extract objects from a user uploaded image of what is being thrown out, and
Socrata Open Data API to query the Waste and Recycling Material List (from the city of Edmonton). As Bin Buddies gains users in new areas, new data sets can be added and queried.

Slide Deck: https://docs.google.com/presentation/d/1H08Loh_2Tw90QNA1SXf87gEGCIPzDvbDMb0ArZEJ8gs/edit?usp=sharing

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
