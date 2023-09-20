# eCommerce-Application
The final task the team "JSCRackers" course JavaScript/Front-end 2023Q1 [RS School](https://app.rs.school/).

# Description
An eCommerce store web application  with utilizes the API client for CommerceTools.
This project is developed with the technology stack: TypeScript, Webpack, Sass, ESLint, Prettier, Husky, Jest and implements MVC pattern.

# Functionalities
- account login and registration  of users;
- view and edit user profiles;
- products categories;
- search, sorting and filtering options for on attributes such as price range, brand, color, size, or other relevant characteristics;
- detailed product description;
- add items to the basket, displaying a list of items added to the basket, removing  items from the basket;
- responsive application design.

*In our store you will find а shoes in the following categories:
**Summer** -  shoes for summer walks;
**Rain** -  shoes for rainy weather;
**Snow** - shoes for cold winters;
**Office**  - shoes for official business meetings;
**Travel** - shoes for outdoor activities.
The color palette and size chart are also diverse, you can choose shoes of the right color and size by applying filtering for a faster search.
Choose proven shoes - read reviews from real feedback  on our website, in the **Feedback** section.*

# Getting started
1. Clone the repository running <br>
```git clone https://github.com/Dmitriy3305/eCommerce-Application.git``` <br>
in your local folder

2. Switch your **Git** branch to ```develop``` running
```git checkout develop```

3. Install all dependencies running <br>
```npm install``` <br>
in project root folder

4. Initialize Husky running <br>
```npm run prepare``` <br>
in project root folder

5. For each new feature create new branch from ```develop``` or your feature branch

# Avaliable scripts
- ## Initializing 
  To initialize **Husky** git hooks run <br>
  ```npm run prepare```
- ## Dev server
  To run **Webpack**'s dev server use<br>
  ```npm run server```<br>
  Server will be avaliable at ```localhost:8000```
- ## Project build
  - To build project in development mode (with sourcemaps avaliable) run<br>
    ```npm run build:dev```
  - To build project in production mode (targetting browsers by ```.browserslistrc```) run<br>
  ```npm run build:prod```<br>
**Note:** Build output goes in ```dist``` folder
- ## Code formatting
  Ensure uniforming your code style using these commands:
  - To run **Prettier** use<br>
    ```npm run format```
  - To run **ESLint** with ```airbnb-typescript config```, find and fix linter errors use<br>
    ```npm run lint```<br>
  **Note**: These scripts run automatically with **Husky** before your commits
- ## Testing
  To run tests avaliable in project with **Jest** use<br>
  ```npm run test```

**Note:** all scripts should be run in project's **root** folder


