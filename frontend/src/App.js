import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Campaigns from './pages/Campaigns';
import Campaign from './pages/Campaign';
import Shop from './pages/Shop';
import NPC from './pages/NPC';
import NewShop from './pages/NewShop';
import NewNPC from './pages/NewNPC';
import NewCampaign from './pages/NewCampaign';
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/*' element={<NoPage />} />
                    <Route path='/campaigns' element={<Campaigns />} />
                    <Route path='/campaigns/cid' element={<Campaign />} />
                    <Route path='/campaigns/cid/shopid' element={<Shop />} />
                    <Route path='/campaigns/cid/npcid' element={<NPC />} />
                    <Route path='/campaigns/cid/newshop' element={<NewShop />} />
                    <Route path='/campaigns/cid/newnpc' element={<NewNPC />} />
                    <Route path='/campaigns/newcampaign' element={<NewCampaign />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

// class App extends React.Component {
//     render() {
//         return (
//             <>
//                 <BrowserRouter>
//                     <Routes>
//                         <Route path='/' exact element={<Home />} />
//                         <Route path='/about' element={<About />} />
//                         <Route path='/login' element={<Login />} />
//                         <Route path='/register' element={<Register />} />
//                         <Route path='/*' element={<NoPage />} />
//                         <Route path='/campaigns/:uid' element={<Campaigns />} />
//                         <Route path='/campaigns/cid' element={<Campaign />} />
//                         <Route path='/campaigns/cid/shopid' element={<Shop />} />
//                         <Route path='/campaigns/cid/npcid' element={<NPC />} />
//                         <Route path='/campaigns/cid/newshop' element={<NewShop />} />
//                         <Route path='/campaigns/cid/newnpc' element={<NewNPC />} />
//                     </Routes>
//                 </BrowserRouter>
//                 <ToastContainer />
//             </>
//         );
//     }
// }

export default App;
