import model from "./model.js";
import userModel from "../Users/model.js";

export default function EnrollmentsDao() {
    async function findCoursesForUser(userId) {
        const enrollments = await model.find({user: userId}).populate("course");
        return enrollments.map((enrollment) => enrollment.course);
    }

    async function findUsersForCourse(courseId) {
        const enrollments = await model.find({ course: courseId });
        const userIds = enrollments.map(enrollment => enrollment.user);
        const users = await userModel.find({ _id: { $in: userIds } });
        return users;
    }

    async function findEnrollmentsForUser(userId) {
        const enrollments = await model.find({user: userId});
        return enrollments.map(e => ({
            user: e.user,
            course: e.course,
        }));
    }

    function enrollUserInCourse(userId, courseId) {
        return model.create({
            user: userId,
            course: courseId,
            _id: `${userId}-${courseId}`,
        });
    }

    function unenrollUserFromCourse(user, course) {
        return model.deleteOne({user, course});
    }

    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({course: courseId});
    }

    return {
        findCoursesForUser,
        findUsersForCourse,
        findEnrollmentsForUser,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse,
    };
}