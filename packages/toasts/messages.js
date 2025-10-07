export function createToast(type, title, message, options = {}) {
    const { showIcon = false, showProgress = false, minimalist = true } = options;

    const alertStyles = {
        info: {
            class: 'alert-info',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>`
        },
        error: {
            class: 'alert-error',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>`
        },
        warning: {
            class: 'alert-warning',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>`
        },
        success: {
            class: 'alert-success',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>`
        }
    };

    const alertConfig = alertStyles[type] || alertStyles.info;

    // Minimalist version - smaller and cleaner
    if (minimalist) {
        return `
            <div class="alert ${alertConfig.class} py-3 px-4 text-sm relative max-w-sm shadow-lg border border-opacity-20">
                <div class="flex items-start gap-3 pr-6">
                    ${showIcon ? alertConfig.icon : ''}
                    <div class="flex flex-col gap-1 flex-1 min-w-0">
                        <span class="font-semibold leading-tight">${title}</span>
                        ${message ? `<span class="opacity-75 text-xs leading-tight">${message}</span>` : ''}
                    </div>
                </div>
                <button class="absolute top-2 right-2 btn btn-ghost btn-xs h-5 w-5 min-h-0 p-0 rounded-full opacity-50 hover:opacity-90 hover:bg-black hover:bg-opacity-10 transition-all duration-200" onclick="window.removeWindToast(event)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                ${showProgress ? `
                    <div class="absolute bottom-0 left-0 w-full">
                        <progress class="progress progress-${type} w-full h-1 rounded-none" value="0" max="100"></progress>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Classic version for backward compatibility
    return `
        <div class="alert ${alertConfig.class} shadow-lg flex justify-between items-start p-4 rounded-lg">
            <div class="flex flex-col w-full">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        ${showIcon ? alertConfig.icon : ''}
                        <h3 class="font-bold text-lg ${showIcon ? 'ml-2' : ''}">${title}</h3>
                    </div>
                    <button class="btn btn-circle btn-sm" onclick="window.removeWindToast(event)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                ${message ? `<div class="text-md mb-2">${message}</div>` : ''}
                ${showProgress ? `
                    <div class="w-full">
                        <progress class="progress progress-primary w-full h-2 rounded-full" value="0" max="100"></progress>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

export const info = (title, message, options) => createToast('info', title, message, options);
export const error = (title, message, options) => createToast('error', title, message, options);
export const warning = (title, message, options) => createToast('warning', title, message, options);
export const success = (title, message, options) => createToast('success', title, message, options);
