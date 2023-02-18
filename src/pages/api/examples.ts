import { type NextApiRequest, type NextApiResponse } from "next";

let storedBody: string | null = null;

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch(method) {
    case 'GET':
      if (storedBody) {
        res.status(200).json(storedBody);
        break
      }
      res.status(404).send('No stored request body');
      break
    case 'POST':
      storedBody = req.body.answers
      res.status(200).send('Request body stored');
      break
  }
};

export default examples;
