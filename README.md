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
* S3 buckets

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
* Also in AWS with 2 ec2 instances 

### Basic Design
* Node.js server serving the required APIs for all the required operations like getting the post, logging in to the users, etc.
* The database used was MongoDB Atlas Database Free tier.
* The collections were made for User and Post
* Mongoose was used for interaction with Node.js and Atlas. It provides a base solution for MongoDB that is easier to manage.
* The username is unique for the user
* The post can also contain images whose link is saved in the Database, and the original file is stored in the filesystem
* The endpoints were first verified using postman
  ![Postman screenshot](https://raw.githubusercontent.com/shioi/Blog-App/main/post.png)
* The user authentication was done using JWT to secure the endpoints.
* After all the endpoints worked, The frontend was implemented using React and Bootstrap.
* It is a basic CRUD application where react sends the HTTP requests using fetch and updates the states
* After verifying the application on the local machine, it was hosted through Render.com, which provides a free hosting service
* We hosted two applications, one for the backend serving APIs and one for the front end. 

### OUTPUT
![Postman screenshot](https://raw.githubusercontent.com/shioi/Blog-App/main/final.png)


### Future Enhancement
* Following
* Ranking of users based on the number of likes
* Comment section
* Serving Notification
* UI Improvement

## Authors

Saiyam Chettri
saiyum303@gmail.com
