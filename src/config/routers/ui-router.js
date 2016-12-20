import {Router} from 'express';

import {applicationHandler} from 'handlers';

const router = new Router();

router.get('/*', applicationHandler);

export default router;
