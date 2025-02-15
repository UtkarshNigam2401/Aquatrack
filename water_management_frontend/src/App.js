import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import Register from "./Components/Register";


import Admin from "./Admin/Admin";
import ViewCustomer from "./Admin/ViewCustomer";
import ViewWorkers from "./Admin/ViewWorkers";
import ViewAreas from "./Admin/ViewAreas";
import ViewPayment from "./Admin/ViewPayment";
import ViewComplaints from "./Admin/ViewComplaints";
import EditWorker from "./Admin/EditWorker";


import Worker from "./Worker/Worker";
import AddCustomer from "./Worker/AddCustomer";
import ViewAssignedCustomers from "./Worker/ViewAssignedCustomers";
import GenerateBill from "./Worker/GenerateBill";
import ShowBills from "./Worker/ShowBills";
import ViewComplaintsW from "./Worker/ViewComplaintsW";


import Customer from "./Customer/Customer";
import EditUserProfile from "./Customer/EditUserProfile";
import RaiseComplaint from "./Customer/RaiseComplaint";
import PayBill from "./Customer/PayBill";
import Payments from "./Customer/Payments";
import Payment from "./Customer/Payment";



function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>

        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/viewcustomers" element={<ViewCustomer/>}></Route>
        <Route path="/admin/viewworkers" element={<ViewWorkers/>}></Route>
        <Route path="/admin/viewareas" element={<ViewAreas/>}></Route>
        <Route path="/admin/ViewPayment" element={<ViewPayment/>}></Route>
        <Route path="/admin/viewcomplaints" element={<ViewComplaints/>}></Route>
        <Route path="/admin/editworker/:id" element={<EditWorker/>}></Route>
        

        <Route path="/worker" element={<Worker/>}></Route>
        <Route path="/worker/addcustomer" element={<AddCustomer/>}></Route>
        <Route path="/worker/viewcustomer" element={<ViewAssignedCustomers/>}></Route>
        <Route path="/worker/generatebill" element={<GenerateBill />} />
        <Route path="/worker/showbills" element={<ShowBills/>}></Route>
        <Route path="/worker/viewcomplaints" element={<ViewComplaintsW/>}></Route>


        <Route path="/customer" element={<Customer/>}></Route>
        <Route path="/customer/editcustomer" element={<EditUserProfile/>}></Route>
        <Route path="/customer/raisecomplaint" element={<RaiseComplaint/>}></Route>
        <Route path="/customer/paybill" element={<PayBill/>}></Route>
        <Route path="/customer/payments" element={<Payments/>}></Route>
        <Route path="/customer/makepayment" element={<Payment/>}></Route>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
