import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Cubos@2025', 10);
  const user = await prisma.user.upsert({
    where: { email: 'cubos@cubos.io' },
    update: {},
    create: {
      email: 'cubos@cubos.io',
      name: 'Cubos Tecnologia',
      password: hashedPassword,
    },
  });

  const movies = [
    {
      originalTitle: 'Bumblebee',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 115,
      releaseDate: new Date('2024-07-25'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748630353397-aicnbd.png',
      trailerUrl: 'https://www.youtube.com/watch?v=lcwmDAYt22k',
    },
    {
      originalTitle: 'Capitã Marvel',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 130,
      releaseDate: new Date('2024-05-23'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636043548-uul4f.png',
    },
    {
      originalTitle: 'Alita: Anjo de combate',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 140,
      releaseDate: new Date('2024-10-04'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636034581-4frki.png',
    },
    {
      originalTitle: 'Como treinar seu dragão 3',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 135,
      releaseDate: new Date('2024-05-24'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636048236-212zx.png',
    },
    {
      originalTitle: 'Aquaman',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 125,
      releaseDate: new Date('2024-03-22'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748620233078-0844ts.webp',
      trailerUrl: 'https://www.youtube.com/watch?v=02S12LD75bc&t=1s',
    },
    {
      originalTitle: 'O menino que queria ser rei',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 145,
      releaseDate: new Date('2024-04-12'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636097517-dneg6e.png',
    },
    {
      originalTitle: 'Megarromântico',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 95,
      releaseDate: new Date('2024-06-14'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636093685-a5tygy.png',
    },
    {
      originalTitle: 'Uma nova chance',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 94,
      releaseDate: new Date('2024-03-28'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636101684-gcy52.png',
    },
    {
      originalTitle: 'Homem-aranha no aranhaverso',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 120,
      releaseDate: new Date('2024-11-08'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636052647-k1k2o8.png',
    },
    {
      originalTitle: 'Máquinas Mortais',
      synopsis: 'A história não contada das bruxas de Oz.',
      duration: 150,
      releaseDate: new Date('2024-11-27'),
      imageUrl:
        'https://my-cubos-bucket.s3.us-east-2.amazonaws.com/movies/1748636059667-yikvf9.png',
    },
    {
      originalTitle: 'O livro de Eli',
      synopsis:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 118,
      releaseDate: new Date('2024-12-20'),
      imageUrl:
        'https://my-cubos-bucket.s3.amazonaws.com/movies/1748636699084-dcgefh.jpg',
    },
  ];

  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        ...movie,
        portugueseTitle: movie.originalTitle,
        popularity: 0,
        voteCount: 0,
        budget: 0,
        revenue: 0,
        originalLanguage: 'en',
        user: { connect: { id: user.id } },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
