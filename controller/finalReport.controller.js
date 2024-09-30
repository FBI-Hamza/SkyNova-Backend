const Report = require('../models/finalReport.model'); 
const medicalDetailss = require('../models/medicalDetails.model');
const VerbalQuizResultss = require('../models/verbalQuizResult.model'); 
const nonVerbalQuizResultss = require('../models/nonVerbalQuizResult.model'); // Adjust the path as necessary

const createReport = async (req, res) => {
  try {
      const userIDD = req.user.userId; 

      console.log('user ID', userIDD);
      const medicalDetails = await medicalDetailss.find(userIDD);
      console.log('medical details', medicalDetails);
      const nonVerbalQuizResult = await nonVerbalQuizResultss.find(userIDD);
      console.log('non verbal quiz result', nonVerbalQuizResult);
      const verbalQuizResult = await VerbalQuizResultss.find(userIDD);
      console.log('verbal quiz result', verbalQuizResult);

      if (!medicalDetails || !nonVerbalQuizResult || !verbalQuizResult) {
        return res.status(404).json({ error: 'Not Found' });
      }

    const newReport = new Report({
      nonVerbalQuizResult,
      verbalQuizResult,
      medicalDetails,
    });

    if (!medicalDetails || !nonVerbalQuizResult || !verbalQuizResult) {
      return res.status(404).json({ error: 'Not Found' });
    }

    await newReport.save();
    return res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    console.error('Error creating report:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const viewReports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate('nonVerbalQuizResult')
      .populate('verbalQuizResult')
      .populate('medicalDetails');

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    return res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const reportViewById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('nonVerbalQuizResult')
      .populate('verbalQuizResult')
      .populate('medicalDetails');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    return res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const countReports = async (req, res) => {
  try {
    const reportCount = await Report.countDocuments({});
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    return res.json({ reportCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;

    const deletedReport = await Report.deleteOne({ _id: reportId });

    if (deletedReport.deletedCount === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateReport = async (req, res) => {
  const reportId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, { $set: updatedData }, { new: true });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.json(updatedReport);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createReport,
  viewReports,
  reportViewById,
  countReports,
  deleteReport,
  updateReport,
};
