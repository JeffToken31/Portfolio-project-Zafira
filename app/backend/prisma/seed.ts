import { PrismaClient, ManualStatisticType, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding manual statistics...');

  // Seed des manual statistics
  const types = [
    ManualStatisticType.BENEFICIARIES,
    ManualStatisticType.CLOTHES_KG,
    ManualStatisticType.WORKSHOPS,
  ];

  for (const type of types) {
    const existing = await prisma.manualStatistic.findUnique({
      where: { type },
    });

    if (!existing) {
      await prisma.manualStatistic.create({
        data: {
          type,
          totalQuantity: 0,
        },
      });
      console.log(`✅ Created manual statistic: ${type}`);
    } else {
      console.log(`↩️  Manual statistic already exists: ${type}`);
    }
  }

  // Seed admin user
  const adminEmail = 'admin@example.com';
  const adminPassword = 'ChangeMe123!'; // à changer après le seed

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        emailVerified: true,
        role: Role.ADMIN,
        firstName: 'Admin',
        lastName: 'User',
        credentials: {
          create: {
            password: {
              create: {
                passwordHash: hashedPassword,
              },
            },
          },
        },
      },
    });

    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`↩️ Admin user already exists: ${adminEmail}`);
  }

  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
