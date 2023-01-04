import { type NextPage } from "next";
import { useState } from "react"
import Head from "next/head";
import { Poppins, Seaweed_Script } from "@next/font/google"
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import InputAnswer from './components/input'
import Button from './components/button'

const poppins = Poppins({
  weight: ['400', '600'],
  style: ['normal'],
  subsets: ['latin']
})

const seaWeed = Seaweed_Script({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin']
})

const Home: NextPage = () => {
  const [ thinkers, setThinkers ] = useState({ middleAge: "São Tomas de aquino", modernAge: "Freud" })
  const [ answers, setAnswers ] = useState({ middleAge:"", modernAge:"" })
  const [ input, setInput ] = useState({
    value: '',
    count: 0
  });
  const [ isQuestionReady, setIsQuestionReady ] = useState({
    middle: true,
    modern: true
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 75) {
      setInput({...input, value: value, count: value.length });
    }
  };
  
  const mutation = trpc.example.getAll.useMutation({
    onMutate: () => {
      setIsQuestionReady({ middle: false, modern: false })
    },
    onSuccess: (data, variables, context) => {
      if(data[0] == undefined || data[1] == undefined) return "O Bot não soube responder"
      setAnswers({ middleAge: data[0], modernAge: data[1] });
    },
  })

  return (
    <>
      <Head>
        <title>Restituet</title>
        <meta name="description" content="Middle age vs Modern Age - compare for best advices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-black">
        <Image
          src="/background.png"
          alt="A Beutiful landscape to inspire all sorts of philosophical questions"
          fill={true}
          className="object-fill z-0"
          priority
        /> 
        <main className={`flex ${poppins.className} min-h-screen flex-col items-center justify-start pt-8 px-14 md:px-36 pb-11 z-99 relative`}> {/* fazer a observação sobre relative e posição do image  -> relative para a section parar section ser o bloco que esta contido*/}
          <h1 className={`${seaWeed.className} text-6xl text-white mb-11 font-outline-2 select-none`}>RESTITUET</h1>
          <div className='w-full pb-20 px-16'>
            <form
              onSubmit={(event) => {
              event.preventDefault();
              mutation.mutate({ question: input.value, thinkers: thinkers })
              setAnswers({ middleAge: '', modernAge: '' });
              console.log("submited")
            }}>
              <input
                className='py-2 px-9 w-full shadow-xl'    
                type="text"
                value={input.value}
                onChange={handleChange}
                placeholder="How should I deal with ambiguos problems?"
              />
              <label className='text-white font-bold'>Limit {input.count}/75</label>
              <Button isReady={isQuestionReady}/>
            </form>
          </div>
          <div className="flex flex-row w-full justify-between">
            <InputAnswer
              label="Middle age thinkers"
              era="middle" 
              thinker={(value: string) => setThinkers({ ...thinkers, middleAge: value })} 
              answer={answers.middleAge} 
              isQuestionReady={(value: boolean) => setIsQuestionReady({...isQuestionReady, middle: value})}
            />
            <InputAnswer 
              label="Modern age thinkers" 
              era="modern" 
              thinker={(value: string) => setThinkers({ ...thinkers, modernAge: value })} 
              answer={answers.modernAge} 
              isQuestionReady={(value: boolean) => setIsQuestionReady({...isQuestionReady, modern: value})}
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
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
