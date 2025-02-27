import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import pool from "./pool";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const id = uuidv4();
      const { name } = req.body;
      await pool.query("INSERT INTO student (name, id) VALUES ($1, $2)", [
        name,
        id,
      ]);
      res.status(200).json({ message: "Student added successfully" });
    } else if (req.method === "GET") {
      const result = await pool.query("SELECT * FROM student");
      res.status(200).json(result.rows);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await pool.query("DELETE FROM student WHERE id = $1", [id]);
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
