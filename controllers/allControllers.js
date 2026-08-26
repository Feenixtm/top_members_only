import passport from "passport";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";

// --- Imports ---

export const getIndex = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT users.id, users.username, users.admin, comments.* FROM users INNER JOIN comments ON users.id = comments.author_id ");
        console.log(rows);

        // console.log(req.user);
        res.render("index", { user: req.user, comments: rows });
    } catch (error) {
        next(error);
    }
}

export const getSignUp = (req, res) => {
    res.render("sign-up");
}

export const getLogIn = (req, res) => {
    res.render("log-in");
}

export const getJoinTheClub = (req, res) => {
    res.render("join-the-club");
}

export const getAdminRequestForm = (req, res) => {
    res.render("admin-request-form", { user: req.user });
}

export const getCreateNewMessage = (req, res) => {
    res.render("create-new-message", { user: req.user });
}

export const getLogOut = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        res.redirect("/");
    });
}

// --- POST Requests --- 

export const postSignUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query("INSERT INTO users (first_name, last_name, username, password, membership_status, admin) VALUES ($1, $2, $3, $4, $5, $6)",
            [
                req.body.firstName,
                req.body.lastName,
                req.body.username,
                hashedPassword,
                false,
                false
            ]
        );
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const postJoinTheClub = async (req, res, next) => {
    try {
        const id = Number(req.user.id);
        const password = req.body.password;

        if (password.toLocaleUpperCase() === "INEEDTHIS") {
            await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [true, id]);
        } else {
            console.log("Incorrect Password. Membership has been denied...")
        }

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

export const postAdminRequest = async (req, res, next) => {
    try {
        const id = req.user.id;
        const password = req.body.password;

        if (password === "IWANTADMIN") {
            await pool.query("UPDATE users SET admin = $1 WHERE id = $2", [true, id]);
        } else {
            console.log("Incorrect Password. Admin request denied...")
        }

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

export const postCreateNewMessage = async (req, res, next) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const author = req.user.username;
        const authorId = req.user.id;

        console.log({ title: title, content: content, author: author, authorId: authorId });

        if (title.length > 0 && content.length > 0) {
            await pool.query("INSERT INTO comments (title, content, author_id) VALUES ($1, $2, $3)", 
                [
                    title,
                    content,
                    authorId,
                ]
            );
        }

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

// ------ DELETE ------

export const postDeleteMessage = async (req, res, next) => {
    try {
        const commentId = Number(req.params.id);
        await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);

        res.redirect("/");
    } catch (error) {
        next(error);
    }
};