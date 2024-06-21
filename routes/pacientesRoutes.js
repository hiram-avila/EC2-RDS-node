import express from 'express';
const router = express.Router();



router.get('/', (req, res) => {
    res.json({message: 'errores corregidos en web'});
});

export default router;
