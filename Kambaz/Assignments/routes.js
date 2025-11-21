import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
    const dao = AssignmentsDao(db);

    const findAssignmentsForCourse = (req, res) => {
        const {courseId} = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const createAssignmentForCourse = (req, res) => {
        const {courseId} = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = dao.createAssignment(assignment);
        res.send(newAssignment);
    };

    const deleteAssignment = (req, res) => {
        const {assignmentId} = req.params;
        dao.deleteAssignment(assignmentId);
        res.json({success: true});
    };

    const updateAssignment = (req, res) => {
        const {assignmentId} = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
        if (!updatedAssignment) {
            return res.status(404).json({message: "Assignment not found"});
        }
        res.send(updatedAssignment);
    };

    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
}