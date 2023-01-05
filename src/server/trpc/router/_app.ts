import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { checkDevice } from './checkDevice'
export const appRouter = router({
  example: exampleRouter,
  checkDevice: checkDevice,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
