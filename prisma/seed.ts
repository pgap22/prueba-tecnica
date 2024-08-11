const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nombre: 'Ropa' },
    { nombre: 'Tecnológicos' },
    { nombre: 'Muebles' }
  ];

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria,
    });
  }

  console.log('Seeding de categorías completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });