const express = require('express');
const router = express.Router();
const designationController = require('../../controller/designation controller');

router.route('/').get(designationController.getDesignations);
router.route('/registration').post(designationController.registerDesignation);
router.get("/:id", designationController.getId);
router.get("/daya/:key", designationController.searchDesignation);
router.route('/update/:id').patch(designationController.updateDesignation);
router.route('/delete/:id').delete(designationController.deleteDesignation);

// Define other routes using the corresponding controller functions

module.exports = router;
