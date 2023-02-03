import { Router } from 'express';
import needle from 'needle';
import 'dotenv/config';

const router = Router();

//ENV VARS
const API_KEY = process.env.API_KEY;

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  try {
    const apiRes = await needle(
      'get',
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );
    const data = apiRes.body;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
