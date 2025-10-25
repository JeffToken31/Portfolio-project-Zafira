import { PrismaClient, ManualStatisticType, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // ---- ADMIN USER ----
  const adminEmail = 'admin@example.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('ChangeMe123!', 10);

    // Création de l'utilisateur avec relation Credential + PasswordCredential
    await prisma.user.create({
      data: {
        email: adminEmail,
        role: Role.ADMIN,
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

    console.log('✅ Created admin user with credentials');
  } else {
    console.log('↩️  Admin user already exists');
  }

  // ---- MANUAL STATISTICS ----
  console.log('🌱 Seeding manual statistics...');

  const types: ManualStatisticType[] = [
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

  console.log('✅ Seeding completed.');
}

// ---- EXECUTION ----
main()
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('❌ Error during seeding:', err.message);
    } else {
      console.error('❌ Unknown error during seeding:', err);
    }
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
