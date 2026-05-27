const Notification = require('../models/Notification');

// Get notifications
exports.getNotifications = async (req, res) => {
  try {
    const { isRead, page = 1, limit = 10 } = req.query;
    let query = {};

    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const notifications = await Notification.find(query)
      .populate('relatedVIP', 'name vipId')
      .populate('relatedPower', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type, relatedVIP, relatedPower, icon = 'ℹ️', priority = 'medium' } = req.body;

    const notification = new Notification({
      title,
      message,
      type,
      relatedVIP,
      relatedPower,
      icon,
      priority,
    });

    await notification.save();

    res.status(201).json({
      success: true,
      message: 'Notification created',
      notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
