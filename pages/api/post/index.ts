import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const session = await getServerSession(req,res,authOptions);
  const { title, content } = req.body;
  delete req.body
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}