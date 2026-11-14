// Shows the parts of the page as they scroll into view, lets the coins and cards follow the
// pointer, and stops the SVG animations for people who ask for less motion. Without this
// script the page shows everything at once and still works.
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

const observer = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (!entry.isIntersecting) continue;
		entry.target.classList.add("in");
		observer.unobserve(entry.target);
	}
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

if (matchMedia("(hover: hover)").matches) {
	const hero = document.querySelector(".hero");
	hero?.addEventListener("pointermove", (event) => {
		if (reduce.matches) return;
		const box = hero.getBoundingClientRect();
		hero.style.setProperty("--px", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
		hero.style.setProperty("--py", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
	}, { passive: true });

	document.addEventListener("pointermove", (event) => {
		const card = event.target instanceof Element ? event.target.closest(".card") : null;
		if (!card) return;
		const box = card.getBoundingClientRect();
		card.style.setProperty("--mx", `${event.clientX - box.left}px`);
		card.style.setProperty("--my", `${event.clientY - box.top}px`);
	}, { passive: true });
}

// The data packets of the extensions graphic move with SVG animation, which CSS cannot stop.
const syncMotion = () => document.querySelectorAll("svg.smil").forEach((svg) => {
	if (reduce.matches) svg.pauseAnimations();
	else svg.unpauseAnimations();
});
syncMotion();
reduce.addEventListener("change", syncMotion);
