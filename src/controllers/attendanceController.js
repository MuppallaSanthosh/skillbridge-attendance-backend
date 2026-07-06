const db = require("../config/db");

const markAttendance = async (req, res) => {
    try {
        const { student_id, batch_id, attendance_date, status } = req.body;

        const result = await db.query(
            `INSERT INTO attendance
            (student_id, batch_id, attendance_date, status)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [student_id, batch_id, attendance_date, status]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const getAttendance = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM attendance ORDER BY id"
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    markAttendance,
    getAttendance
};