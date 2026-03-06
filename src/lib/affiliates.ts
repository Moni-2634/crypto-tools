// Affiliate link management
// Replace placeholder IDs with your actual affiliate IDs after signing up

export interface AffiliateProgram {
  name: string;
  description: string;
  url: string;
  commission: string;
  category: "hardware-wallet" | "exchange" | "developer-tool" | "education";
}

export const affiliates: Record<string, AffiliateProgram> = {
  ledger: {
    name: "Ledger",
    description: "Industry-leading hardware wallet for securing your crypto assets",
    url: "https://shop.ledger.com/?r=YOUR_LEDGER_AFFILIATE_ID",
    commission: "10-15% per sale",
    category: "hardware-wallet",
  },
  trezor: {
    name: "Trezor",
    description: "Open-source hardware wallet trusted by millions",
    url: "https://trezor.io/?offer_id=XXX&aff_id=YOUR_TREZOR_AFFILIATE_ID",
    commission: "10-12% per sale",
    category: "hardware-wallet",
  },
  bybit: {
    name: "Bybit",
    description: "Leading crypto exchange with advanced trading features",
    url: "https://www.bybit.com/invite?ref=YOUR_BYBIT_REF",
    commission: "$20-50 per signup",
    category: "exchange",
  },
  binance: {
    name: "Binance",
    description: "World's largest crypto exchange by trading volume",
    url: "https://accounts.binance.com/register?ref=YOUR_BINANCE_REF",
    commission: "Up to 50% commission",
    category: "exchange",
  },
  alchemy: {
    name: "Alchemy",
    description: "Enterprise-grade blockchain development platform",
    url: "https://www.alchemy.com/?r=YOUR_ALCHEMY_REF",
    commission: "$20-100 per conversion",
    category: "developer-tool",
  },
  quicknode: {
    name: "QuickNode",
    description: "Fast and reliable blockchain infrastructure",
    url: "https://www.quicknode.com/?ref=YOUR_QUICKNODE_REF",
    commission: "$20-100 per conversion",
    category: "developer-tool",
  },
};

export function getAffiliatesByCategory(category: AffiliateProgram["category"]): AffiliateProgram[] {
  return Object.values(affiliates).filter((a) => a.category === category);
}

export function getAffiliate(key: string): AffiliateProgram | undefined {
  return affiliates[key];
}
