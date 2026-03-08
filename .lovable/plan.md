

# Implementation Plan — Arthur Jeaugey Portfolio

This is ready to build. Here's the concise execution plan.

## Files to Create/Modify

### 1. `index.html` — Add Google Fonts
Add Inter and JetBrains Mono font links.

### 2. `src/index.css` — Dark theme + utilities
- Override CSS vars: background `#0A0A0B`, card `#111113`, borders `#1a1a1f`
- Gradient mesh keyframe animation (slow-moving radial gradients, purple/blue, ~8% opacity)
- Fade-in-on-scroll utility class
- Gradient text utility

### 3. `src/hooks/useScrollFadeIn.ts`
Intersection Observer hook returning a ref — applies fade-in class when element enters viewport.

### 4. `src/components/Navbar.tsx`
- "AJ" monogram left, 3 text links right (Projects, Lab, About)
- Fixed, transparent, backdrop-blur on scroll
- Mobile: hamburger → Sheet with links
- Visually quiet — no backgrounds, no borders, small text

### 5. `src/components/HeroSection.tsx`
- Animated gradient mesh div behind content (CSS keyframes, 2 shifting radial gradients)
- "Arthur Jeaugey" large bold
- Tagline: *"I build software, experiment with AI, and dig into complex systems."*
- Muted paragraph: *"Currently studying computer science in France. Interested in how things work under the hood — from neural networks to operating systems."*
- Buttons: "See what I've built" (anchor scroll), GitHub icon link

### 6. `src/components/ProjectCard.tsx`
Card with hover border-glow. Props: title, description, techStack[], link.

### 7. `src/components/ProjectsSection.tsx`
Three projects with concrete descriptions:
- **ISU**: *"A mobile app that uses AI to generate study materials from course content. Built with React Native, integrating LLM APIs for summarization and quiz generation."*
- **π-thon**: *"A Python application that visualizes different mathematical methods for estimating π — Monte Carlo, Leibniz series, Buffon's needle — and compares their convergence rates."*
- **Weather Forecast Bias Correction**: *"An ML pipeline that identifies and corrects systematic errors in numerical weather forecasts. Uses gradient boosting on historical forecast-observation pairs."*

### 8. `src/components/LabCard.tsx`
Smaller card with category tag. Props: title, description, category.

### 9. `src/components/LabSection.tsx`
Five experiments with discovery-focused descriptions:
- **Running Local LLMs** (AI): *"Tested Mistral 7B and Llama 2 on consumer GPUs. Explored VRAM limits, quantization tradeoffs, and inference speed at different precision levels."*
- **GPU Memory & Quantization** (AI): *"Benchmarked 4-bit vs 8-bit quantization on a 3060 12GB. Measured perplexity degradation against memory savings."*
- **TryHackMe** (Security): *"Working through offensive security challenges. Learning network enumeration, privilege escalation, and web exploitation techniques."*
- **Workstation Build** (Hardware): *"Built a development workstation optimized for local ML inference. Documented component choices, thermal management, and cost-performance tradeoffs."*
- **3D Printing** (Hardware): *"Designing and printing functional parts. Learning CAD modeling, slicer tuning, and material properties through iterative prototyping."*

### 10. `src/components/AboutSection.tsx`
Centered text block with gradient accent line. Genuine paragraph about being a French CS student interested in AI, cybersecurity, systems.

### 11. `src/components/ContactSection.tsx`
Minimal icon row: GitHub, Email, LinkedIn. Small copyright footer.

### 12. `src/pages/Index.tsx`
Compose all sections with scroll fade-in applied to each.

### 13. `tailwind.config.ts`
Add animation keyframes for gradient mesh and fade-in-up.

