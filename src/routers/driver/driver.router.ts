//NPM packages imports
import express from 'express';

// Controllers imports
import * as driverController from '../../controllers/driver/driver.controller';

// Validators imports
import registerValidator from '../../utils/validators/driver/forms/register.form.validator';
/* -------------------------------------------------------------------------- */

const router = express.Router();

router.post('/register', registerValidator, driverController.registerDriver);

export { router as driverMainRouter };
