import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/pages/login';
import Registration from './components/pages/registration';
import Mainpage from './components/mainpage';
import Disk from './components/pages/disk';
import Shared from './components/pages/shared';
import Rename from './components/pages/renameFile';
import Upload from './components/pages/uploadFile';
import Access from './components/pages/changeAccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='registration' element={<Registration/>}/>
        <Route path='disk' element={<Disk/>}/>
        <Route path='shared' element={<Shared/>}/>
        <Route path='renameFile' element={<Rename/>}/>
        <Route path='uploadFile' element={<Upload/>}/>
        <Route path='changeAccess' element={<Access/>}/>
      </Routes>
  	</BrowserRouter>
  );
}

export default App;
