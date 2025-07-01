let startY = 0;

window.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
}, {
    passive: false
});

window.addEventListener('touchmove', e => {
    const currentY = e.touches[0].clientY;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop === 0 && currentY > startY) {
        e.preventDefault(); //阻止刷新
    }
}, {
    passive: false
});