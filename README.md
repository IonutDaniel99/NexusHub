<div id="top"></div>

<!-- PROJECT LOGO -->
<br />

<h1 align="center">Nexus Hub</h1>
  <p align="center">
    <span>
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Logo"  height="28">
        <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Logo" width="109" height="28">
        <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Logo" width="109" height="28">
        <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" alt="Logo" width="82" height="28">
        <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Socket.io-010101?logo=socketdotio&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Radix%20UI-161618?logo=radixui&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Blueprint-137CBD?logo=blueprint&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Ant%20Design-0170FE?logo=antdesign&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Less-1D365D?logo=less&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Google%20Maps-4285F4?logo=googlemaps&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge" alt="Logo" height="28">
        <img src="https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=fff&style=for-the-badge  " alt="Logo" height="28">
    </span>
  </p>
  </br>
</div>


This project is a modular and dynamic web application designed to efficiently manage various microservices through a
backend built in NodeJS. The architecture encompasses multiple microservices, including Onboarding (user authentication
and registration), Weather (providing weather information), Console (In-Depth Details about all microservices messages
on UI), Service Status (checking microservice health), and more planned for future implementation.

## Demo Video

https://github.com/IonutDaniel99/NexusHub/assets/42089391/651d9f2d-1687-4595-956a-d2e920ace165

## Backend

The backend of this project is built in NodeJS using RestApi routes, Socket.IO connections and consists of multiple
microservices. The main microservices include:

- **Onboarding:** Manages user authentication, registration, and database operations.
- **Weather:** Provides weather information.
- **Console:** WIP
- **Service Status:** Checks the status of each microservice.

**New microservices will be added in the future.**

<details>
<summary><strong>Backend Start</strong></summary>

To start a specific microservice use one of the following command (CMD or PowerShell) in **"NexusHub-Backend"** folder:

  ```
  node src/<Service_Name>/start.js    | By Folder
  
  npm run startSerivces               |
  npm run startOnboarding             | By package.json scripts
  npm run startWeather                |
  ```

Or start all services by using:

  ```
  npm run startAll
  ```

</details>


<details>
<summary><strong>How to add new microservice on Backend</strong></summary>

- In "src/" folder, create a new unique folder with the name of microservice you want to have.
- Inside of that folder, create a **index.js** file and import this:

```js
  import express from 'express';
import {createServer} from 'http';
import cors from 'cors';

import {logger} from './src/utils/winston_logger.js';

const app = express();
const server = createServer(app);

const WEATHER_MICROSERVICE_PORT = <PORT_NUMBER>; //Unique port number - TODO fix in future to put it into a separate
    global file
    const SERVICE_NAME = 'NAME_OF_SERVICE';

    app.use(cors());

    app.get('/', (req, res) => {
        logger.info(`Someone join on ${SERVICE_NAME}`)
        res.sendStatus(200);
    });

    app.get('/status', (req, res) => {
        logger.info(`Someone check status for ${SERVICE_NAME}`)
        res.sendStatus(200);
    });
```

</details>

## Frontend

The frontend is developed using React with Vite and TypeScript. It is a dynamic, modular webpage where users can create,
delete, and arrange panels. Each panel is associated with a specific microservice from the backend, established through
REST requests or Socket.IO.

### Key Features

- Dynamic webpage with modular panels.
- Right-click context menu for each panel.
- Mosaic-like layout for arranging panels.
- Creation and deletion of panels.

<details>
<summary><strong>Frontend Start</strong></summary>

To start web app, use the following command (CMD or PowerShell) in **"NexusHub-Frontend"** folder:

  ```
  npm run vite
  ```

</details>

<details>
<summary><strong>How to add new microservice on Frontend</strong></summary>

- After the microservice was implemented in backend, check it for any errors, otherwise continue
- Change directory to "NexusHub-Frontend" folder
- Go to src/config.tsx and add the following line
  ```js
  export const <MicroserviceName>Url = "http://localhost:<MICROSERVICE_PORT>";
  ```
- Go to
    * **"src/panels/BackendPanels/<MICROSERVICE_NAME_FOLDER>/<REACT_Microservice_File>.tsx"**  -> Create a React Tsx
      file here if the panel will be connected to backend
    * **"src/panels/ClientPanels/<CLIENT_PANEL_FOLDER>/<REACT_PANEL_FILE>.tsx"**  -> Create a React Tsx file here if the
      panel will have functionalities only on client-side
- After file was created, create a react functional component. Example below:

```js
export function MicroserviceNamePanel() { //Example SettingsPanel
    return <div>ReactComponent or Custom Text</div>
}
```

- If the panel you`ve created its part of a backend microservice, follow Backend, else follow Frontend.
    * **Backend**: Go to "src/configs/BackendServicesConfig.tsx" and add the following line inside **SERVICES_CONFIG**
      object
      ```js
      import { Console, Temperature, User } from "@blueprintjs/icons";
      export const SERVICES_CONFIG: Record<string, IPanelConfig> = {
          "Onboarding": { "icon": <User />, "selectable": false },
          "Weather": { "icon": <Temperature />, "selectable": true },
          "Console": { "icon": <Console />, "selectable": true },
          ////ADD IT BELOW
          "MICROSERVICE_NAME": { "icon": <Console />, "selectable": true }, //Icon -> unique icon for ur microservice, Selectable -> if can be selected as a panel or not
      }
      ```
    * **Frontend**: Go to "src/configs/ClientServicesConfig.tsx" and add the following line
      ```js
      export const CLIENT_SERVICES_CONFIG: Record<string, IPanelConfig> = {
          "Settings": { "icon": <CogIcon />, "selectable": false },
          "PANEL_NAME" : { "icon": <CogIcon />, "selectable": false } //Icon -> unique icon for ur microservice, Selectable -> if can be selected as a panel or not
      }
      
      export const CLIENT_PANELS_OBJECT = ["Settings", "PANEL_NAME"] // And Here for context mapper
      ```
- In the end, go to "src/configs/GlobalsPanel.tsx" and add Name of the service and JSX component to render as below

```js
export const GLOBAL_PANELS_CONFIG: Record<string, ReactElement> = {
    "Onboarding": <OnboardingPanel/>,
    "Weather": <WeatherPanel/>,
    "Console": <ConsolePanel/>,
    "Settings": <SettingsPanel/>
    //Add belowe here
    "PANEL_NAME": <MicroserviceNamePanel/>
};
```

- After all is settled, when you right click in UI on a "Free" Panel, you should see your microservice as a button and a
  red/yellow/green dot which represent the service status

</details>

