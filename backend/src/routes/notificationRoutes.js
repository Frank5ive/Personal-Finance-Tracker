const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create a notification
router.post('/', notificationController.createNotification);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

// Get notifications for a user
router.get('/:userId', notificationController.getNotifications);

module.exports = router;
