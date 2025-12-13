import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchJobByQuery } from '@/redux/jobsSlice'

const filterCategory = [
  {
    filterType: 'Location',
    array: ['kolkata', 'bengaluru', 'delhi', 'mumbai', 'pune']
  },
  {
    filterType: 'Role',
    array: [
      'frontend developer',
      'backend developer',
      'ui/ux designer',
      'php developer',
      'node.js developer'
    ]
  },
  // {
  //   filterType: 'salary',
  //   array: ['0-40k', '40k-1lpa', '1lpa-2lpa', '2lpa-3lpa', '3lpa-4lpa']
  // }
]

export default function FilterCard() {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()
  const changeHandler = (value: string) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchJobByQuery(selectedValue))
  },[selectedValue, dispatch])
  return (
    <div className="ml-4 flex flex-col">
      <h1 className="mb-2 text-lg font-semibold"> Filter Jobs</h1>
      <div className="space-y-4">
        {filterCategory.map((category, i) => (
          <div key={i}>
            <h2 className="mb-2 font-medium text-gray-700">
              {category.filterType}
            </h2>
            <RadioGroup className="space-y-2" onValueChange={changeHandler}>
              {category.array.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={item}
                    id={`${category.filterType}-${item}`}
                  />
                  <Label
                    htmlFor={`${category.filterType}-${item}`}
                    className="font-semibold"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  )
}
