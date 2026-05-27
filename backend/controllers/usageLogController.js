const PowerUsageLog = require('../models/PowerUsageLog');
const Power = require('../models/Power');
const VIP = require('../models/VIP');
const AdminLog = require('../models/AdminLog');

// Get all usage logs
exports.getAllUsageLogs = async (req, res) => {
  try {
    const { vipId, powerId, page = 1, limit = 10 } = req.query;
    let query = {};

    if (vipId) query.vipId = vipId;
    if (powerId) query.powerId = powerId;

    const logs = await PowerUsageLog.find(query)
      .populate('vipId', 'name vipId')
      .populate('powerId', 'name')
      .populate('markedBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ usedAt: -1 });

    const total = await PowerUsageLog.countDocuments(query);

    res.status(200).json({
      success: true,
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create usage log
exports.createUsageLog = async (req, res) => {
  try {
    const { vipId, powerId, remarks, status = 'success' } = req.body;

    const vip = await VIP.findById(vipId);
    const power = await Power.findById(powerId);

    if (!vip || !power) {
      return res.status(404).json({ success: false, message: 'VIP or Power not found' });
    }

    const log = new PowerUsageLog({
      vipId,
      powerId,
      remarks,
      markedBy: req.user.userId,
      status,
      usedAt: new Date(),
    });

    await log.save();

    // Update power usage count
    power.totalUsageCount += 1;
    vip.totalPowerUsed += 1;
    if (!vip.usedPowers.includes(powerId)) {
      vip.usedPowers.push(powerId);
    }

    await power.save();
    await vip.save();

    // Log admin action
    await AdminLog.create({
      adminId: req.user.userId,
      action: 'usage_logged',
      targetType: 'usage_log',
      targetId: log._id,
      details: { vipId, vipName: vip.name, powerId, powerName: power.name, status },
    });

    res.status(201).json({
      success: true,
      message: 'Usage log created successfully',
      log,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get usage statistics
exports.getUsageStats = async (req, res) => {
  try {
    const mostUsedPowers = await PowerUsageLog.aggregate([
      { $group: { _id: '$powerId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'powers', localField: '_id', foreignField: '_id', as: 'power' } },
    ]);

    const topVIPs = await PowerUsageLog.aggregate([
      { $group: { _id: '$vipId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'vips', localField: '_id', foreignField: '_id', as: 'vip' } },
    ]);

    const totalUsages = await PowerUsageLog.countDocuments();
    const todayUsages = await PowerUsageLog.countDocuments({
      usedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsages,
        todayUsages,
        mostUsedPowers,
        topVIPs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
