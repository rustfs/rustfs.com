# RustFS.com - Official Website

RustFS.com is the official website for the RustFS distributed storage system, built with Next.js, providing a modern user experience and comprehensive documentation showcase.

## 🚀 Project Overview

RustFS is a high-performance distributed object storage system developed in Rust, compatible with S3 protocol. This website showcases RustFS's product features, architecture design, solutions, and download information.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript (ES2022+, Strict Mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes (Dark Mode Support)
- **Animation**: motion + tw-animate-css
- **Internationalization**: Chinese primary (lang="zh-CN")

## 📁 Project Structure

```
rustfs.com/
├── app/                    # Next.js App Router directory
│   ├── components/         # Page-level components
│   │   ├── buttons/       # Button component collection
│   │   └── *.tsx         # Feature components
│   ├── download/          # Download page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # Common component library
│   ├── ui/               # shadcn/ui components
│   └── magicui/         # Custom UI components
├── data/                 # Static data
│   ├── features.tsx      # Product feature data
│   ├── reviews.json      # User reviews
│   └── *.json           # Other configuration data
├── lib/                  # Utility functions
│   └── utils.ts         # Tailwind merge utilities
└── public/              # Static assets
    ├── images/          # Image resources
    └── svgs/           # SVG icons
```

## 🚀 Quick Start

### Requirements

- Node.js 18+
- pnpm

### Install Dependencies

```bash
# Using
pnpm install
```

### Development Server

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

### Build for Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint and Prettier configuration
- Use functional components and Hooks
- Use Tailwind CSS for styling

### Component Development

- Client components must be marked with `'use client'`
- Use `cn()` function to merge class names
- Support dark mode and responsive design
- Follow shadcn/ui component standards

### ⚠️ CRITICAL: Style and Structure Protection

**🚨 ABSOLUTE RULE: Do NOT modify styles or structure unless explicitly specified!**

- **NEVER change existing CSS classes, layout structure, or component design**
- **NEVER simplify complex components or remove visual elements**
- **NEVER replace custom components with basic UI components**
- **NEVER modify animations, transitions, or interactive behaviors**
- **NEVER change responsive design or dark mode implementations**

**When making changes:**
- ✅ Only modify what is explicitly requested
- ✅ Preserve ALL existing styles, animations, and interactions
- ✅ Keep complex layouts and visual hierarchies intact
- ✅ Maintain all custom component implementations

**This rule applies to ALL development tasks, including:**
- Internationalization updates
- Bug fixes
- Feature additions
- Code refactoring
- Performance optimizations

**Violation of this rule will result in immediate rollback and review.**

### Internationalization

- All user interface text uses Chinese
- Support Chinese-English switching
- Use `tw()` function to handle bilingual text

## 🎨 Design System

### Theme Colors

- **Primary**: Primary color
- **Secondary**: Secondary color
- **Muted**: Muted color
- **Accent**: Accent color

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Dark Mode

Use `dark:` prefix to support dark mode styles.

## 📚 Documentation

- [RustFS Official Documentation](https://docs.rustfs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Links

- [RustFS GitHub](https://github.com/rustfs/rustfs)
- [RustFS Official Website](https://rustfs.com)
- [RustFS Documentation](https://docs.rustfs.com)
- [Community Discussions](https://github.com/rustfs/rustfs/discussions)

---

**RustFS** - High-Performance Distributed Storage System
