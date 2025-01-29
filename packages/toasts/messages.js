// messages.js
const icons = {
    info: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`
};

const styles = {
    info: {
        background: '#EFF6FF',
        border: '#BFDBFE',
        icon: '#3B82F6',
        progress: '#2563EB'
    },
    success: {
        background: '#F0FDF4',
        border: '#BBF7D0',
        icon: '#22C55E',
        progress: '#16A34A'
    },
    warning: {
        background: '#FEFCE8',
        border: '#FEF08A',
        icon: '#EAB308',
        progress: '#CA8A04'
    },
    error: {
        background: '#FEF2F2',
        border: '#FECACA',
        icon: '#EF4444',
        progress: '#DC2626'
    }
};

export function createToast(type, title, message) {
    const style = styles[type] || styles.info;
    const icon = icons[type] || icons.info;

    return `
        <div class="toast-wrapper" style="
            background: ${style.background};
            border: 1px solid ${style.border};
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease-in-out;
            margin-bottom: 0.5rem;
        ">
            <div style="padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="color: ${style.icon}">
                            ${icon}
                        </div>
                        <h3 style="
                            margin: 0;
                            font-weight: 600;
                            color: #1F2937;
                            font-size: 1rem;
                        ">${title}</h3>
                    </div>
                    <button onclick="window.removeWindToast(event)" style="
                        background: transparent;
                        border: none;
                        color: #6B7280;
                        cursor: pointer;
                        padding: 0.25rem;
                        transition: color 0.2s;
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p style="
                    margin: 0.5rem 0 0;
                    color: #4B5563;
                    font-size: 0.875rem;
                ">${message}</p>
            </div>
            <div style="
                height: 0.25rem;
                background: #E5E7EB;
                border-radius: 0 0 0.5rem 0.5rem;
                overflow: hidden;
            ">
                <div class="progress" style="
                    height: 100%;
                    background: ${style.progress};
                    width: 100%;
                    transition: width linear;
                "></div>
            </div>
        </div>
    `;
}

// Keep the original exports for backward compatibility
export const info = (title, message) => createToast('info', title, message);
export const error = (title, message) => createToast('error', title, message);
export const warning = (title, message) => createToast('warning', title, message);
export const success = (title, message) => createToast('success', title, message);
