import { useEffect, useState, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

interface AnswerProps {
  label: string,
  era: string,
  thinker: string | ((value: string) => void),
  answer: string,
  isQuestionReady: (value: boolean) => void
}

const InputAnswer: React.FC<AnswerProps> = ({
  label,
  era,
  thinker = () => null,
  answer,
  isQuestionReady = () => null
}) => {
  const THINKERS = {
    middleAge: [ "São Tomas de aquino", "Platão", "Marco Aurélio" ],
    modernAge: [ "Freud", "Robespierre", "Cromwell" ]
  }
  const initialThinker = typeof thinker === 'string' && thinker;
  const [ displayedThinker, setDisplayedThinker ] = useState('');
  const [ index, setIndex ] = useState(0);
  const [ inputValue, setInputValue ] = useState('');
  const colorRef = useRef<HTMLSelectElement>(null);

  const noise2D = createNoise2D();

  useEffect(() => {
    if (index < answer.length) {
      setInputValue(inputValue + answer[index]);

      const noiseValue = noise2D(index / 10, 0);
      const delay = 10 + (noiseValue + 1) * 50;
      
      setTimeout(() => {
        setIndex(index + 1);
      }, delay);
    }
    if(index == answer.length) {
      console.log("should not be here")
      isQuestionReady(true)
    }
    if(answer.length == 0) {
      setInputValue('');
      setIndex(0);
    }
  }, [answer, index])

  //TO DO: a cor vai ser atualizada toda vez que preenchermos o formulário
  useEffect(() => {
    if(!colorRef.current) return;
    if(colorRef.current.style.background) return;
   
    setDisplayedThinker(initialThinker as string);
    colorRef.current.style.backgroundColor = '#D5FF9F';
    if(era == "modern") {
      colorRef.current.style.backgroundColor = '#9FE8FF';
    }
  }, [])

  return (
    <div className="flex flex-col font-semibold">
      <label className='text-4xl text-white pb-5'>{label}</label>
      <div className='flex flex-row mb-3 items-center'>
        <p className='text-white text-2xl'>How</p>
        <select
          ref={colorRef}
          className={'pl-3 pr-4 mx-4 h-7 w-44 min-w-0 shadow-xl opacity-80 text-xl'}
          name="thinker"
          value={displayedThinker}
          onChange={(event) => {
            const selectedCode = event.target.value;
            const selectedApi = (era == "modern") ? (
              THINKERS.modernAge.find((thinker) => thinker === selectedCode) 
            ) : (
              THINKERS.middleAge.find((thinker) => thinker === selectedCode)
            );
            if (typeof thinker === 'function' && selectedApi) {
              thinker(selectedApi);
              setDisplayedThinker(selectedApi);
            }
          }}
        >
          <option 
            value=""
            disabled
          >
            Select a thinker
          </option>
          {era == "modern" ? (
            THINKERS.modernAge.map((thinker,i) => (
              <option 
                key={i}
                value={thinker}
              >
                {thinker}
              </option>
          ))) : (
            THINKERS.middleAge.map((thinker,i) => (
              <option 
                key={i}
                value={thinker}
              >
                {thinker}
              </option>
          )))}
        </select>
        <p className='text-white text-2xl'>would answer:</p>
      </div>
        <div className='flex rounded-md min-h-[36px] sm:max-w-sm md:max-w-md whitespace-normal py-2 px-3 shadow-xl opacity-80 bg-white item-start'> {/* flex e h-auto */}
          <p>{inputValue}</p>
        </div>
    </div>
  )
}

export default InputAnswer
