import { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';

import { db } from '~/lib/db';
import { PAGES } from '~/lib/constants';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXTAUTH_SECRET_EXPIRES_IN) || 86400 // Domyślnie 1 dzień
  },
  pages: {
    signIn: PAGES.SIGN_IN
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials provider',
      credentials: {
        username: { label: 'Username', type: 'text', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await db.user.findUnique({
          where: {
            username: credentials.username
          }
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          username: user.username
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...(session.user || {}), // Zapewnia, że `user` istnieje
          id: token.id ?? '',
          username: token.username ?? ''
        }
      };
    }
  }
};
