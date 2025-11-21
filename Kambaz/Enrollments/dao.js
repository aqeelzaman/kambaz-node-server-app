import {v4 as uuidv4} from "uuid";

export default function EnrollmentsDao(db) {
    function findEnrollmentsForUser(userId) {
        const {enrollments} = db;
        return enrollments.filter((enrollment) => enrollment.user === userId);
    }

    function enrollUserInCourse(userId, courseId) {
        const {enrollments} = db;
        const exists = enrollments.some(
            (e) => e.user === userId && e.course === courseId
        );
        if (exists) {
            return {message: "Already enrolled"};
        }
        const newEnrollment = {
            _id: uuidv4(),
            user: userId,
            course: courseId,
        };
        db.enrollments = [...db.enrollments, newEnrollment];
        return newEnrollment;
    }

    function unenrollUserFromCourse(userId, courseId) {
        const {enrollments} = db;
        db.enrollments = enrollments.filter(
            (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
        );
        return {success: true};
    }

    return {
        findEnrollmentsForUser,
        enrollUserInCourse,
        unenrollUserFromCourse,
    };
}