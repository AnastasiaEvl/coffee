import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PersonalCabinet} from "./components/smart/PersonalCabinet";
import "mapbox-gl/dist/mapbox-gl.css";
import {checkAuthThunk} from "./redux/auth/thunk";
import {useAppDispatch} from "./core/hooks/useRedux";
import {Profile} from "./pages/Private/Profile";
import {Orders} from "./pages/Private/Profile/Orders";
import {Questions} from "./pages/Private/Profile/Questions";
import {MapCard} from "./components/smart/Map/MapCard";
import {Basket} from "./components/simple/Basket";
import {Bank} from './components/smart/Bank'
import {WorkTime} from "./components/simple/WorkTime";
import {Enter} from "./pages/Enter/Enter";
import {DiscountForCup} from "./pages/DiscountForCup/DiscountForCup";
import {LoyaltySystem} from "./pages/LoyaltySystem";
import {WinterMenu} from "./pages/WinterMenu";
import {PointsForRegistration} from "./pages/PointsForRegistration";
import {MainLayout} from "./pages/MainLayout/MainLayout";
import {NotFound} from "./pages/NotFound/NotFound";
import {HomePage} from "./pages/HomePage/HomePage";
import {PrivateRoute} from "./pages/Private/PrivateRoute/PrivateRoute";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuthThunk())
    }, [dispatch]);


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route index element={<Enter/>}/>
                    <Route path='/' element={<Enter/>}/>
                    <Route path='/main' element={<HomePage/>}/>
                    <Route path='/personal' element={<PersonalCabinet/>}/>
                    <Route path='/basket' element={<Basket/>}/>
                    <Route path='/map' element={<MapCard/>}/>
                    <Route path='/bank' element={<Bank/>}/>
                    <Route path='/workTime' element={<WorkTime/>}/>
                    <Route path='/winterMenu' element={<WinterMenu/>}/>
                    <Route path='/discountForCup' element={<DiscountForCup/>}/>
                    <Route path='/loyaltySystem' element={<LoyaltySystem/>}/>
                    <Route path='/pointsForRegistration' element={<PointsForRegistration/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path='/profile'>
                            <Route index element={<Profile/>}/>
                        </Route>
                    </Route>
                    <Route path='orders' element={<Orders/>}/>
                    <Route path='questions' element={<Questions/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
