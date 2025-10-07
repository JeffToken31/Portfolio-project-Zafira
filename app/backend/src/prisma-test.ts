import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function test() {
  // Création d'un blog
  const newBlog = await prisma.blog.create({
    data: {
      id: crypto.randomUUID(),
      title: 'My second Blog',
      slug: 'my-second-blog',
      content: 'Hello World!',
      excerpt: 'null', // ✅ Obligatoire
      coverImageUrl: null, // optionnel
      mediaUrl: null, // optionnel
      mediaType: null, // optionnel
      published: true,
      publishedAt: null, // optionnel
    },
  });

  console.log('Created blog:', newBlog);

  // Liste tous les blogs
  const blogs = await prisma.blog.findMany();
  console.log('All blogs:', blogs);

  await prisma.$disconnect();
}

test();
