// ============================================
// KDS AUTHENTICATION - PIN SYSTEM
// ============================================

export type StaffRole = 'cocina' | 'mostrador' | 'admin';

export interface StaffMember {
    pin: string;
    name: string;
    role: StaffRole;
    avatar: string;
}

// Demo staff members - in production, this would be in a database
export const STAFF_MEMBERS: StaffMember[] = [
    { pin: '1234', name: 'Chef Juan', role: 'cocina', avatar: '👨‍🍳' },
    { pin: '5678', name: 'María (Mostrador)', role: 'mostrador', avatar: '👩‍💼' },
    { pin: '0000', name: 'Admin', role: 'admin', avatar: '🔑' },
];

export const ROLE_PERMISSIONS: Record<StaffRole, {
    canPrepare: boolean;
    canDeliver: boolean;
    canViewHistory: boolean;
    canViewStats: boolean;
    canSettings: boolean;
    label: string;
    color: string;
}> = {
    cocina: {
        canPrepare: true,
        canDeliver: false,
        canViewHistory: true,
        canViewStats: true,
        canSettings: false,
        label: 'Cocina',
        color: 'bg-orange-500'
    },
    mostrador: {
        canPrepare: false,
        canDeliver: true,
        canViewHistory: true,
        canViewStats: false,
        canSettings: false,
        label: 'Mostrador',
        color: 'bg-blue-500'
    },
    admin: {
        canPrepare: true,
        canDeliver: true,
        canViewHistory: true,
        canViewStats: true,
        canSettings: true,
        label: 'Administrador',
        color: 'bg-purple-500'
    }
};

// Session storage key
const SESSION_KEY = 'kds_session';

export interface KDSSession {
    staff: StaffMember;
    loginTime: number;
}

/**
 * Validate PIN and return staff member if valid
 */
export function validatePin(pin: string): StaffMember | null {
    return STAFF_MEMBERS.find(s => s.pin === pin) || null;
}

/**
 * Save session to localStorage
 */
export function saveSession(staff: StaffMember): void {
    const session: KDSSession = {
        staff,
        loginTime: Date.now()
    };
    if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
}

/**
 * Get current session from localStorage
 */
export function getSession(): KDSSession | null {
    if (typeof window === 'undefined') return null;

    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;

    try {
        const session = JSON.parse(data) as KDSSession;
        // Session expires after 8 hours
        const EIGHT_HOURS = 8 * 60 * 60 * 1000;
        if (Date.now() - session.loginTime > EIGHT_HOURS) {
            clearSession();
            return null;
        }
        return session;
    } catch {
        return null;
    }
}

/**
 * Clear session (logout)
 */
export function clearSession(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_KEY);
    }
}

/**
 * Check if user has permission for an action
 */
export function hasPermission(staff: StaffMember, action: keyof typeof ROLE_PERMISSIONS.admin): boolean {
    const permission = ROLE_PERMISSIONS[staff.role][action];
    return typeof permission === 'boolean' ? permission : false;
}
