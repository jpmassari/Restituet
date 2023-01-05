import { useState } from 'react'

interface Input {
  input: ((value: string) => void),
}

const Questioninput: React.FC<Input> = ({
  input = () => null
}) => {
  const [ questionInput, setQuestionInput ] = useState({
    value: '',
    count: 0
  });
  return (
    <div className='flex flex-col'>
      <input
        className='py-2 px-9 shadow-xl'    
        type="text"
        value={questionInput.value}
        placeholder="How should I deal with ambiguos problems?"
        onChange={(event) => {
          const value = event.target.value;
          value.length <= 75 && input(value)
          setQuestionInput({ value: value, count: value.length})
        }}
      />
      <label className='text-white font-bold'>Limit {questionInput.count}/75</label>
    </div>
  )
}

export default Questioninput