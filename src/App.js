import PageTitle from "./components/PageTitle";
import './app.scss';
import style from './styles/modules/app.module.scss';
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <>
    <div className="container">
      <PageTitle>Todo List</PageTitle>
      <div className={style.app_wrapper}>
        <AppHeader/>
        <AppContent/>
      </div>
    </div>
    <Toaster position="bottom-right" toastOptions={{
      style:{
        fontSize:'1.4rem',
      },
    }}
    />
    </>
  );
}

export default App;
