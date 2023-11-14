# Bike Inventory Management

This application is built on Angular 16 and .NET Core 7.

You can access the deployed website [here.](https://bikeapp.fly.dev/login)

This solution consists of two projects: **CLIENT** (front-end) and **API** (back-end).

To run the project locally, please clone the repository in your local directory using the below command.
> git clone https://github.com/Vithushan322/BikeShop.git


## If you choose to run ***only*** the front-end application, navigate to the **CLIENT** folder and follow the following steps:
__Following steps are completed in Visual Studio Code.__

> [!NOTE]
> Before starting, make sure that you can run Angular 16 project locally. Refer [this link](https://kinsta.com/knowledgebase/install-angular/) if you need help.

1. Run `npm i` in the terminal to install the required packages from the _package.json_ file
2. As you are only running the front-end application, to connect to an API, replace ***apiUrl*** of both the environment files (.\src\environments) with ***'https://bikeapp.fly.dev/api/'***
3. Run `ng g -o` to build and automatically open the application in the default browser **OR** `ng s` to build and manually open using url
4. Use the following credentials to login to the application: **Email**: admin@gmail.com and **Password**: Admin
