import { Router } from 'express';

const router = Router();

router.get('/populate', (req, res) => res.json({ message: "it's working" }));

export { router };
