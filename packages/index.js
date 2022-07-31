import { info, error, success, warning } from "./toasts/messages";

export const startWindToast = async (title, message, alertType, duration = 10, position = 'right') => {
    // Get the body element
    const body = document.querySelector("body");
    // Find a element with the id 'wind-notify'
    let toasty = document.getElementById("wind-notify");
    if (!toasty) {
        // Create the toasty element after the body
        toasty = document.createElement("div");
        // Add the div id to the toasty element
        toasty.id = "wind-notify";
        // append the toasty element to the div
        body.appendChild(toasty);
    }
    // Add the style to the main toasty element so we can use it
    toastDefaultStyle(toasty, position);

    const toastyMessage = document.createElement("div");
    // Add padding class to the toasty message
    toastyMessage.className = "p-3 block transform transition-all duration-150 ease-out scale-0";
    toasty.appendChild(toastyMessage);
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
    // Move the progress bar once reached the end of the toasty remove the toasty
    moveProgressBar(toastyMessage, duration);
};

/**
 * Add the default style to the main toasty element
 *
 * @param mixed element
 *
 * @return [type]
 */
function toastDefaultStyle(element, position) {
    // Add styles to the toasty element
    element.style.position = "fixed";
    element.style.zIndex = "999999";
    // Reset the toasty element position
    element.style.top = null;
    element.style.left = null;
    element.style.right = null;
    element.style.bottom = null;
    element.style.transform = null;

    // Align the object based on the position
    if (position === "top") {
        // Align on the middle of the screen
        element.style.top = "0";
        element.style.left = "50%";
        element.style.transform = "translateX(-50%)";
    } else if (position === "bottom") {
        element.style.bottom = "0";
        element.style.left = "50%";
        element.style.transform = "translateX(-50%)";
    } else if (position === "left") {
        element.style.top = "0";
        element.style.left = "0";
        element.style.bottom = "0";
    } else {
        element.style.top = "0";
        element.style.right = "0";
    }
    element.style.margin = "0 auto";
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
 * Move the progress bar once reached the end of the toasty remove the toasty
 *
 * @param mixed element
 * @param mixed duration
 *
 */
function moveProgressBar(element, duration) {
    const target = element;
    let   width  = 1;
    let   id     = setInterval(frame, duration);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            target.classList.add("scale-0");
            setTimeout(() => {
                target.remove();
            }, 200);
        } else {
            width++;
            // get the progress bar element using the class
            const progressBar = target.querySelector(".progress");
            if (progressBar) {
                progressBar.value = width;
            } else {
                clearInterval(id);
            }
        }
    }
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
