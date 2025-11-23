# Vercel Deployment & SEO Setup

## 🚀 Quick Setup for Your Website

Your website is deployed at:
**https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app**

## 📋 Required Environment Variable

### Set NEXT_PUBLIC_SITE_URL in Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `countries-list-y9am`
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app`
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. **Redeploy** your application for changes to take effect

## ✅ SEO Verification Checklist

### 1. Test Your Sitemap
Visit: https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app/sitemap.xml

Should show:
- Homepage URL
- All country detail pages (195+ pages)

### 2. Test Robots.txt
Visit: https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app/robots.txt

Should include:
- Sitemap reference
- Allow rules for countries

### 3. Test Structured Data
Use Google Rich Results Test:
1. Go to: https://search.google.com/test/rich-results
2. Enter: `https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app/countries/Albania`
3. Should detect "Country" schema

### 4. Test Page Speed
Use PageSpeed Insights:
1. Go to: https://pagespeed.web.dev/
2. Enter your homepage URL
3. Check Performance, SEO, and Accessibility scores

### 5. Set Up Google Search Console

1. **Add Property**:
   - Go to: https://search.google.com/search-console
   - Click "Add Property"
   - Enter: `https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app`

2. **Verify Ownership**:
   - Choose "HTML tag" method
   - Copy the meta tag
   - Add it to `src/app/layout.tsx` in the `<head>` section
   - Deploy and verify

3. **Submit Sitemap**:
   - Go to "Sitemaps" in Search Console
   - Enter: `sitemap.xml`
   - Click "Submit"
   - Wait for indexing (can take days/weeks)

## 🔍 Quick SEO Tests

### Test Homepage:
https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app/

### Test Country Page:
https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app/countries/Albania

### Test SEO Dashboard:
https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app/seo-test

## 📊 Monitor SEO Progress

### Week 1-2:
- Google discovers and crawls your site
- Check Search Console for crawl errors

### Week 2-4:
- Pages start appearing in search results
- Monitor impressions and clicks

### Month 1-3:
- Rankings stabilize
- Track keyword positions
- Optimize based on data

## 🎯 Target Keywords

Your site should rank for:
- "countries of the world"
- "country information"
- "country flags"
- "[Country Name] information"
- "[Country Name] flag"
- "list of countries"

## ⚠️ Important Notes

1. **Environment Variable**: Make sure `NEXT_PUBLIC_SITE_URL` is set in Vercel
2. **HTTPS**: Your site is already on HTTPS (good for SEO)
3. **Custom Domain**: Consider adding a custom domain for better branding
4. **Regular Monitoring**: Check Search Console weekly

## 🔗 Useful Links

- **Your Website**: https://countries-list-y9am-iaohqz3vk-suryanshvns-projects.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Search Console**: https://search.google.com/search-console
- **PageSpeed Insights**: https://pagespeed.web.dev/

---

**Next Steps:**
1. ✅ Set `NEXT_PUBLIC_SITE_URL` in Vercel
2. ✅ Redeploy your application
3. ✅ Test sitemap and robots.txt
4. ✅ Set up Google Search Console
5. ✅ Submit sitemap
6. ✅ Monitor weekly
