# Bin Buddies
While waste disposal and recycling is an easy and achievable way everyone can lesson their carbon footprint, a survey in the USA revealed that 62% of respondents worry their lack of knowledge is causing them to recycle incorrectly. Many admit that they want to be able to recycle properly, but either lack the effort to conduct research or are embarrassed to ask for help. We wanted to create a solution to make recycling more intuitive, accessible, and fun.

User's can either upload an image of what they want to throw away, or be guided through a flow of questions to manually find the object. Our app then detects the object, and categorizes it into a category of waste such as electronics, containers, bottles, etc. Users are then guided through a flow of questions based on the category to better identify the object's state, such as the specific material, whether it's dry/wet, its SPI number, etc. Finally, our app displays how they can best recycle the object, and possibly give suggestions on how to reuse it or local waste disposal centres depending on the specific item.

Bin Buddies is a scalable full-stack web app that was designed for mobile screen sizes. On the front-end, we primarily used React, and served our app from a Node Express server. Our app makes use of 2 open source apis:
Google Cloud Vision API to detect + extract objects from a user uploaded image of what is being thrown out, and
Socrata Open Data API to query the Waste and Recycling Material List (from the city of Edmonton). As Bin Buddies gains users in new areas, new data sets can be added and queried.

Slide Deck: https://docs.google.com/presentation/d/1H08Loh_2Tw90QNA1SXf87gEGCIPzDvbDMb0ArZEJ8gs/edit?usp=sharing

# Try out our project!
In the project directory, run:

### `npm install`
### `npm start`

you can then access the project at http://localhost:9000/

(google cloud api json and keys must be present to use the google cloud vision api)

Run the following command, and replace [PATH] with the file path of the JSON file that contains your service account key. This variable only applies to your current shell session, so if you open a new session, set the variable again.

### `export GOOGLE_APPLICATION_CREDENTIALS=[PATH]`
