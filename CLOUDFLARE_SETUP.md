# Cloudflare Setup for DDoS Protection

## Step 1: Add Domain to Cloudflare

1. Go to https://dash.cloudflare.com
2. Click "Add a Site"
3. Enter your domain: `soham.lol`
4. Select Free plan
5. Click "Continue"

## Step 2: Update Nameservers

Cloudflare will provide you with 2 nameservers like:
```
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```

1. Go to your domain registrar (where you bought soham.lol)
2. Find DNS/Nameserver settings
3. Replace existing nameservers with Cloudflare's nameservers
4. Wait 24-48 hours for propagation (usually faster)

## Step 3: Configure DNS Records

In Cloudflare dashboard, go to DNS → Records:

1. **A Record** (if using GitHub Pages IP):
   - Type: A
   - Name: @
   - IPv4 address: `185.199.108.153`
   - Proxy status: **Proxied** (Orange cloud)

2. **CNAME Record** (alternative):
   - Type: CNAME
   - Name: @
   - Target: `vyassoham.github.io`
   - Proxy status: **Proxied** (Orange cloud)

3. **WWW Record**:
   - Type: CNAME
   - Name: www
   - Target: `soham.lol`
   - Proxy status: **Proxied**

## Step 4: SSL/TLS Settings

Go to SSL/TLS → Overview:
- Set SSL/TLS encryption mode to: **Full (strict)**

## Step 5: Enable Security Features

### A. Firewall Rules
Go to Security → WAF:
- Enable "OWASP ModSecurity Core Rule Set"
- Create custom rule:
  ```
  Field: User Agent
  Operator: contains
  Value: bot
  Action: Block
  ```

### B. DDoS Protection
Go to Security → DDoS:
- **Automatically enabled** on all plans
- Advanced DDoS protection included

### C. Bot Fight Mode
Go to Security → Bots:
- Enable "Bot Fight Mode" (Free plan)
- This blocks known bad bots

### D. Rate Limiting (Paid feature, but alternative below)
For free alternative, use Workers:
```javascript
// Cloudflare Worker for basic rate limiting
export default {
  async fetch(request) {
    const ip = request.headers.get('CF-Connecting-IP');
    // Implement your rate limiting logic
    return fetch(request);
  }
}
```

## Step 6: Page Rules (Performance)

Go to Rules → Page Rules:

1. **Cache Everything**:
   - URL: `soham.lol/*`
   - Setting: Cache Level → Cache Everything
   - Edge Cache TTL: 2 hours

2. **Force HTTPS**:
   - URL: `http://soham.lol/*`
   - Setting: Always Use HTTPS

## Step 7: Speed Optimizations

Go to Speed → Optimization:
- ✅ Auto Minify: HTML, CSS, JavaScript
- ✅ Brotli compression
- ✅ Early Hints
- ✅ Rocket Loader (optional, may break some scripts)

## Verification

After setup, check:
1. `https://www.whatsmydns.net/` - DNS propagation
2. `https://www.cloudflare.com/ssl/encrypted-sni/` - SSL working
3. Test DDoS: Your site should stay up under heavy traffic

## Security Headers (Advanced)

Add to Cloudflare Workers or Transform Rules:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
```

## Expected Results

✅ DDoS protection (up to 100+ Gbps attacks blocked)
✅ SSL/TLS encryption
✅ Bot mitigation
✅ 50%+ faster load times
✅ Content theft prevention
✅ Always online (if origin down)

## Monitoring

Check Cloudflare Analytics:
- Security → Analytics
- Speed → Analytics
- Traffic patterns and blocked threats
