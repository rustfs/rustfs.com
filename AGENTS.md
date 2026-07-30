# AGENTS.md - AI Agent Development Guidelines

This document provides development guidelines and rules for AI Agents to ensure code quality and smooth CI/CD pipeline execution.

## 📋 Project Overview

- **Project Name**: RustFS.com - Official Website
- **Framework**: Next.js 16.2.11 (App Router, Static Export)
- **Language**: TypeScript (ES2025+, Strict Mode)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **CI/CD**: GitHub Actions → Aliyun OSS

## 🚨 Core Rules

### ⚠️ Pre-Commit Checklist

**Before every code commit, ensure ALL of the following checks pass:**

1. **✅ TypeScript Type Checking**

   ```bash
   # Ensure no TypeScript errors
   npx tsc --noEmit
   ```

2. **✅ ESLint Code Checking**

   ```bash
   pnpm run lint
   ```

3. **✅ Local Build Test**

   ```bash
   # Clean previous builds
   rm -rf .next out

   # Execute build
   pnpm run build

   # Ensure build succeeds without errors
   ```

4. **✅ Dependency Lock File Synchronization**
   - If using `pnpm install` to update dependencies, ensure `pnpm-lock.yaml` is updated

5. **✅ Build Artifact Verification**
   - Ensure `out/` directory is generated
   - Ensure `out/sitemap.xml` is generated (automatically by postbuild script)
   - Check build artifacts are complete

## 🔄 CI/CD Pipeline Overview

### GitHub Actions Workflow Steps

According to `.github/workflows/deploy.yml`, the CI process includes:

1. **Checkout**: Check out code

2. **Install pnpm**:

3. **Use Node.js**:

4. **Install dependencies and build**:

   ```bash
   pnpm install --no-frozen-lockfile
   pnpm run build
   ```

5. **Deploy**: Deploy to Aliyun OSS

### Local CI Simulation

Before committing, it's recommended to simulate the complete CI process locally:

```bash
# 1. Clean environment
rm -rf node_modules .next out

# 2. Install dependencies (using pnpm, consistent with CI)
pnpm install

# 3. Build project
pnpm run build

# 4. Verify build artifacts
ls -la out/
ls -la out/sitemap.xml

# 5. Run lint
pnpm run lint
```

## 📝 Development Standards

### Code Style

- ✅ Use TypeScript strict mode
- ✅ Follow ESLint configuration rules
- ✅ Use functional components and Hooks
- ✅ Use Tailwind CSS for styling
- ✅ Client components must be marked with `'use client'`

### Component Development

- ✅ Use `cn()` function to merge class names
- ✅ Support dark mode and responsive design
- ✅ Follow shadcn/ui component standards
- ✅ Maintain single responsibility principle

### Style and Structure Protection

**🚨 Absolute Rule: Do NOT modify styles or structure unless explicitly specified!**

- ❌ **Forbidden** to modify existing CSS classes, layout structure, or component design
- ❌ **Forbidden** to simplify complex components or remove visual elements
- ❌ **Forbidden** to replace custom components with basic UI components
- ❌ **Forbidden** to modify animations, transitions, or interactive behaviors
- ❌ **Forbidden** to change responsive design or dark mode implementations

### Git Commit Standards

- ✅ Use [Conventional Commits](https://www.conventionalcommits.org/) specification
- ✅ Commit messages must be in English
- ✅ Format: `<type>[optional scope]: <description>`
- ✅ Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:

```bash
feat: add contact form with hCaptcha
fix: correct button alignment on mobile
docs: update README with new features
```

## 🛠️ Common Issues Troubleshooting

### Issue 1: CI Build Failure - Dependency Installation Error

**Symptoms**: `Install dependencies` step fails

**Causes**:

- `pnpm-lock.yaml` out of sync with `package.json`

**Solution**:

```bash
# Reinstall dependencies with pnpm to update lock file
pnpm install

# Commit updated pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "fix: update pnpm-lock.yaml"
```

### Issue 2: CI Build Failure - TypeScript Errors

**Symptoms**: TypeScript type errors during build

**Solution**:

```bash
# Check TypeScript errors locally
npx tsc --noEmit

# Fix all type errors before committing
```

### Issue 3: CI Build Failure - ESLint Errors

**Symptoms**: Lint check fails

**Solution**:

```bash
# Run lint check locally
pnpm run lint

# Fix all lint errors before committing
```

### Issue 4: Build Succeeds but Deployment Fails

**Symptoms**: Build passes but deployment step fails

**Checklist**:

- Ensure `out/` directory exists
- Ensure `out/sitemap.xml` is generated
- Check build artifacts are complete

## 📚 Related Resources

- [Project README](./README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ESLint Documentation](https://eslint.org/docs/latest)

## ✅ Pre-Commit Checklist

Before every code commit, confirm:

- [ ] TypeScript type check passes (`npx tsc --noEmit`)
- [ ] ESLint check passes (`pnpm run lint`)
- [ ] Local build succeeds (`pnpm run build`)
- [ ] `pnpm-lock.yaml` is updated (if dependencies were modified)
- [ ] Build artifacts `out/` directory exists and is complete
- [ ] `out/sitemap.xml` is generated
- [ ] Commit message follows Conventional Commits specification
- [ ] Commit message is in English

**Remember: If local build fails, CI will also fail. Do NOT commit code that cannot pass local build!**

---

**Last Updated**: 2026-01-06
