"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validationRequest_1 = require("../../middleware/validationRequest");
const user_validation_1 = require("./user.validation");
const user_interface_1 = require("./user.interface");
const checkAuth_1 = require("../../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/register', (0, validationRequest_1.validateRequest)(user_validation_1.userZodSchema), user_controller_1.UserController.createUser);
router.get('/all-users', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), user_controller_1.UserController.getAllUsers);
router.patch('/:id', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), user_controller_1.UserController.updateUser);
// router.get('/register', UserController.getAllUser)
exports.UserRoutes = router;
