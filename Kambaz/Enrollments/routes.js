import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const findEnrollmentsForUser = async (req, res) => {
        let {userId} = req.params;

        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.sendStatus(401);
            }
            userId = currentUser._id;
        }
        const enrollments = await dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    };

    const enrollUserInCourse = (req, res) => {
        let {userId} = req.params;
        const {courseId} = req.body;

        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.sendStatus(401);
            }
            userId = currentUser._id;
        }

        const enrollment = dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    };

    const unenrollUserFromCourse = (req, res) => {
        let {userId, courseId} = req.params;

        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.sendStatus(401);
            }
            userId = currentUser._id;
        }

        const result = dao.unenrollUserFromCourse(userId, courseId);
        res.json(result);
    };
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
    app.post("/api/users/:userId/enrollments", enrollUserInCourse);
    app.delete("/api/users/:userId/enrollments/:courseId", unenrollUserFromCourse);
}