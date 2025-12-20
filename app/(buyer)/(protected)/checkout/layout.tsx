import { CheckoutProvider } from "@/features/purchase/checkout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
