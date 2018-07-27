import express from 'express';
import UserRoutes from './User/user.route';


const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Worlds');
});

const apiRoute = express.Router();
router.use('/api', apiRoute);
apiRoute.get('/', (req, res) => {
  res.send('Hello API');
});

const userRoute = express.Router();
apiRoute.use('/user', userRoute);
const u = new UserRoutes(userRoute);

export default router;
