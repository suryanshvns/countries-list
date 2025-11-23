#!/usr/bin/env node

/**
 * Quick SEO Verification Script
 *
 * Usage:
 *   npm run check-seo
 *   node scripts/check-seo.js http://localhost:3000
 */

const baseUrl = process.argv[2] || 'http://localhost:3000';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

async function checkURL(path, description) {
  try {
    const url = `${baseUrl}${path}`;
    const response = await fetch(url);
    const status = response.ok ? '✓' : '✗';
    const color = response.ok ? colors.green : colors.red;

    console.log(`${color}${status}${colors.reset} ${description}`);
    console.log(`   ${url}`);

    if (!response.ok) {
      console.log(`   ${colors.red}Status: ${response.status}${colors.reset}`);
    }

    return response.ok;
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${description}`);
    console.log(`   ${colors.red}Error: ${error.message}${colors.reset}`);
    return false;
  }
}

async function checkMetadata(path) {
  try {
    const url = `${baseUrl}${path}`;
    const response = await fetch(url);
    const html = await response.text();

    const checks = {
      title: /<title[^>]*>([^<]+)<\/title>/i.test(html),
      description: /<meta[^>]*name=["']description["'][^>]*>/i.test(html),
      ogTitle: /<meta[^>]*property=["']og:title["'][^>]*>/i.test(html),
      ogDescription: /<meta[^>]*property=["']og:description["'][^>]*>/i.test(html),
      structuredData: /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html),
      canonical: /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html),
    };

    console.log(`\n${colors.blue}Metadata Check for ${path}:${colors.reset}`);
    Object.entries(checks).forEach(([key, value]) => {
      const status = value ? '✓' : '✗';
      const color = value ? colors.green : colors.red;
      console.log(`  ${color}${status}${colors.reset} ${key}`);
    });

    return Object.values(checks).every(v => v);
  } catch (error) {
    console.log(`${colors.red}✗ Metadata check failed: ${error.message}${colors.reset}`);
    return false;
  }
}

async function main() {
  console.log(`\n${colors.blue}🔍 SEO Verification for ${baseUrl}${colors.reset}\n`);

  // Basic checks
  console.log(`${colors.yellow}Basic Checks:${colors.reset}`);
  await checkURL('/', 'Homepage');
  await checkURL('/sitemap.xml', 'Sitemap');
  await checkURL('/robots.txt', 'Robots.txt');
  await checkURL('/countries/Albania', 'Country Detail Page (Example)');

  // Metadata checks
  console.log(`\n${colors.yellow}Metadata Checks:${colors.reset}`);
  await checkMetadata('/');
  await checkMetadata('/countries/Albania');

  console.log(`\n${colors.green}✅ SEO check complete!${colors.reset}`);
  console.log(`\n${colors.yellow}Next Steps:${colors.reset}`);
  console.log('1. Test with Google Rich Results Test: https://search.google.com/test/rich-results');
  console.log('2. Test with PageSpeed Insights: https://pagespeed.web.dev/');
  console.log('3. Set up Google Search Console: https://search.google.com/search-console');
  console.log('4. Submit your sitemap in Search Console\n');
}

main().catch(console.error);
