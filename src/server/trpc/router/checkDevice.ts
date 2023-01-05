import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const checkDevice = router({
  getDevice: publicProcedure
  .query(async ({ ctx }) => {
    return ctx.userAgent
  }),
});
