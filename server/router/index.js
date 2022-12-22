const { Router } = require('express');

const router = new Router();

router.post('/registration', async () => { });
router.post('/login', async () => { });
router.post('/logout', async () => { });
router.get('/activete/:link', async () => { });
router.get('/refresh', async () => { });
router.get('/users', async () => { });

module.exports = router;