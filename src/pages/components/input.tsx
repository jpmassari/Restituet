import React, { useEffect, useState, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

interface AnswerProps {
  label: string,
  thinker: string,
  answer: string,
}

export const InputAnswer: React.FC<AnswerProps> = ({ label, thinker, answer }) => {
  const [ index, setIndex ] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const colorRef = useRef<HTMLInputElement>(null);

  const noise2D = createNoise2D();

  useEffect(() => {
    console.log("answer.length: ",answer.length)
    if (index < answer.length) {
      setInputValue(inputValue + answer[index]);
      
      const noiseValue = noise2D(index / 10, 0);
      const delay = 10 + (noiseValue + 1) * 50;
      
      setTimeout(() => {
        setIndex(index + 1);
      }, delay);
    }
    if(answer.length == 0) {
      setInputValue('')
      setIndex(0)
    }
  }, [answer, index])

  //TO DO: a cor vai ser atualizada toda vez que preenchermos o formulário
  useEffect(() => {
    if(!colorRef.current) return
    if(colorRef.current.style.background) return
    colorRef.current.style.backgroundColor = '#9FE8FF'
    if(label == "Modern age thinkers") {
      colorRef.current.style.backgroundColor = '#D5FF9F';
    }
  },[])

  return (
    <div className="flex flex-col font-semibold">
      <label className='text-4xl text-white pb-5'>{label}</label>
      <div className='flex flex-row mb-3 items-center'>
        <p className='text-white text-2xl'>How</p>
        <input
          className={`py-2 pl-3 pr-9 mx-4 h-8 w-44 min-w-0 shadow-xl opacity-80 text-xl`}
          type="text"
          value={thinker}
          disabled
          ref={colorRef}
          //onChange={handleChange}
        />
        <p className='text-white text-2xl'>would answer:</p>
      </div>
        <div className='flex rounded-md min-h-[36px] sm:max-w-sm md:max-w-md whitespace-normal py-2 px-3 shadow-xl opacity-80 bg-white item-start'> {/* flex e h-auto */}
          <p>{inputValue}</p>
        </div>
    </div>
  )
}

export default InputAnswer