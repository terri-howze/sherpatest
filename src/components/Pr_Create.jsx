import React from 'react'
import { useState } from 'react'
// import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import '../css/Pr_Create.css'
import { InputLabel } from '@mui/material'
import { useStateStore } from '../Store'
import axios from 'axios'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'


function Pr_Create() {
    const d = new Date();
    //initiating state variables for creating purchase request. These are saved as an object we submit is clicked and sent as post request.
    //const [prNumber, setprNumber] = useState()
    const [department, setdepartment] = useState('0')
    const cardType = "Amex";
    const [purchaseRequestAmount, setAmount] = useState('0')
    const [cardNumber, setCardNumber] = useState('0')
    const [date, setDate] = useState("")
    const mountSatte = useStateStore((state) => state.isMounted)
    const falseMount = useStateStore((state) => state.flagFalse)
    //Functions to handle submitting PR

    // Function to change prNumber state to new prNumber input
    // const onNewPR = e =>{
    //   setprNumber(e.target.value);
    // };
    // Function to change department state to new department input
    const onNewDepartment = e =>{
      setdepartment(e.target.value);
    };

    // Function to change card number state to new card number input. will come back to handle encrypting(maybe)
    const onNewCardNumber = e =>{
      setCardNumber(e.target.value);
    }

    const onNewDatePurchase = e => {
      setDate(e.target.value);
    }

    //Function to change purchaase request amount to new input state
    const onNewPurchaseRequestAmount = e =>{
        setAmount(e.target.value);
    }
  
    // Function to handle submittal of Pr and save it
    const handleSubmit = async(e) => {
      const prNumber = makePrNumber()
      const datePurchaseRequest = dayjs(date).format('MM-DD-YYYY')
      setDate(date)
      const data = {
        prNumber,
        department,
        cardType,
        purchaseRequestAmount,
        cardNumber,
        datePurchaseRequest
          };
    //await 
    console.log(data)
    //axios.post('http://localhost:8080/PR/addPR', data)
    falseMount()
    }

    //Function to combine enterered values to make a prNumber accoring to Sherpa's prestanding format
    const makePrNumber = () => {
      const dayofMonth = dayjs(date).format('MMDD')
      const prString = (date.$y + "." + department + "." + dayofMonth)
      return prString
    }

    return (
      <div className='form_box_flex'>
        <p>
          Form Submittal
        </p>
      <form onSubmit={handleSubmit}>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          id="department-label"
          defaultValue=''
          value={department}
          label="Department"
          onChange={onNewDepartment}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={51}>51</MenuItem>
          <MenuItem value={52}>52</MenuItem>
          <MenuItem value={53}>53</MenuItem>
        </Select>
        <label for ="Department">Purchase Request Amount</label>
        <input type="text" onChange = {onNewPurchaseRequestAmount}></input>
        <label for ="Department">Card Number</label>
        <input type="text" onChange = {onNewCardNumber}></input> 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        onChange={(newValue) => {
          setDate(newValue)
        }} />
        </LocalizationProvider>
      </form>
      <button onClick={handleSubmit}>Submit</button>
      </div>
  )
}

export default Pr_Create