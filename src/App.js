import PageTitle from "./components/PageTitle";
import './app.scss';
import style from './styles/modules/app.module.scss';
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";

function App() {
  return (
    <div className="container">
      <PageTitle>Todo List</PageTitle>
      <div className={style.app_wraper}>
        <AppHeader/>
        <AppContent/>
      </div>
    </div>
  );
}

export default App;
