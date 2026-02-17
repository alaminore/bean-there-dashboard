import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findAdminById, findAdminByUsername } from "../services/database";
import { validatePassword } from "../helpers/encryption";

// Use username/password
passport.use (
    new LocalStrategy(async (username, password, done) => {
        console.log('LocalStrategy executing for:', username); // REMOVELATER
        try {
            const admin = await findAdminByUsername(username);
            console.log('Admin found:', admin); // REMOVELATER
            
            if (!admin) {
                return done(null, false, { message: 'Invalid username or password.'});
            }

            const isValid = await validatePassword(password, admin.passwordHash);
            console.log('Password valid:', isValid); // REMOVELATER

            if (!isValid) {
                return done(null, false, { message: 'Invalid username or password.'});
            }

            return done(null, admin);

        } catch (error) {
            console.error('Strategy error:', error); // REMOVELATER
            return done(error);
        }
}))

// Serialize the user
passport.serializeUser ((user: any, done) => {
    done(null, user.id);
});

// Deserialize the user from a session
passport.deserializeUser (async (id: number, done) => {
    try {
        const admin = await findAdminById(id);
        if (!admin) {
            return done(new Error('User not found.'));
        }

        done(null, admin);
    } catch (error) {
        done(error);
    }
});


console.log('Passport configured'); // REMOVELATER

export default passport;