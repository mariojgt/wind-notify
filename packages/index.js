import { info, error, success, warning } from "./toasts/messages";

export const startWindToast = async (title, message, alertType, options = {}) => {
    const {
        duration = 5,
        position = 'top-end',
        zIndex = 10000,
        showIcon = false,
        showProgress = false,
        minimalist = true
    } = options;

    // Get the body element
    const body = document.querySelector("body");
    const containerId = "wind-notify-" + position;
    // Find an element with the id 'wind-notify'
    let toastyContainer = document.getElementById(containerId);
    if (!toastyContainer) {
        // Create the toastyContainer element after the body
        toastyContainer = document.createElement("div");
        // Add the div id to the toastyContainer element
        toastyContainer.id = containerId;
        // Add DaisyUI toast classes
        toastyContainer.className = `toast toast-${position}`;
        // append the toastyContainer element to the body
        body.appendChild(toastyContainer);
    }
    // Add the style to the main toastyContainer element so we can use it
    toastDefaultStyle(toastyContainer, position, zIndex);

    const toastyMessage = document.createElement("div");
    // Add minimalist classes for smooth animation
    toastyMessage.className = "opacity-0 transform translate-y-2 transition-all duration-300 ease-out";
    toastyContainer.appendChild(toastyMessage);

    // Start the toasty animation
    toastsAnimation(toastyMessage);

    // Add the html to the toasty element
    const toastOptions = { showIcon, showProgress, minimalist };
    switch (alertType) {
        case 'info':
            toastyMessage.innerHTML = info(title, message, toastOptions);
            break;
        case 'error':
            toastyMessage.innerHTML = error(title, message, toastOptions);
            break;
        case 'success':
            toastyMessage.innerHTML = success(title, message, toastOptions);
            break;
        default:
            toastyMessage.innerHTML = warning(title, message, toastOptions);
            break;
    }

    // Handle auto-removal and progress bar
    if (showProgress) {
        moveProgressBar(toastyMessage, duration);
    } else {
        // Simple auto-removal without progress bar
        setTimeout(() => {
            removeToast(toastyMessage);
        }, duration * 1000);
    }
};

/**
 * Add the default style to the main toasty element
 *
 * @param mixed element
 *
 * @return [type]
 */
function toastDefaultStyle(toastyContainer, position, zIndex = 10000) {
    // Set z-index for proper layering
    toastyContainer.style.zIndex = zIndex;

    // DaisyUI toast classes handle most positioning, but we can add custom styles if needed
    if (position === 'middle') {
        toastyContainer.style.position = 'fixed';
        toastyContainer.style.top = '50%';
        toastyContainer.style.left = '50%';
        toastyContainer.style.transform = 'translate(-50%, -50%)';
        toastyContainer.className = 'toast';
    }
}

/**
 * Animate the toasty message using tailwindcss animation classes
 *
 * @param mixed element
 *
 * @return [type]
 */
function toastsAnimation(element) {
    setTimeout(() => {
        // Smooth fade-in animation
        element.classList.remove("opacity-0", "translate-y-2");
        element.classList.add("opacity-100", "translate-y-0");
    }, 100);
}

/**
 * Remove toast with smooth animation
 */
function removeToast(element) {
    element.classList.remove("opacity-100", "translate-y-0");
    element.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => {
        element.remove();
    }, 300);
}

/**
 * Move the progress bar with a smoother ease-out progression.
 * Once the progress bar reaches the end, remove the toast notification.
 *
 * @param {HTMLElement} element - The toast container element.
 * @param {number} duration - Duration in seconds for the toast to last.
 */
function moveProgressBar(element, duration) {
    const progressBar = element.querySelector(".progress");
    if (!progressBar) return;

    const totalFrames = duration * 60; // Assuming 60 frames per second
    let frameCount = 0;

    const increment = () => {
        // Use ease-out progression
        const progress = Math.min((frameCount / totalFrames) ** 0.5 * 100, 100);

        progressBar.value = progress;

        if (frameCount >= totalFrames) {
            element.classList.add("scale-0");
            setTimeout(() => {
                element.remove();
            }, 200);
        } else {
            frameCount++;
            requestAnimationFrame(increment);
        }
    };

    increment();
}

/**
 * Used in the button when the user clicks the button to remove the toasty
 *
 * @param mixed element
 *
 */
function removeWindToast(element) {
    const target = element.target;
    // Find the closest toast container
    const toastElement = target.closest('.opacity-100') || target.closest('[class*="opacity"]');
    if (toastElement) {
        removeToast(toastElement);
    }
}
// Add to the window so we can use the function in the button (only in browser environment)
if (typeof window !== 'undefined') {
    window.removeWindToast = removeWindToast;
}
