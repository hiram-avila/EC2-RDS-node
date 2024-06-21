import express from 'express';
const router = express.Router();



router.get('/', (req, res) => {
    res.send({message: 'errores corregidos en web'});
});

export default router;
