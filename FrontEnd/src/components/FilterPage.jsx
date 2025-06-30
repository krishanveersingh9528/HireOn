import  { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune"]
  },
  {
    filterType: "Industry",
    array: ["FrontEnd Developer", "BackEnd Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary(LPA)",
    array: ["5", "8", "10","12"]
  }
]
const FilterPage = () => {
  const [selectedValue, setSelectedValue] = useState("")
  const dispatch=useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value)
   
  }
 useEffect(()=>{
     dispatch(setSearchedQuery(selectedValue))
 },[selectedValue])

  return (
    <div className='w-full rounded-md bg-white p-3'>
      <h1 className='font-bold text-lg text-orange-500 '>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup onValueChange={changeHandler} value={selectedValue} className='space-y-4 mt-3'>
         {
           filterData.map((item,index)=>{
           return <div>
              <h1 className='font-bold text-lg'>{item.filterType}</h1>
              {
                item.array.map((item, idx) => {
                  const id = `r${index}-${idx}`; // Unique ID for each radio item
                   return ( <div className='flex items-center space-x-2 my-2'>
                     <RadioGroupItem value={item} id={id} /> 
                     <Label htmlFor={id} >{item}</Label>
                   </div>
                   )
                })
              }
            </div>
           })
         }
      </RadioGroup>
    </div>
  )
}

export default FilterPage
