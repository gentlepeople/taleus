import { seedPrisma } from './seed.config';
import { seedGenerator } from './seed.generator';

async function main() {
  await seedGenerator();
}

main()
  .then(async () => {
    await seedPrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await seedPrisma.$disconnect();
    process.exit(1);
  });
