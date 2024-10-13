document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme');

    // Function to apply the theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    // Initialize theme on page load
    if (currentTheme) {
        applyTheme(currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
        }
    } else {
        // If no preference is saved, use system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            applyTheme('dark');
            themeSwitch.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    // Listen for toggle changes
    themeSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Optional: Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't set a preference
            if (e.matches) {
                applyTheme('dark');
                themeSwitch.checked = true;
            } else {
                applyTheme('light');
                themeSwitch.checked = false;
            }
        }
    });
});
