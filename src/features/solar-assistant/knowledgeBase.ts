import { SAHAJA_COMPANY_INFO, SERVICES_CONFIG } from '@/data/siteConfig';
import { CALCULATOR_CONFIG } from '@/features/solar-calculator/config';
import { SUBSIDY_CONFIG } from '@/features/subsidy/config';
import { SOLAR_PROCESS_STAGES } from '@/data/solarProcessData';
import { SAHAJA_PROJECTS } from '@/data/projectsData';
import { SOLAR_PRODUCT_CATEGORIES } from '@/data/solarProductsData';
import { SAHAJA_BRANDS } from '@/data/solarBrandsData';
import { SAHAJA_TESTIMONIALS } from '@/data/testimonialsData';

export const getNormalizedAssistantKnowledge = () => {
  const verifiedBrands = SAHAJA_BRANDS.filter((b) => b.verified && b.enabled);
  const verifiedProjects = SAHAJA_PROJECTS.filter((p) => !p.isPlaceholder);
  const verifiedTestimonials = SAHAJA_TESTIMONIALS.filter((t) => t.verified && t.enabled);

  return {
    company: {
      name: SAHAJA_COMPANY_INFO.name,
      legalName: SAHAJA_COMPANY_INFO.legalName,
      contacts: SAHAJA_COMPANY_INFO.contacts,
      email: SAHAJA_COMPANY_INFO.email,
      primaryMarket: SAHAJA_COMPANY_INFO.primaryMarket,
    },
    services: SERVICES_CONFIG.map((s) => ({
      title: s.title,
      description: s.description,
    })),
    calculatorConfig: {
      tariffRate: CALCULATOR_CONFIG.assumptions.avgTariffPerKwh,
      dailySunHours: CALCULATOR_CONFIG.assumptions.generationKwhPerKwPerDay / 4, // Approx sun hours from daily generation
      pricingConfigured: CALCULATOR_CONFIG.productionPricing[1].baseCostInr !== null,
    },
    subsidyConfig: {
      schemeName: SUBSIDY_CONFIG.schemeName,
      isConfigured: SUBSIDY_CONFIG.isConfigured,
      description: SUBSIDY_CONFIG.description,
      notes: SUBSIDY_CONFIG.notes,
      eligibilityChecklist: SUBSIDY_CONFIG.eligibilityChecklist,
      processSteps: SUBSIDY_CONFIG.processSteps,
    },
    processStages: SOLAR_PROCESS_STAGES.map((p) => ({
      index: p.index,
      title: p.title,
      description: p.description,
    })),
    productCategories: SOLAR_PRODUCT_CATEGORIES.map((cat) => ({
      category: cat.category,
      description: cat.description,
      considerations: cat.considerations,
    })),
    verifiedBrands: verifiedBrands.map((b) => b.name),
    verifiedProjects: verifiedProjects.map((p) => ({
      title: p.title,
      location: p.location,
      capacityKw: p.capacityKw,
    })),
    verifiedTestimonialsCount: verifiedTestimonials.length,
  };
};
