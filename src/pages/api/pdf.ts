// pages/api/upload-pdf.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import pool from "../api/pool";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {fields, files} = await parseForm(req);

    const file = files.file 
    
  }
}

async function parseForm(req : NextApiRequest) {
  return new Promise<{fields: any, files: any}>((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({fields, files});
      }
    });
  });
}
