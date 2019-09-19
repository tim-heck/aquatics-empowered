# Aquatics Empowered

H2Whoa is an web application that will raise awareness of Aquatics Empowered as well as rehabilitative uses of water therapy in rural communities. This was achieved through a story landing page where the user can upload their story of water therapy as well as photos of their story. There is an about page that will have details on Aquatics Empowered, Hot Tubbing for Hope, Troy Derheim, and the work that is being done to raise awareness of water therapy. The user will have the ability to search and filter the stories on the story page feed. The admin will have the ability to hide and add new categories, as well as delete and edit stories added by users. Admins will also be able to view, edit, and delete any posts that users have ‘flagged.’ They will be able to access these posts from the admin page.

## Built With

- Javascript
- HTML
- CSS
- Semantics UI
- Material UI
- React.js with Redux and Sagas
- React Quill (rich text editor)
- Node.js
- Postgres
- AWS S3 and IAM
- Sweet Alerts API

## Getting Started

Installing (CLI) dependancies will use:
- [Brew](https://brew.sh)
- [Npm] (https://www.npmjs.com/)

Development database solution:
- [postgreSQL](https://www.postgresql.org)

Steps to get the development environment running.

1. Download this project
2. `brew install awscli` {executing this command will install AWS CLI on local machine}
3. `npm install` {executing this command will use Node Package Manager to install dependancies}
4. `npm start` {executing this command will 'spin up' or start the application via localhost:3000 url}


## Screen Shot

![Screen Capture](images/H2WOAHSCREENCAP.png)


## Features 
- [x] Add Stories with Images
- [x] Upload Images to AWS S3
- [x] Delete Stories and Images
- [x] Administrative Portal
- [x] Story Filter
- [x] Search Bar

## Usage

The intent of this application is that users can come to H2WOAH! to explore the stories posted by others, post their own stories, and learn how to participate directly in the Hot Tubbing For Hope Charity event.

Upon first entry to the web app, a new user will be greeted by a 'pop-up' window that displays a brief overview of functions and intent of the application. This modal window will be overlayed on the 'stories' or defacto home page for the application.

At the top of the desktop-view of the application a navigation bar, search icon, and filter icon will display prominently. These navigation tools will be responsive and will display differently on a mobile-view of the application. This mobile-view will display the navigation tools as a hidden list that shows only when a user clicks the hamburger menu icon that displays on the top left of the page - the search and filter icons will move up to the same row as this hamburger icon.

On the Stories page, a user will be able to view any story that has been posted to H2WOAH! and will see a card fixed to the top left of the gallery that serves as a 'call to action' card. This card will operate as another route to the Add a Story page.

The Add a Story page includes a form, AWS S3 photo upload functionality, a terms and conditions link for the required legal documentation for public photo sharing privileges. This form includes a rich text editor.

## Administrative Usage

Administrative users will have several dedicated features to moderate the content of the application.

1. Portal Login with password protection

2. Story Category Management
    - Admin users can add, and hide categories from user view
    - Deleting categories is not supported at this release

3. Flagged Post Management
    - Admin users will have a portal list view of any posts users (inc. other admins) have flagged
    - Editing for resubmission supported by 'Update and Unflag' button
    - Deleting flagged post from database is supported in this release

4. Stories Page Admin View
    >>> Story cards on the Stories Page will render with additional button-operated options
        - Editing Stories for content or site philosophy violation via 'Edit Story' button
        - Delete Story card that has been flagged, or violates site philosophy 'Delete Story' button



## Deployment
To try this app yourself go to (https://INSERT HERE.herokuapp.com/);

View the google document regarding Heroku Deployment for further instruction and information

## Authors
* Tim Heck
* Adam Hay
* Jake Knecht
* Molly Ellison 

## Acknowledgments
* Troy Derheim
* Mary Mosman
