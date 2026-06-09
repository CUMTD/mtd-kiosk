export default interface SystemPricingPlans {
	version: string;
	ttl: number;
	last_updated: number;
	data: Data;
}

export interface Data {
	plans: Plan[];
}

export interface Plan {
	plan_id: string;
	name: string;
	currency: string;
	price: number;
	is_taxable: boolean;
	description: string;
	per_min_pricing: PerMinPricing[];
}

export interface PerMinPricing {
	start: number;
	rate: number;
	interval: number;
}
