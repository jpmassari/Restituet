import { type NextPage } from "next";
import dynamic from 'next/dynamic'
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Poppins, Seaweed_Script } from "@next/font/google"

import { trpc } from "../utils/trpc";

const DHome = dynamic(() => import('./desktop/DHome'))
const MHome = dynamic(() => import('./mobile/MHome'))

export const poppins = Poppins({
  weight: ['400', '600'],
  style: ['normal'],
  subsets: ['latin']
})

export const seaWeed = Seaweed_Script({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin']
})

const Home: NextPage= () => {
  const getDevice = trpc.checkDevice.getDevice.useQuery();
  
  if(!getDevice.data) return <></>
  return (
    <>
      <Head>
        <title>Restituet</title>
        <meta name="description" content="Middle age vs Modern Age - compare for best advices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getDevice.data.device.type === 'mobile' ? <MHome device={getDevice.data} /> : <DHome device={getDevice.data} />}
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
