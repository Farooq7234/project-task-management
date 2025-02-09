import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user in database
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        if (!existingUser.length) {
          throw new Error("User not found");
        }

        const user = existingUser[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
