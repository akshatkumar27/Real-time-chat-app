import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat/>}  />
      
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
