# Bike Inventory Management

This application is built on Angular 16 and .NET Core 7.

You can access the deployed website [here.](https://bikeapp.fly.dev/login)

This solution consists of two projects: **CLIENT** (front-end) and **API** (back-end).

To run the project locally, please clone the repository in your local directory using the below command.
> git clone https://github.com/Vithushan322/BikeShop.git


## If you choose to run ***only*** the front-end application, navigate to the **CLIENT** folder and follow the following steps:

> [!NOTE]
> Before starting, make sure that you can run Angular 16 project locally. Refer [this link](https://kinsta.com/knowledgebase/install-angular/) if you need help.

1. Run `npm i` in the terminal to install the required packages from the _package.json_ file
2. As you are **only** running the front-end application, to connect to an API, replace ***apiUrl*** in both the environment files (.\src\environments) with ***'https://bikeapp.fly.dev/api/'***
3. Run `ng g -o` to build and automatically open the application in the default browser **OR** `ng s` to build and manually open using url
4. Use the following credentials to login to the application: **Email**: admin@gmail.com and **Password**: Admin

> [!IMPORTANT]
> If the [weather widget](https://drive.google.com/file/d/1e0LW7IfmxDeBs0G2Kz9VX2Hh4MBLM7H2/view?usp=sharing) next to the user name in the nav bar is not showing up, please create an account @[openwaether](https://openweathermap.org/api) to get an API key and update the ***weatherAPIKey*** in both the environment files as above.

## To run the back-end application, navigate to the **API** folder (or open the project using the solution file) and follow the following steps:
*I would suggest doing below steps in Visual Studio*

1. Install the required nuget packages (Tools > NuGet Package Manager > Manage NuGet Package)
2. Run the project
3. You can check the available api by enabling ***launchBrowser*** in *launchSettings.json* or by importing [POSTMAN](https://www.postman.com/downloads/) collection from [here](https://drive.google.com/file/d/1v_7JrQ4NcUAWJLtyCY2LDhqli9Le3ecg/view?usp=sharing)

> [!IMPORTANT]
> If you are running both the projects locally please ***SKIP*** Step 2 in setting up the front-end application
