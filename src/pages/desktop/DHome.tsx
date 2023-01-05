import { useState, useEffect } from 'react'
import Image from 'next/image'

import { trpc } from "../../utils/trpc";
import InputAnswer from '../components/input'
import Button from '../components/button'
import Questioninput from "../components/questionInput";
import { poppins, seaWeed } from '../index'

interface Device {
  device: UAParser.IResult
}

const DHome: React.FC<Device> = ({ device }) => {
  const [ thinkers, setThinkers ] = useState({ middleAge: "São Tomas de aquino", modernAge: "Freud" })
  const [ answers, setAnswers ] = useState({ middleAge:"", modernAge:"" })
  const [ input, setInput ] = useState('')
  const [ isQuestionReady, setIsQuestionReady ] = useState({
    middle: true,
    modern: true
  })
  const mutation = trpc.example.getAll.useMutation({
    onMutate: () => {
      setIsQuestionReady({ middle: false, modern: false });
      setAnswers({ middleAge: '', modernAge: '' });
    },
    onSuccess: (data, variables, context) => {
      if(data[0] == undefined || data[1] == undefined) return "O Bot não soube responder"
      setAnswers({ middleAge: data[0], modernAge: data[1] });
    },
  })
  return (
    <>
      <Image
        src="/background.png"
        alt="A Beutiful landscape to inspire all sorts of philosophical questions"
        fill={true}
        sizes="100vw"
        priority
      /> 
      <section className="bg-transparent pt-8 px-14 md:px-36 relative">
        <main className={`${poppins.className}`}> {/* fazer a observação sobre relative e posição do image  -> relative para a section parar section ser o bloco que esta contido*/}
          <h1 className={`${seaWeed.className} text-6xl text-white mb-11 font-outline-2 text-center select-none`}>RESTITUET</h1>
          <form
            className="pb-20 px-16"
            onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate({ question: input, thinkers: thinkers })
          }}>
            <Questioninput input={(value) => setInput(value)}/>
            <Button middle={isQuestionReady.middle} modern={isQuestionReady.modern} /> {/* perguntar Duxo(mentor) pq é preciso passar a propriedade do objeto. caso contrario undefined */}
          </form>
          <div className="flex flex-row justify-between">
            <InputAnswer
              label="Middle age thinkers"
              era="middle" 
              thinker={(value: string) => setThinkers({ ...thinkers, middleAge: value })} 
              answer={answers.middleAge} 
              isQuestionReady={(value: boolean) => setIsQuestionReady({ ...isQuestionReady, middle: value })}
            />
            <InputAnswer 
              label="Modern age thinkers" 
              era="modern" 
              thinker={(value: string) => setThinkers({ ...thinkers, modernAge: value })} 
              answer={answers.modernAge} 
              isQuestionReady={(value: boolean) => setIsQuestionReady({ ...isQuestionReady, modern: value })}
            />      
          </div>
          {/*   
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
          */}
        </main>
      </section> 
  </>
)
}

export default DHome