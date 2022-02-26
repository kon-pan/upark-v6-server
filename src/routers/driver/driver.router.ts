//NPM packages imports
import express from 'express';
import insertVehicleValidator from '../../utils/validators/driver/forms/insert-vehicle.form.validator';

// Controllers imports
import * as driverController from '../../controllers/driver/driver.controller';
import * as vehicleController from '../../controllers/vehicle/vehicle.controller';
import * as cardController from '../../controllers/card/card.controller';
import * as stripeController from '../../controllers/stripe/stripe.controller';

// Validators imports
import registerValidator from '../../utils/validators/driver/forms/register.form.validator';
/* -------------------------------------------------------------------------- */

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                 GET ROUTES                                 */
/* -------------------------------------------------------------------------- */
// Fetch active card/s (if any) of a specific driver
router.get('/:driverId/select/active-cards', cardController.selectActiveCards);
// Fetch saved vehicles (if any) of a specific driver
router.get('/:driverId/vehicles', vehicleController.getVehicles);

/* -------------------------------------------------------------------------- */
/*                                 POST ROUTES                                */
/* -------------------------------------------------------------------------- */
// Cancel a specific driver's card
router.post('/card/cancel', cardController.cancelCard);
// Insert a new parking card in to the database
router.post('/card/insert', cardController.insertCard);
// Create stripe payment intent
router.post(
  '/payment/create-payment-intent',
  stripeController.createPaymentIntent
);
// Insert a new vehicle in to the database
router.post(
  '/:driverId/insert/vehicle',
  insertVehicleValidator,
  vehicleController.insertVehicle
);
router.post('/register', registerValidator, driverController.registerDriver);

export { router as driverMainRouter };
