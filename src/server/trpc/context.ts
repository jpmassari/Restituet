import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import type Parser from 'ua-parser-js'; //vamos importar o type para diminuir pacotes extras que poderiam vir juntos

import { getServerAuthSession } from "../common/get-server-auth-session";
import { isMobile } from "../composition/landing/isMobile";
import { prisma } from "../db/client";
import { openAIApi } from "../api/openAIApi";


type CreateContextOptions = {
  session: Session | null;
  userAgent: Parser.IResult | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    openAIApi,
    userAgent: opts.userAgent
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });
  const userAgent = await isMobile( req )
  return await createContextInner({
    session,
    userAgent
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
