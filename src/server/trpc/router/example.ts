import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  getAll: publicProcedure
  .input(z.object({ question: z.string(), thinkers: z.object({ middleAge: z.string(), modernAge: z.string() })}))
  .mutation(async ({ input, ctx }) => {
    const middleAgeAnswer = await ctx.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt: "Escreva como " + input.thinkers.middleAge +" um conselho sobre  " + input.question,
      max_tokens: 256,
      temperature: 0.7
    });
    const modernAgeAnswer = await ctx.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt: "Escreva como " + input.thinkers.modernAge +" um conselho, sobre " + input.question,
      max_tokens: 256,
      temperature: 0.7
    });
    console.log("middleAge: ",middleAgeAnswer.data.choices[0]?.text);
    console.log("modernAge: ",modernAgeAnswer.data.choices[0]?.text);
 
/*     await fetch('http://localhost:3000/api/examples', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers: {
        middleAgeAnswer: middleAgeAnswer.data.choices[0]?.text,
        modernAgeAnswer: modernAgeAnswer.data.choices[0]?.text
      }})
    }) */
    return [middleAgeAnswer.data.choices[0]?.text, modernAgeAnswer.data.choices[0]?.text]
  }),
});
