import { type NextApiRequest, type NextApiResponse } from "next";

let storedBody: string | null = null;

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST'){
    storedBody = req.body.answers
    res.status(200).send('Request body stored');
  } else if (req.method === 'GET') {
    if (storedBody) {
      res.status(200).json(storedBody);
    } else {
      res.status(404).send('No stored request body');
    }
  }
};

export default examples;
