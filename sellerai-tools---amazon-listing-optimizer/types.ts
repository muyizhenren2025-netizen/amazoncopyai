
export interface ProductInput {
  name: string;
  brand: string;
  sellingPoints: string[];
  category: string;
}

export interface GeneratedContent {
  titles: string[];
  bulletPoints: {
    fabeSet: {
      feature: string;
      advantage: string;
      benefit: string;
      evidence: string;
      combined: string;
    }[];
  }[];
  searchTerms: string[];
}

export interface PaywallStatus {
  isPremium: boolean;
  trialUsed: boolean;
}

export enum SubscriptionTier {
  TRIAL = 'trial',
  ONE_TIME = 'one_time',
  MONTHLY = 'monthly',
  ANNUAL = 'annual'
}
