import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    providers: [
        CredentialsProvider({
          // The name to display on the sign-in form (e.g. "Sign in with...")
          name: 'Credentials',
          // The credentials form fields
          credentials: {
            email: { label: 'Email', type: 'email', required: true },
            password: { label: 'Password', type: 'password', required: true },
          },
          // Authentication function
          async authorize(credentials, req) {
            // Connect to the database
            await connectToDB();
    
            // Find the user by email
            const user = await User.findOne({ email: credentials.email });
    
            if (!user) {
              throw new Error('No user found with this email');
            }
    
            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    
            if (!isPasswordValid) {
              throw new Error('Incorrect password');
            }
    
            // If authentication is successful, return the user object
            return user;
          },
        }),
      ],
    callbacks: {
        async session({ session, token }) {
          // Attach user ID to session object
          if (token && token.userId) {
            session.user.id = token.userId;
          }
          return session;
        },
        async jwt({ token, user }) {
          // Attach user ID to token
          if (user) {
            token.userId = user._id;
          }
          return token;
        },
      },
    }
)
  
export { handler as GET, handler as POST }