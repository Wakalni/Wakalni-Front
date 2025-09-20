import { Layout } from "@/components/clients/Layout";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout title="Checkout" showBackButton>
      {children}
    </Layout>
  );
}
