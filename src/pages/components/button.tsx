import React from 'react'

interface Props {
    middle: boolean,
    modern: boolean
}

const Button: React.FC<Props> = ({ middle, modern }) => {
  if(middle && modern) return <SubmitButton/>
  return <CancelButton />
}

const SubmitButton = () => (
  <div className="h-8 w-28 m-auto">
    <button
      className="w-full h-full rounded-sm bg-[#6BA87C] shadow hover:bg-[#527F5E] duration-200 ease-in-out text-white"
    >
      Submit
    </button>
  </div>
)

const CancelButton = () => (
  <div className="h-8 w-28 m-auto">
    <button
      className="w-full h-full rounded-sm bg-opacity-80 bg-[#DEDEDE] hover:bg-opacity-60 duration-200 ease-in-out  shadow duration-200 ease-in-out text-[#666666]"
      disabled
    >
      Wait
    </button>
  </div>
)

export default Button