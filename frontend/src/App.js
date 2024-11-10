
import './App.css';
import EventList from './components/EventList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Calendar App</h1> </header>
      <main> <EventList /> </main>
    </div>
  );
}
//Functional CRUD system where users can add, view, update, and delete events. Each event must be stored in the in-memory database.

export default App;
