import Parser from 'ua-parser-js';
import { type GetServerSidePropsContext } from "next";

export const isMobile = async(req: GetServerSidePropsContext["req"]) => {
 
  const userAgent = Parser(req.headers['user-agent'] || '')

  return userAgent
}
