let startY = 0;

window.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
}, {
    passive: false
});

window.addEventListener('touchmove', e => {
    const currentY = e.touches[0].clientY;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // 如果在顶部 + 向下滑动
    if (scrollTop === 0 && currentY > startY) {
        // 失去所有输入焦点（防止弹出输入法）

        /* beautify ignore:start */
        document.activeElement?.blur?.();
        /* beautify ignore:end */

        // 阻止浏览器下拉默认行为（刷新页面）
        e.preventDefault();
    }
}, {
    passive: false
});
