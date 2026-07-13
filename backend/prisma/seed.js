const bcrypt = require("bcrypt");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

const DEFAULT_ADMIN = {
  name: "System Administrator User",
  email: "admin@example.com",
  address: "Admin Headquarter Office",
};

async function main() {
  const adminEmail = DEFAULT_ADMIN.email;

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log("✅ Default admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: DEFAULT_ADMIN.name,
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
      address: DEFAULT_ADMIN.address,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Default Admin created successfully.");
  console.log("-----------------------------------------");
  console.log("Email    : admin@example.com");
  console.log("Password : Admin@123");
  console.log("-----------------------------------------");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });