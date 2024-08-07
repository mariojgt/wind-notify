import { info, error, success, warning } from "./toasts/messages";

export const startWindToast = async (title, message, alertType, duration = 10, position = 'right', zIndex = 10000) => {
    // Get the body element
    const body = document.querySelector("body");
    // Find an element with the id 'wind-notify'
    let toastyContainer = document.getElementById("wind-notify");
    if (!toastyContainer) {
        // Create the toastyContainer element after the body
        toastyContainer = document.createElement("div");
        // Add the div id to the toastyContainer element
        toastyContainer.id = "wind-notify";
        // append the toastyContainer element to the body
        body.appendChild(toastyContainer);
    }
    // Add the style to the main toastyContainer element so we can use it
    toastDefaultStyle(toastyContainer, position, zIndex);

    const toastyMessage = document.createElement("div");
    // Add padding class to the toasty message
    toastyMessage.className = "p-3 block transform transition-all duration-150 ease-out scale-0";
    toastyContainer.appendChild(toastyMessage);
    // Start the toasty animation
    toastsAnimation(toastyMessage);

    // Add the html to the toasty element
    switch (alertType) {
        case 'info':
            toastyMessage.innerHTML = info(title, message);
            break;
        case 'error':
            toastyMessage.innerHTML = error(title, message);
            break;
        case 'success':
            toastyMessage.innerHTML = success(title, message);
            break;
        default:
            toastyMessage.innerHTML = warning(title, message);
            break;
    }
    // Move the progress bar once reached the end of the toasty, remove the toasty
    moveProgressBar(toastyMessage, duration);
};

/**
 * Add the default style to the main toasty element
 *
 * @param mixed element
 *
 * @return [type]
 */
function toastDefaultStyle(toastyContainer, position, zIndex = 10000) {
    // Set the fixed positioning and other styles
    toastyContainer.style.position = 'fixed';
    toastyContainer.style.zIndex = zIndex;
    toastyContainer.style.width = '300px'; // Set a default width

    switch(position) {
        case 'left':
            toastyContainer.style.top = '50%';
            toastyContainer.style.transform = 'translateY(-50%)';
            toastyContainer.style.left = '1rem';
            break;
        case 'right':
            toastyContainer.style.top = '50%';
            toastyContainer.style.transform = 'translateY(-50%)';
            toastyContainer.style.right = '1rem';
            break;
        case 'top':
            toastyContainer.style.top = '1rem';
            toastyContainer.style.left = '50%';
            toastyContainer.style.transform = 'translateX(-50%)';
            break;
        case 'bottom':
            toastyContainer.style.bottom = '1rem';
            toastyContainer.style.left = '50%';
            toastyContainer.style.transform = 'translateX(-50%)';
            break;
        case 'middle':
            toastyContainer.style.top = '50%';
            toastyContainer.style.left = '50%';
            toastyContainer.style.transform = 'translate(-50%, -50%)';
            break;
        default:
            toastyContainer.style.bottom = '1rem';
            toastyContainer.style.right = '1rem';
            break;
    }

    toastyContainer.style.maxHeight = 'calc(100vh - 2rem)';
    toastyContainer.style.overflowY = 'auto'; // Allow scrolling if there are too many toasts
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
        // Remove class 'hidden' from the toasty element
        element.classList.remove("scale-0");
        // Add class 'animate' to the toasty element
        element.classList.add("scale-100");
    }, 200);
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
    // Get target parent element
    const parent =
        target.parentElement.parentElement.parentElement.parentElement
            .parentElement;
    parent.remove();
}
// Add to the window so we can use the function in the button
window.removeWindToast = removeWindToast;
