# eCommerce-Application
final task JSCRackers

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


