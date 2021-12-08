// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import transactions from "../../data/transactions";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const _transactions = transactions();
  res.status(200).json(_transactions.sort((a, b) => a.date - b.date));
}
