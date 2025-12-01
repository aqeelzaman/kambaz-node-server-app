import {v4 as uuidv4} from "uuid";
import model from "../Courses/model.js";
import assignmentModel from "../Assignments/model.js";

export default function AssignmentsDao() {

    async function findAssignmentsForCourse(courseId) {
        const course = await model.findById(courseId);
        return course.assignments;
    }

    async function createAssignment(courseId, assignment) {
        const newAssignment = {...assignment, _id: uuidv4(), course: courseId};
        await model.updateOne(
            {_id: courseId},
            {$push: {assignments: newAssignment}}
        );
        await assignmentModel.create(newAssignment);
        return newAssignment;
    }

    async function deleteAssignment(courseId, assignmentId) {
        await model.updateOne(
            {_id: courseId},
            {$pull: {assignments: {_id: assignmentId}}}
        );
        await assignmentModel.deleteOne({_id: assignmentId});
    }

    async function updateAssignment(courseId, assignmentId, updates) {
        const course = await model.findById(courseId);
        const assignment = course.assignments.id(assignmentId);
        if (!assignment) return null;
        Object.assign(assignment, updates);
        await course.save();
        await assignmentModel.updateOne({_id: assignmentId}, {$set: assignment});
        return assignment;
    }

    return {
        findAssignmentsForCourse,
        createAssignment,
        deleteAssignment,
        updateAssignment
    };
}
