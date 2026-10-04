import Shop from "@/components/Shop";

export const metadata = {
  title: "Shop · Gabo en Asia",
};

export default async function ShopPage({ searchParams }) {
  const { wishlist, page } = await searchParams;
  const wishlistOnly = wishlist === "1";
  const initialPage = Math.max(1, parseInt(page, 10) || 1);

  // key resets the filters when switching between "all" and "wishlist" via the navbar
  return <Shop key={wishlistOnly ? "wishlist" : "all"} initialWishlistOnly={wishlistOnly} initialPage={initialPage} />;
}
