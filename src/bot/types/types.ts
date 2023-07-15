interface TCommissionRates {
  maker: number;
  taker: number;
}

interface TBalance {
  name: string;
  asset: string;
  free: string;
  locked: string;
}

interface TAccount {
  userid: number;
  status: number;
  country_id: number;
  risk_level: number;
  package_id: number;
  gsm: number;
  email: string;
  country_code: number;
  oauth_specs: number;
  oauth_status: number;
  name: string;
  specs: number;
  member_specs: number;
  member_type: number;
  createdAt: string;
  last_login: string;
  fullgsm: string;
  commissionRates: TCommissionRates;
  balances: TBalance[];
}

interface TTrade {
  trade_id: number;
  price: number;
  base_volume: number;
  quote_volume: number;
  timestamp: number;
  type: "buy" | "sell";
}

interface TOrderBooks {
  bids: [number, number][];
  asks: [number, number][];
}

export { TAccount, TBalance, TCommissionRates, TOrderBooks, TTrade };
