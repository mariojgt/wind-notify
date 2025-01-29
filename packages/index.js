import { info, error, success, warning } from "./toasts/messages";

export const startWindToast = async (title, message, alertType, duration = 10, position = 'right', zIndex = 10000) => {
    // Check for browser environment
    if (typeof document === 'undefined') return;

    const body = document.querySelector("body");
    const containerId = "wind-notify-" + position;

    let toastyContainer = document.getElementById(containerId);
    if (!toastyContainer) {
        toastyContainer = document.createElement("div");
        toastyContainer.id = containerId;
        body.appendChild(toastyContainer);
    }

    toastDefaultStyle(toastyContainer, position, zIndex);

    const toastyMessage = document.createElement("div");
    toastyMessage.className = "p-3 block transform transition-all duration-150 ease-out scale-0";
    toastyContainer.appendChild(toastyMessage);

    toastsAnimation(toastyMessage);

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

    moveProgressBar(toastyMessage, duration);
};

function toastDefaultStyle(toastyContainer, position, zIndex = 10000) {
    if (typeof document === 'undefined') return;

    toastyContainer.style.position = 'fixed';
    toastyContainer.style.zIndex = zIndex;
    toastyContainer.style.width = '300px';

    switch (position) {
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
    toastyContainer.style.overflowY = 'auto';
}

function toastsAnimation(element) {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
        element.classList.remove("scale-0");
        element.classList.add("scale-100");
    }, 200);
}

function moveProgressBar(element, duration) {
    if (typeof window === 'undefined') return;

    const progressBar = element.querySelector(".progress");
    if (!progressBar) return;

    const totalFrames = duration * 60;
    let frameCount = 0;

    const increment = () => {
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

function removeWindToast(element) {
    if (typeof document === 'undefined') return;

    const target = element.target;
    const parent = target.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
    if (parent) parent.remove();
}

if (typeof window !== 'undefined') {
    window.removeWindToast = removeWindToast;
}
