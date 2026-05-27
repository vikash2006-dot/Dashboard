const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: [
        'vip_created',
        'vip_updated',
        'vip_deleted',
        'power_created',
        'power_updated',
        'power_deleted',
        'power_assigned',
        'power_revoked',
        'points_added',
        'points_deducted',
        'usage_logged',
        'login',
        'logout',
      ],
      required: true,
    },
    targetType: {
      type: String,
      enum: ['vip', 'power', 'points', 'usage_log', 'user', 'system'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminLog', adminLogSchema);
