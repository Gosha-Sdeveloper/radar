export function useBurst() {
    function burst(e) {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();

        const colors = [
            "#c084ff",
            "#4f9bff",
            "#ff4fd4",
            "#ffffff",
            "#a855f7",
            "#22d3ee",
        ];

        for (let i = 0; i < 25; i++) {
            const bubble = document.createElement("span");
            bubble.className = "bubble";

            const startX = Math.random() * rect.width;
            const startY = Math.random() * rect.height;

            bubble.style.left = `${startX}px`;
            bubble.style.top = `${startY}px`;
            bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = Math.random() * 2 * Math.PI;
            const distance = 80 + Math.random() * 40;

            bubble.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
            bubble.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

            btn.appendChild(bubble);

            setTimeout(() => bubble.remove(), 900);
        }
    }

    return { burst };
}
