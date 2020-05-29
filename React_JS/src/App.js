import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./component/Sidebar"
import CreateAppointment from "./component/appointment/Create"
import AppointmentList from "./component/appointment/List"
import TodayAppointments from "./component/appointment/Today"

function App() {
  return (
   <div>
    <Sidebar />
    <CreateAppointment />
    <AppointmentList />
    <TodayAppointments />
   </div>
  );
}

export default App;
