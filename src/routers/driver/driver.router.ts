//NPM packages imports
import express from 'express';

// Controllers imports
import * as driverController from '../../controllers/driver/driver.controller';
import * as vehicleController from '../../controllers/vehicle/vehicle.controller';

// Validators imports
import registerValidator from '../../utils/validators/driver/forms/register.form.validator';
/* -------------------------------------------------------------------------- */

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                 GET ROUTES                                 */
/* -------------------------------------------------------------------------- */
// Fetch saved vehicles (if any) of a specific driver
router.get('/:driverId/vehicles', vehicleController.getVehicles);

/* -------------------------------------------------------------------------- */
/*                                 POST ROUTES                                */
/* -------------------------------------------------------------------------- */
router.post('/register', registerValidator, driverController.registerDriver);

export { router as driverMainRouter };
