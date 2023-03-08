import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController';
const router = express.Router();
import { protect } from "../middleware/authMiddleware";

router.route('/').get(protect, getGoals).post(protect, setGoal);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


// router.get('/', getGoals);

// router.post('/', setGoal)

// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)

export default router;