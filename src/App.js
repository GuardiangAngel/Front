import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Auth';
import Register from './pages/login/Register';//delete
import Dashboard from './components/Dashboard';//delete

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Введите, пожалуйста, логин и пароль☺
        </p>
        <a
          className="App-link"
          href="./Register"
          target="_blank"
          rel="noopener noreferrer"
        >
          Регистрация
        </a>
        
        <Login />
      </header>
      <Register /> 
      <Dashboard /> 
    </div>
  );
}

export default App;
