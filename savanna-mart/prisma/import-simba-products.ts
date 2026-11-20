import { PrismaClient } from "@prisma/client";
import simbaCatalog from "../simba_products.json";

const prisma = new PrismaClient();

type SimbaProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategoryId: number;
  inStock: boolean;
  image: string;
  unit: string;
};

type SimbaCatalog = {
  products: SimbaProduct[];
};

function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

function productDescription(product: SimbaProduct) {
  return `${product.name} from Simba Supermarket. Available in ${product.unit} units.`;
}

async function main() {
  const catalog = simbaCatalog as SimbaCatalog;
  const categoryByKey = new Map<string, string>();

  console.log(`Importing ${catalog.products.length} Simba products...`);

  for (const product of catalog.products) {
    const mainSlug = slugify(product.category);
    const subSlug = `simba-subcategory-${product.subcategoryId}-${mainSlug}`;
    const categoryKey = `${mainSlug}:${product.subcategoryId}`;

    let categoryId = categoryByKey.get(categoryKey);

    if (!categoryId) {
      const mainCategory = await prisma.category.upsert({
        where: { slug: mainSlug },
        update: { name: product.category },
        create: {
          name: product.category,
          slug: mainSlug,
        },
      });

      const subCategory = await prisma.category.upsert({
        where: { slug: subSlug },
        update: {
          name: `Simba Subcategory ${product.subcategoryId}`,
          parentId: mainCategory.id,
        },
        create: {
          name: `Simba Subcategory ${product.subcategoryId}`,
          slug: subSlug,
          parentId: mainCategory.id,
        },
      });

      categoryId = subCategory.id;
      categoryByKey.set(categoryKey, categoryId);
    }

    const sku = `SIMBA-${product.id}`;

    await prisma.product.upsert({
      where: { sku },
      update: {
        name: product.name,
        slug: slugify(`${product.name}-${product.id}`),
        description: productDescription(product),
        price: product.price,
        stock: product.inStock ? 100 : 0,
        images: product.image,
        categoryId,
      },
      create: {
        name: product.name,
        slug: slugify(`${product.name}-${product.id}`),
        description: productDescription(product),
        sku,
        brand: "Simba",
        price: product.price,
        stock: product.inStock ? 100 : 0,
        images: product.image,
        categoryId,
        featured: product.id % 25 === 0,
      },
    });
  }

  console.log("Simba product import finished.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
