# Universal Links for ScanLens

**Team ID:** `UDPYWUZSSG`
**App ID:** `UDPYWUZSSG.app.scanlens.ios`
**Target URL:** `https://scanlens.io/.well-known/apple-app-site-association`

---

## Deployment to Cloudflare Pages

### Step 1: Open Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Select your account
3. Click **"Pages"** in left sidebar

### Step 2: Create Project

1. Click **"Create a project"**
2. Click **"Direct Upload"** (не Connect to Git)
3. Project name: `scanlens-io`
4. Click **"Create project"**

### Step 3: Upload Files

1. Drag and drop содержимое папки `deploy/universal-links/`:
   - `.well-known/` folder
   - `auth/` folder
   - `_headers`
   - `_redirects`
2. Click **"Deploy site"**

### Step 4: Add Custom Domain

1. Go to **Custom domains** tab
2. Click **"Set up a custom domain"**
3. Enter: `scanlens.io`
4. Follow DNS instructions

**DNS Record (add in your domain registrar):**
```
Type: CNAME
Name: @ (or scanlens.io)
Target: scanlens-io.pages.dev
```

### Step 5: Verify

```bash
curl https://scanlens.io/.well-known/apple-app-site-association
```

Expected output:
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "UDPYWUZSSG.app.scanlens.ios",
        ...
      }
    ]
  }
}
```

---

## Files Included

| File | Purpose |
|------|---------|
| `.well-known/apple-app-site-association` | iOS Universal Links config |
| `auth/callback.html` | Fallback page if app not installed |
| `_headers` | Sets Content-Type: application/json |
| `_redirects` | Routes /auth/callback to HTML |

---

## After Deployment: Xcode Setup

Add Associated Domains in Xcode:

1. Target → Signing & Capabilities
2. + Capability → Associated Domains
3. Add:
   - `applinks:scanlens.io`
   - `webcredentials:scanlens.io`

---

## After Deployment: Supabase Setup

Dashboard → Authentication → URL Configuration:

- Site URL: `https://scanlens.io`
- Redirect URLs:
  - `https://scanlens.io/auth/callback`
  - `app.scanlens.ios://auth/callback`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| AASA returns 404 | Check `.well-known` folder uploaded |
| Wrong Content-Type | Check `_headers` file exists |
| App doesn't open | Wait 24h (iOS caches AASA) |
| SSL error | Wait for Cloudflare SSL cert |
