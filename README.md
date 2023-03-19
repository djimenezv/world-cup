## Solution description

The solution is based on three components and was develop trying to be as efficient as possible so for some of the heavy process like keeping the list of games sorted, the binary search was implemented as well as the use of dictionaries to having a good performance even with a high amount of games running, the testing was added specially for the process operations like adding, update, remove games and exception handling for situations like trying to have two matches runing with same teams at the same time. 

### Summary Data Structure
This data in memory struct keeps the data related to games in a sorted way, uses a two dimension matrix with the dimensions (score,names) and uses binary search in order to insert new games sorted based on the score and the name of the teams, additionally it exposes the methods add, update and remove as well as an array with the sorted summary of games.

### Custom Hook useDashboard
There is a custom hook that expose the methods add, update, remove and an array with games sorted, the main goal of this hook is to serve like facade and a way of decupling the data structure from the UI, hiding the complexity of the operations, the way it can be used by UI components is described below.

const [games, addGame, removeGame, updateGame] = useDashboard();

### Dashboard Viewer
This component is used to show the functionality required by the challenge and in order to show the diferent operations, I created it in a way that shows the adding, update and delete operations in a secuential order using timers will show operations below so the sorting of the games can be checked just calling the app http://localhost:3000/ after follow running steps in next section, below I attached the images of the operations.

#### Adding games [col-eng, arg-usa, ita-ger, fra-bra]
![image](https://user-images.githubusercontent.com/18702110/226203074-e763beee-472d-47cd-9053-24b2405fd753.png)

#### Game udpdate [colombia 2 -1 england]
![image](https://user-images.githubusercontent.com/18702110/226203168-c247321c-c59d-4644-bf04-0a9b916392cd.png)

#### Game udpdate [france 5 -0 brasil]
![image](https://user-images.githubusercontent.com/18702110/226203209-746b450e-3474-431d-8457-19bd6e9faec3.png)

#### Game finished [italy 0 -0 germany]
![image](https://user-images.githubusercontent.com/18702110/226203248-fe73df3b-f3be-4224-a646-f4cbb30d8619.png)


## How to run the solution

In the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## How to run tests

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

