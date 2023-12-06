# Project Title

FP - Blogs => Functional Programming Blogs

## Description

This is a simple blog application where users can post their blogs mainly about Free software and Functional programming. It welcomes all users to post their ideas without limits.

## Getting Started

### Dependencies

* MongoDB
* Express js
* React js
* Node js
* Bootstrap

### Running on the local system

* Go to the backend folder and perform ``` npm install ```
* Go to the frontend folder and perform ``` npm install ```
* Run ``` npm run dev ``` on backend
* For the frontend react app, run ``` npm start ```

### Live Application
* https://fg-blog-app.onrender.com/
* You can view the blogs without logging in or signing up
* Sign up for posting by logging to login -> signup
* Start posting by going to the post
* you can click on your profile to edit any post
* Can add images as the cover image

### Basic Design
* Node.js server serving the required APIs for all the required operations like getting the post, logging in the users, etc.
* The endpoints were first verified using postman
  ![Postman screenshot](https://raw.githubusercontent.com/shioi/Blog-App/main/post.png)
* The user authentication was done using JWT to secure the endpoints.
* After all the endpoints worked, The frontend was implemented using React and Bootstrap.
* It is a basic CRUD application where react sends the HTTP requests using fetch and updates the states

### OUTPUT
![Postman screenshot](https://raw.githubusercontent.com/shioi/Blog-App/main/final.png)


### Future Enhancement
* Following
* Ranking of users based on the amount of likes
* Comment section
* Serving Notification
* UI Improvement

## Authors

Saiyam Chettri
saiyum303@gmail.com
