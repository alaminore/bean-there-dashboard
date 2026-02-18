import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Check if admins already exist
  const existingAdmins = await prisma.admin.findMany();
  
  if (existingAdmins.length > 0) {
    console.log('Admin users already exist, skipping seed.');
    return;
  }

  // Create admin users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const demoPassword = await bcrypt.hash('demo', 10);

  await prisma.admin.createMany({
    data: [
      {
        username: 'admin',
        passwordHash: adminPassword,
        role: UserRole.ADMIN
      },
      {
        username: 'demo',
        passwordHash: demoPassword,
        role: UserRole.VIEWER
      }
    ]
  });

  console.log('Admin users created! 🎉');
  console.log('Login: admin / admin123 (full access)');
  console.log('Login: demo / demo (read-only)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });