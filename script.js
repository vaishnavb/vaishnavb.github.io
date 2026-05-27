const SITE_CONFIG = {
  githubUrl: "https://github.com/vaishnavb",
};

const setGitHubLinks = () => {
  const links = ["githubTopLink", "githubHeroLink", "githubContactLink"];
  links.forEach((id) => {
    const link = document.getElementById(id);
    if (link) link.href = SITE_CONFIG.githubUrl;
  });
};

const setYear = () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
};

const revealOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
};

const initCursorGlow = () => {
  const glow = document.querySelector(".cursor-glow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("pointermove", (event) => {
    glow.style.opacity = "1";
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
};

const initMagneticButtons = () => {
  const buttons = document.querySelectorAll(".magnetic");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.14}px, ${y * 0.22}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
};

const initParticles = () => {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const particles = [];
  const particleCount = reducedMotion ? 18 : 70;
  let width = 0;
  let height = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.7,
    speedX: (Math.random() - 0.5) * 0.28,
    speedY: (Math.random() - 0.5) * 0.28,
    alpha: Math.random() * 0.5 + 0.18,
  });

  const resetParticles = () => {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(createParticle());
    }
  };

  const drawLines = () => {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 130) {
          context.strokeStyle = `rgba(125, 211, 252, ${0.12 * (1 - distance / 130)})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
          context.stroke();
        }
      }
    }
  };

  const animate = () => {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

      context.fillStyle = `rgba(226, 232, 240, ${particle.alpha})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    drawLines();
    requestAnimationFrame(animate);
  };

  resize();
  resetParticles();
  animate();

  window.addEventListener("resize", () => {
    resize();
    resetParticles();
  });
};

setGitHubLinks();
setYear();
revealOnScroll();
initCursorGlow();
initMagneticButtons();
initParticles();
