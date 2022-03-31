//NPM packages imports
import express from 'express';
import insertVehicleValidator from '../../utils/validators/driver/forms/insert-vehicle.form.validator';

// Controllers imports
import * as driverController from '../../controllers/driver/driver.controller';
import * as inspectorController from '../../controllers/inspector/inspector.controller';
import * as addressController from '../../controllers/address/address.controller';
import * as historyController from '../../controllers/history/history.controller';

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                 GET ROUTES                                 */
/* -------------------------------------------------------------------------- */
router.get('/get/drivers/all', driverController.getAllDrivers);
router.get('/get/drivers/count', driverController.getDriversCount);
router.get('/get/inspectors/count', inspectorController.getInspectorsCount);
router.get('/get/addresses/count', addressController.getAddressesCount);
router.get('/get/earnings/today', historyController.getEarningsToday);
router.get(
  '/get/cards-distribution/today',
  historyController.getCardsDistributionToday
);

export { router as adminMainRouter };
