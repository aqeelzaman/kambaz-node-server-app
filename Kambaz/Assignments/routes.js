import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    const findAssignmentsForCourse = async (req, res) => {
        const {courseId} = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const createAssignmentForCourse = async (req, res) => {
        const {courseId} = req.params;
        const assignment = req.body;
        const newAssignment = await dao.createAssignment(courseId, assignment);
        res.send(newAssignment);
    };

    const deleteAssignment = async (req, res) => {
        const {courseId, assignmentId} = req.params;
        await dao.deleteAssignment(courseId, assignmentId);
        res.json({success: true});
    };

    const updateAssignment = async (req, res) => {
        const {courseId, assignmentId} = req.params;
        const updates = req.body;
        const updated = await dao.updateAssignment(courseId, assignmentId, updates);
        if (!updated) return res.status(404).json({message: "Assignment not found"});
        res.send(updated);
    };
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);
    app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);
}
