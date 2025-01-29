// toast.js
export const startWindToast = async (title, message, alertType, duration = 5, position = 'right', zIndex = 10000) => {
    if (typeof document === 'undefined') return;

    const body = document.querySelector("body");
    const containerId = "wind-notify-" + position;

    let toastyContainer = document.getElementById(containerId);
    if (!toastyContainer) {
        toastyContainer = document.createElement("div");
        toastyContainer.id = containerId;
        toastyContainer.style.position = 'fixed';
        toastyContainer.style.zIndex = zIndex;
        toastyContainer.style.display = 'flex';
        toastyContainer.style.flexDirection = 'column';
        toastyContainer.style.gap = '1rem';
        toastyContainer.style.maxHeight = 'calc(100vh - 2rem)';
        toastyContainer.style.overflowY = 'auto';
        toastyContainer.style.width = '320px';
        toastyContainer.style.padding = '1rem';
        body.appendChild(toastyContainer);
    }

    // Position the container
    const positions = {
        'right': { right: '0', top: '0', bottom: '0' },
        'left': { left: '0', top: '0', bottom: '0' },
        'top': { top: '0', left: '50%', transform: 'translateX(-50%)' },
        'bottom': { bottom: '0', left: '50%', transform: 'translateX(-50%)' },
        'top-right': { top: '0', right: '0' },
        'top-left': { top: '0', left: '0' },
        'bottom-right': { bottom: '0', right: '0' },
        'bottom-left': { bottom: '0', left: '0' }
    };

    Object.assign(toastyContainer.style, positions[position] || positions.right);

    // Create and add the toast
    const toastElement = document.createElement('div');
    toastElement.innerHTML = createToast(alertType, title, message);
    toastyContainer.appendChild(toastElement.firstElementChild);

    // Animate in
    requestAnimationFrame(() => {
        const toast = toastElement.firstElementChild;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });

    // Progress bar animation
    const progressBar = toastElement.querySelector('.progress');
    if (progressBar) {
        const startTime = performance.now();
        const durationMs = duration * 1000;

        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = 100 - (elapsed / durationMs * 100);

            if (progress <= 0) {
                removeToast(toastElement.firstElementChild);
            } else {
                progressBar.style.width = `${progress}%`;
                requestAnimationFrame(updateProgress);
            }
        }

        requestAnimationFrame(updateProgress);
    }
};

function removeToast(toast) {
    if (!toast) return;

    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';

    setTimeout(() => {
        toast.remove();
    }, 300);
}

// Export the remove function for backward compatibility
if (typeof window !== 'undefined') {
    window.removeWindToast = (event) => {
        const toast = event.target.closest('.toast-wrapper');
        if (toast) removeToast(toast);
    };
}
