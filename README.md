## Solution description

The solution is based on three components

### Summary Data Structure
This data in memory struct keeps the data related to games in a sorted way, uses a two dimension matrix with the dimensions (score,names) and uses binary search in order to insert new games sorted based on the score and the name of the teams, additionally it exposes the methods add, update and remove as well as an array with the sorted summary of games.

### Custom Hook useDashboard
There is a custom hook that expose the methods add, update, remove and an array with games sorted, the main goal of this hook is to serve like facade and a way of decupling the data structure from the UI, hiding the complexity of the operations, the way it can be used by UI components is described below.

const [games, addGame, removeGame, updateGame] = useDashboard();

### Dashboard Viewer
This component is used to show the functionality required by the challenge and in order to show the diferent operations, I created it in a way that shows the adding, update and delete operations in a secuential order using timers will show operations below so the sorting of the games can be checked just calling the app http://localhost:3000/ below I attached the images of the operations.

#### Adding games [col-eng, arg-usa, ita-ger, fra-bra]

#### Game udpdate [colombia 2 -1 england]

#### Game udpdate [france 5 -0 brasil]

#### Game finished [italy 0 -0 germany]


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

