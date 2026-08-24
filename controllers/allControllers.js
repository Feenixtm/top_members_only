import passport from "passport";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";

// --- Imports ---

export const getIndex = (req, res) => {
    // console.log(req.user);
    res.render("index", { user: req.user });
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

export const getNewMessage = (req, res) => {
    res.render("new-message");
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
        await pool.query("INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
            [
                req.body.firstName,
                req.body.lastName,
                req.body.username,
                hashedPassword,
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