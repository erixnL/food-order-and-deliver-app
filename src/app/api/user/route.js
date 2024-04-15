import NextAuth from "next-auth/next";

import { connectToDB } from "@/utlis/database";
import User from "@/models/user";


const handler = NextAuth({
    providers: [],
    callbacks: {
        // Session callback to store the user ID from MongoDB to the session
        async session({ session }) {
            // Connect to the database
            await connectToDB();

            // Find the user in the database based on their email
            const sessionUser = await User.findOne({ email: session.user.email });

            // If the user exists, set their ID in the session object
            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }

            return session;
        },
        // Sign-in callback to handle user creation and sign-in
        async signIn({ account, profile, user, credentials }) {
            // Connect to the database
            await connectToDB();

            try {
                // Check if the user already exists in the database
                const existingUser = await User.findOne({ email: credentials.email });

                // If the user does not exist, create a new user
                if (!existingUser) {
                    const newUser = new User({
                        email: credentials.email,
                        username: credentials.username,
                        password: credentials.password,
                        role: credentials.role,
                        postcode: credentials.postcode,
                        payment: credentials.payment,
                    });

                    // Save the new user to the database
                    await newUser.save();
                }

                return true; // Allow the sign-in
            } catch (error) {
                console.error("Error during sign-in:", error.message);
                return false; // Deny the sign-in
            }
        },
    },
});
  
  export { handler as GET, handler as POST }
