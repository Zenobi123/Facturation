/**
 * PRISMA GESTION - Composants UI
 * Systeme moderne de notifications, dialogues et indicateurs de chargement
 */

const PrismaUI = {
    stylesInjected: false,

    icons: {
        success: '✓',
        error: '×',
        warning: '!',
        info: 'i',
        danger: '!'
    },

    themes: {
        default: { accent: '#1e3a8a', soft: '#dbeafe', text: '#1e3a8a' },
        info: { accent: '#2563eb', soft: '#dbeafe', text: '#1d4ed8' },
        success: { accent: '#059669', soft: '#d1fae5', text: '#047857' },
        warning: { accent: '#d97706', soft: '#fef3c7', text: '#b45309' },
        error: { accent: '#dc2626', soft: '#fee2e2', text: '#b91c1c' },
        danger: { accent: '#dc2626', soft: '#fee2e2', text: '#b91c1c' }
    },

    ensureStyles() {
        if (this.stylesInjected || document.getElementById('prisma-ui-styles')) return;

        const style = document.createElement('style');
        style.id = 'prisma-ui-styles';
        style.textContent = `
            @keyframes prisma-slide-up {
                from { opacity: 0; transform: translateY(18px) scale(0.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }

            @keyframes prisma-toast-in {
                from { opacity: 0; transform: translateX(32px); }
                to { opacity: 1; transform: translateX(0); }
            }

            #prisma-toast-container {
                position: fixed;
                top: 18px;
                right: 18px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                pointer-events: none;
            }

            .prisma-toast-shell {
                pointer-events: auto;
            }

            .prisma-toast {
                position: relative;
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 12px;
                align-items: start;
                min-width: 320px;
                max-width: 420px;
                padding: 14px 16px;
                border-radius: 18px;
                border: 1px solid rgba(255, 255, 255, 0.18);
                background: linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.96));
                color: #f8fafc;
                box-shadow: 0 24px 50px rgba(15, 23, 42, 0.28);
                backdrop-filter: blur(14px);
                animation: prisma-toast-in 0.24s ease-out;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            }

            .prisma-toast-accent {
                position: absolute;
                inset: 0 auto 0 0;
                width: 5px;
                border-radius: 18px 0 0 18px;
                background: var(--prisma-accent);
            }

            .prisma-toast-icon {
                width: 34px;
                height: 34px;
                display: grid;
                place-items: center;
                border-radius: 12px;
                background: color-mix(in srgb, var(--prisma-accent) 22%, white);
                color: var(--prisma-accent);
                font-size: 18px;
                font-weight: 800;
                margin-top: 1px;
            }

            .prisma-toast-title {
                margin: 0;
                font-size: 12px;
                line-height: 1;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: rgba(255,255,255,0.72);
            }

            .prisma-toast-message {
                margin: 4px 0 0;
                font-size: 14px;
                line-height: 1.45;
                color: #f8fafc;
            }

            .prisma-toast-close {
                border: none;
                background: rgba(255, 255, 255, 0.08);
                color: rgba(255,255,255,0.82);
                width: 30px;
                height: 30px;
                border-radius: 10px;
                cursor: pointer;
                transition: background 0.18s ease, color 0.18s ease;
            }

            .prisma-toast-close:hover {
                background: rgba(255, 255, 255, 0.16);
                color: #ffffff;
            }

            .prisma-modal-overlay {
                position: fixed;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background:
                    radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 30%),
                    rgba(15, 23, 42, 0.58);
                backdrop-filter: blur(12px);
                z-index: 10001;
                opacity: 0;
                transition: opacity 0.22s ease-out;
            }

            .prisma-dialog {
                width: min(100%, 520px);
                max-height: calc(100vh - 40px);
                overflow: auto;
                border-radius: 28px;
                border: 1px solid rgba(148, 163, 184, 0.25);
                background:
                    radial-gradient(circle at top right, rgba(59, 130, 246, 0.11), transparent 34%),
                    linear-gradient(180deg, #ffffff, #f8fafc);
                box-shadow: 0 32px 80px rgba(15, 23, 42, 0.28);
                transform: translateY(18px) scale(0.96);
                transition: transform 0.22s ease-out;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            }

            .prisma-dialog-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 16px;
                padding: 24px 24px 14px;
            }

            .prisma-dialog-title-wrap {
                display: flex;
                gap: 14px;
                align-items: flex-start;
            }

            .prisma-dialog-badge {
                width: 46px;
                height: 46px;
                border-radius: 16px;
                display: grid;
                place-items: center;
                font-size: 22px;
                font-weight: 800;
                flex-shrink: 0;
                background: var(--prisma-soft);
                color: var(--prisma-accent);
                box-shadow: inset 0 0 0 1px rgba(255,255,255,0.7);
            }

            .prisma-dialog-kicker {
                margin: 2px 0 6px;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.14em;
                text-transform: uppercase;
                color: var(--prisma-text);
            }

            .prisma-dialog-title {
                margin: 0;
                font-size: 22px;
                line-height: 1.15;
                font-weight: 800;
                color: #0f172a;
            }

            .prisma-dialog-close {
                width: 34px;
                height: 34px;
                border: none;
                border-radius: 12px;
                background: rgba(148, 163, 184, 0.12);
                color: #475569;
                cursor: pointer;
                transition: background 0.18s ease, color 0.18s ease;
            }

            .prisma-dialog-close:hover {
                background: rgba(148, 163, 184, 0.22);
                color: #0f172a;
            }

            .prisma-dialog-body {
                padding: 0 24px 18px;
                color: #475569;
                font-size: 14px;
                line-height: 1.65;
            }

            .prisma-dialog-body p {
                margin: 0 0 10px;
            }

            .prisma-dialog-body p:last-child {
                margin-bottom: 0;
            }

            .prisma-dialog-body pre {
                margin: 12px 0 0;
                border-radius: 16px;
                padding: 14px 16px;
                background: #0f172a;
                color: #e2e8f0;
                overflow-x: auto;
                font-size: 13px;
                line-height: 1.55;
            }

            .prisma-dialog-footer {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                padding: 0 24px 24px;
            }

            .prisma-dialog-btn {
                min-width: 118px;
                border-radius: 14px;
                padding: 11px 18px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
            }

            .prisma-dialog-btn:hover {
                transform: translateY(-1px);
            }

            .prisma-dialog-btn-secondary {
                border: 1px solid #cbd5e1;
                background: #ffffff;
                color: #334155;
                box-shadow: 0 8px 22px rgba(148, 163, 184, 0.18);
            }

            .prisma-dialog-btn-secondary:hover {
                background: #f8fafc;
            }

            .prisma-dialog-btn-primary {
                border: 1px solid transparent;
                background: var(--prisma-accent);
                color: #ffffff;
                box-shadow: 0 16px 30px color-mix(in srgb, var(--prisma-accent) 30%, transparent);
            }

            .prisma-dialog-btn-primary:hover {
                filter: brightness(0.96);
            }

            .prisma-panel {
                border-radius: 20px;
                border: 1px solid rgba(148, 163, 184, 0.24);
                background: rgba(255, 255, 255, 0.82);
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.75);
            }

            .prisma-panel-muted {
                background: linear-gradient(180deg, #f8fafc, #f1f5f9);
            }

            table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
            }

            table th,
            table td {
                border: 1px solid #cbd5e1;
            }

            table thead th {
                box-shadow: inset 0 -1px 0 #94a3b8;
            }

            @media (max-width: 640px) {
                #prisma-toast-container {
                    left: 12px;
                    right: 12px;
                    top: 12px;
                }

                .prisma-toast {
                    min-width: 0;
                    max-width: none;
                }

                .prisma-dialog {
                    width: 100%;
                    border-radius: 24px;
                }

                .prisma-dialog-header,
                .prisma-dialog-body,
                .prisma-dialog-footer {
                    padding-left: 18px;
                    padding-right: 18px;
                }

                .prisma-dialog-footer {
                    flex-direction: column-reverse;
                }

                .prisma-dialog-btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        this.stylesInjected = true;
    },

    getTheme(type = 'default') {
        return this.themes[type] || this.themes.default;
    },

    getLabel(type = 'default') {
        const labels = {
            default: 'Confirmation',
            info: 'Information',
            success: 'Succes',
            warning: 'Attention',
            error: 'Erreur',
            danger: 'Suppression'
        };
        return labels[type] || labels.default;
    },

    formatMessage(message) {
        if (typeof message !== 'string') return String(message || '');
        if (message.includes('<')) return message;
        return `<p>${message.replace(/\n/g, '<br>')}</p>`;
    }
};

PrismaUI.ensureStyles();

// ============================================
// PRISMA TOAST - Notifications temporaires
// ============================================
const PrismaToast = {
    container: null,

    init() {
        PrismaUI.ensureStyles();
        if (this.container) return;

        this.container = document.createElement('div');
        this.container.id = 'prisma-toast-container';
        document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = 3200) {
        this.init();

        const toast = document.createElement('div');
        const theme = PrismaUI.getTheme(type);
        const icon = PrismaUI.icons[type] || PrismaUI.icons.info;
        const title = PrismaUI.getLabel(type);

        toast.className = 'prisma-toast-shell';
        toast.style.setProperty('--prisma-accent', theme.accent);
        toast.innerHTML = `
            <div class="prisma-toast">
                <div class="prisma-toast-accent"></div>
                <div class="prisma-toast-icon">${icon}</div>
                <div>
                    <p class="prisma-toast-title">${title}</p>
                    <div class="prisma-toast-message">${message}</div>
                </div>
                <button class="prisma-toast-close" type="button" aria-label="Fermer">×</button>
            </div>
        `;

        let removed = false;
        const removeToast = () => {
            if (removed) return;
            removed = true;
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(24px)';
            setTimeout(() => toast.remove(), 180);
        };

        toast.querySelector('.prisma-toast-close').addEventListener('click', removeToast);
        this.container.appendChild(toast);

        if (duration > 0) {
            setTimeout(removeToast, duration);
        }

        return toast;
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

// ============================================
// PRISMA MODAL - Dialogues de confirmation
// ============================================
const PrismaModal = {
    show(options) {
        PrismaUI.ensureStyles();

        const {
            title = 'Confirmation',
            message = '',
            confirmText = 'Confirmer',
            cancelText = 'Annuler',
            type = 'default',
            showCancel = cancelText !== null && cancelText !== undefined,
            onConfirm,
            onCancel
        } = options;

        const theme = PrismaUI.getTheme(type);
        const overlay = document.createElement('div');
        overlay.className = 'prisma-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'prisma-dialog';
        modal.style.setProperty('--prisma-accent', theme.accent);
        modal.style.setProperty('--prisma-soft', theme.soft);
        modal.style.setProperty('--prisma-text', theme.text);

        modal.innerHTML = `
            <div class="prisma-dialog-header">
                <div class="prisma-dialog-title-wrap">
                    <div class="prisma-dialog-badge">${PrismaUI.icons[type] || PrismaUI.icons.info}</div>
                    <div>
                        <p class="prisma-dialog-kicker">${PrismaUI.getLabel(type)}</p>
                        <h3 class="prisma-dialog-title">${title}</h3>
                    </div>
                </div>
                <button class="prisma-dialog-close" type="button" aria-label="Fermer">×</button>
            </div>
            <div class="prisma-dialog-body">${PrismaUI.formatMessage(message)}</div>
            <div class="prisma-dialog-footer">
                ${showCancel ? `<button class="prisma-dialog-btn prisma-dialog-btn-secondary prisma-modal-cancel" type="button">${cancelText}</button>` : ''}
                <button class="prisma-dialog-btn prisma-dialog-btn-primary prisma-modal-confirm" type="button">${confirmText}</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0) scale(1)';
        });

        let closed = false;
        let keyHandler = null;

        const close = (confirmed) => {
            if (closed) return;
            closed = true;
            overlay.style.opacity = '0';
            modal.style.transform = 'translateY(18px) scale(0.96)';
            document.removeEventListener('keydown', keyHandler);
            setTimeout(() => {
                overlay.remove();
                if (confirmed && onConfirm) onConfirm();
                if (!confirmed && onCancel) onCancel();
            }, 180);
        };

        keyHandler = (event) => {
            if (event.key === 'Escape') close(false);
        };

        document.addEventListener('keydown', keyHandler);
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) close(false);
        });
        modal.querySelector('.prisma-dialog-close').addEventListener('click', () => close(false));

        const confirmBtn = modal.querySelector('.prisma-modal-confirm');
        confirmBtn.addEventListener('click', () => close(true));

        const cancelBtn = modal.querySelector('.prisma-modal-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => close(false));
            cancelBtn.focus();
        } else {
            confirmBtn.focus();
        }

        return overlay;
    },

    confirm(message, onConfirm, onCancel) {
        return this.show({
            title: 'Confirmation requise',
            message,
            type: 'default',
            onConfirm,
            onCancel
        });
    },

    confirmDelete(message, onConfirm, onCancel) {
        return this.show({
            title: 'Confirmer la suppression',
            message,
            confirmText: 'Supprimer',
            cancelText: 'Annuler',
            type: 'danger',
            onConfirm,
            onCancel
        });
    },

    alert(input, onClose) {
        const options = typeof input === 'object' ? input : { message: input };

        return this.show({
            title: options.title || 'Information',
            message: options.message || '',
            confirmText: options.okText || 'OK',
            cancelText: null,
            showCancel: false,
            type: options.type || 'info',
            onConfirm: options.onClose || onClose
        });
    }
};

// ============================================
// PRISMA LOADER - Indicateur de chargement
// ============================================// PRISMA LOADER - Indicateur de chargement
// ============================================
const PrismaLoader = {
    overlay: null,

    show(message = 'Chargement...') {
        if (this.overlay) this.hide();

        this.overlay = document.createElement('div');
        this.overlay.className = 'prisma-loader-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 58, 138, 0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10002;
            opacity: 0;
            transition: opacity 0.2s ease-out;
        `;

        this.overlay.innerHTML = `
            <div class="prisma-spinner" style="
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: prisma-spin 0.8s linear infinite;
            "></div>
            <p style="
                color: white;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                margin-top: 20px;
                font-weight: 500;
            ">${message}</p>
        `;

        // Ajouter l'animation CSS si elle n'existe pas
        if (!document.getElementById('prisma-loader-styles')) {
            const style = document.createElement('style');
            style.id = 'prisma-loader-styles';
            style.textContent = `
                @keyframes prisma-spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(this.overlay);

        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
        });
    },

    hide() {
        if (!this.overlay) return;

        this.overlay.style.opacity = '0';
        const overlay = this.overlay;
        this.overlay = null;

        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 200);
    },

    async wrap(promise, message = 'Chargement...') {
        this.show(message);
        try {
            return await promise;
        } finally {
            this.hide();
        }
    }
};


// ============================================
// PRISMA AUTO-SAVE - Sauvegarde automatique des formulaires
// ============================================
const PrismaAutoSave = {
    prefix: 'prisma_autosave_',
    debounceTimers: {},

    // Initialiser l'auto-save sur un formulaire
    init(formId, options = {}) {
        const form = document.getElementById(formId);
        if (!form) return;

        const key = this.prefix + (options.key || formId);
        const debounceMs = options.debounce || 500;

        // Restaurer les données sauvegardées
        this.restore(form, key);

        // Écouter les changements sur tous les champs
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const eventType = (input.type === 'checkbox' || input.type === 'radio') ? 'change' : 'input';
            input.addEventListener(eventType, () => {
                this.debounceSave(form, key, debounceMs);
            });
            input.addEventListener('change', () => {
                this.debounceSave(form, key, debounceMs);
            });
        });

        // Nettoyer après soumission réussie
        form.addEventListener('submit', () => {
            setTimeout(() => this.clear(key), 100);
        });

        return this;
    },

    // Sauvegarder avec debounce
    debounceSave(form, key, delay) {
        if (this.debounceTimers[key]) {
            clearTimeout(this.debounceTimers[key]);
        }
        this.debounceTimers[key] = setTimeout(() => {
            this.save(form, key);
        }, delay);
    },

    // Sauvegarder les données du formulaire
    save(form, key) {
        const data = {};
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (!input.id && !input.name) return;
            const fieldKey = input.id || input.name;

            if (input.type === 'checkbox') {
                data[fieldKey] = input.checked;
            } else if (input.type === 'radio') {
                if (input.checked) {
                    data[fieldKey] = input.value;
                }
            } else {
                data[fieldKey] = input.value;
            }
        });

        data._timestamp = Date.now();
        sessionStorage.setItem(key, JSON.stringify(data));
    },

    // Restaurer les données du formulaire
    restore(form, key) {
        const saved = sessionStorage.getItem(key);
        if (!saved) return false;

        try {
            const data = JSON.parse(saved);

            // Vérifier si les données ne sont pas trop anciennes (1 heure max)
            if (data._timestamp && (Date.now() - data._timestamp) > 3600000) {
                this.clear(key);
                return false;
            }

            const inputs = form.querySelectorAll('input, select, textarea');
            let restored = false;

            inputs.forEach(input => {
                const fieldKey = input.id || input.name;
                if (!fieldKey || !(fieldKey in data)) return;

                if (input.type === 'checkbox') {
                    input.checked = data[fieldKey];
                } else if (input.type === 'radio') {
                    input.checked = (input.value === data[fieldKey]);
                } else {
                    input.value = data[fieldKey];
                    // Déclencher l'événement change pour les calculs automatiques
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
                restored = true;
            });

            if (restored) {
                PrismaToast.info('Données restaurées automatiquement', 2000);
            }

            return restored;
        } catch (e) {
            this.clear(key);
            return false;
        }
    },

    // Effacer les données sauvegardées
    clear(key) {
        sessionStorage.removeItem(key);
    },

    // Effacer toutes les sauvegardes
    clearAll() {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                sessionStorage.removeItem(key);
            }
        });
    }
};


// ============================================
// PRISMA SYNC - Synchronisation entre onglets
// ============================================
const PrismaSync = {
    callbacks: {},

    // Initialiser la synchronisation
    init() {
        window.addEventListener('storage', (e) => {
            if (e.key && this.callbacks[e.key]) {
                this.callbacks[e.key].forEach(cb => cb(e.newValue, e.oldValue));
            }
            // Callback global pour toutes les clés surveillées
            if (this.callbacks['*']) {
                this.callbacks['*'].forEach(cb => cb(e.key, e.newValue, e.oldValue));
            }
        });
        return this;
    },

    // S'abonner aux changements d'une clé localStorage
    watch(key, callback) {
        if (!this.callbacks[key]) {
            this.callbacks[key] = [];
        }
        this.callbacks[key].push(callback);
        return this;
    },

    // Se désabonner
    unwatch(key, callback) {
        if (this.callbacks[key]) {
            this.callbacks[key] = this.callbacks[key].filter(cb => cb !== callback);
        }
        return this;
    },

    // Notifier manuellement (pour les changements dans le même onglet)
    notify(key) {
        const value = localStorage.getItem(key);
        if (this.callbacks[key]) {
            this.callbacks[key].forEach(cb => cb(value, null));
        }
        return this;
    }
};

// Initialiser PrismaSync automatiquement
PrismaSync.init();


// ============================================================================
// PrismaBackup — Protection contre la perte de données
// ============================================================================

const PrismaBackup = {
    // Source unique de vérité : toutes les clés localStorage de l'application
    ALL_DATA_KEYS: [
        'clients',
        'contrats',
        'factures',
        'recus',
        'propositions',
        'notes',
        'cabinetConfig',
        'devis',
        'courriers',
        'attestations',
        'prestationRealizationStatus',
        'dossierFiscalStatus',
        'paiementsImpotsDirects'
    ],

    SNAPSHOT_KEY: '_prisma_backup_snapshot',
    CORRUPTED_PREFIX: '_prisma_backup_corrupted_',

    /**
     * Crée un snapshot complet de toutes les données avant une opération destructive.
     * Stocké sous _prisma_backup_snapshot dans localStorage.
     * @returns {boolean} true si le snapshot a été créé avec succès
     */
    createSnapshot() {
        try {
            const snapshot = {
                date: new Date().toISOString(),
                data: {}
            };
            this.ALL_DATA_KEYS.forEach(key => {
                const raw = localStorage.getItem(key);
                if (raw !== null) {
                    snapshot.data[key] = raw;
                }
            });
            localStorage.setItem(this.SNAPSHOT_KEY, JSON.stringify(snapshot));
            console.log('[PrismaBackup] Snapshot créé:', snapshot.date, '— clés:', Object.keys(snapshot.data).length);
            return true;
        } catch (e) {
            console.error('[PrismaBackup] Échec création snapshot:', e);
            return false;
        }
    },

    /**
     * Restaure les données depuis le dernier snapshot.
     * @returns {boolean} true si la restauration a réussi
     */
    restoreSnapshot() {
        try {
            const raw = localStorage.getItem(this.SNAPSHOT_KEY);
            if (!raw) {
                console.warn('[PrismaBackup] Aucun snapshot disponible');
                return false;
            }
            const snapshot = JSON.parse(raw);
            Object.entries(snapshot.data).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });
            console.log('[PrismaBackup] Snapshot restauré depuis:', snapshot.date);
            return true;
        } catch (e) {
            console.error('[PrismaBackup] Échec restauration snapshot:', e);
            return false;
        }
    },

    /**
     * Préserve les données corrompues au lieu de les supprimer.
     * @param {string} key - Clé localStorage dont les données sont corrompues
     */
    preserveCorrupted(key) {
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null) {
                const backupKey = this.CORRUPTED_PREFIX + key;
                localStorage.setItem(backupKey, raw);
                console.warn(`[PrismaBackup] Données corrompues préservées: ${backupKey}`);
            }
        } catch (e) {
            console.error('[PrismaBackup] Échec préservation données corrompues:', e);
        }
    },

    /**
     * Parsing JSON sécurisé qui ne supprime JAMAIS les données.
     * En cas de corruption : préserve les données + avertit + retourne la valeur par défaut.
     * @param {string} key - Clé localStorage
     * @param {*} defaultValue - Valeur par défaut si absent ou corrompu
     * @returns {*} Les données parsées ou la valeur par défaut
     */
    safeParseJSON(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`[PrismaBackup] Erreur parsing localStorage[${key}]:`, e);
            this.preserveCorrupted(key);
            if (typeof PrismaToast !== 'undefined') {
                PrismaToast.error(`Données corrompues pour "${key}". Données préservées dans le backup.`);
            }
            return defaultValue;
        }
    }
};


// ============================================================================
// PrismaAutoBackup — Rappels et sauvegardes automatiques
// ============================================================================

const PrismaAutoBackup = {
    CONFIG_KEY: '_prisma_autobackup_config',
    HISTORY_KEY: '_prisma_autobackup_history',
    DISMISS_KEY: '_prisma_autobackup_dismissed', // sessionStorage
    MAX_HISTORY: 50,

    // Fréquences en millisecondes
    FREQUENCIES: {
        daily: 24 * 60 * 60 * 1000,
        weekly: 7 * 24 * 60 * 60 * 1000,
        monthly: 30 * 24 * 60 * 60 * 1000
    },

    /**
     * Charge la configuration (ou retourne les valeurs par défaut)
     */
    getConfig() {
        try {
            const raw = localStorage.getItem(this.CONFIG_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.warn('[PrismaAutoBackup] Config corrompue, reset');
        }
        return { enabled: false, frequency: 'weekly', autoDownload: false };
    },

    /**
     * Sauvegarde la configuration
     */
    saveConfig(config) {
        localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
    },

    /**
     * Charge l'historique des sauvegardes
     */
    getHistory() {
        try {
            const raw = localStorage.getItem(this.HISTORY_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.warn('[PrismaAutoBackup] Historique corrompu, reset');
        }
        return [];
    },

    /**
     * Vérifie si un backup est en retard selon la fréquence configurée
     */
    isBackupOverdue() {
        const config = this.getConfig();
        if (!config.enabled) return false;

        const history = this.getHistory();
        if (history.length === 0) return true;

        const lastBackup = new Date(history[0].date).getTime();
        const now = Date.now();
        const interval = this.FREQUENCIES[config.frequency] || this.FREQUENCIES.weekly;

        return (now - lastBackup) >= interval;
    },

    /**
     * Effectue un backup (génère et télécharge le JSON)
     */
    performBackup(method = 'auto') {
        try {
            const exportObj = {
                version: '2.0',
                exportDate: new Date().toISOString(),
                application: 'PRISMA GESTION'
            };

            PrismaBackup.ALL_DATA_KEYS.forEach(key => {
                const data = localStorage.getItem(key);
                if (data) {
                    exportObj[key] = JSON.parse(data);
                }
            });

            const dataStr = JSON.stringify(exportObj, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const sizeKB = Math.round(dataBlob.size / 1024);

            // Télécharger le fichier
            const date = new Date();
            const dateStr = date.getFullYear() + '-' +
                String(date.getMonth() + 1).padStart(2, '0') + '-' +
                String(date.getDate()).padStart(2, '0');
            const timeStr = String(date.getHours()).padStart(2, '0') +
                String(date.getMinutes()).padStart(2, '0');
            const fileName = `prisma-gestion-backup-${dateStr}_${timeStr}.json`;

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

            // Enregistrer dans l'historique
            this.recordBackup(method, sizeKB);

            return true;
        } catch (error) {
            console.error('[PrismaAutoBackup] Erreur backup:', error);
            if (typeof PrismaToast !== 'undefined') {
                PrismaToast.error('Erreur lors de la sauvegarde automatique');
            }
            return false;
        }
    },

    /**
     * Enregistre une entrée dans l'historique
     */
    recordBackup(method, sizeKB) {
        const history = this.getHistory();
        history.unshift({
            date: new Date().toISOString(),
            sizeKB: sizeKB || 0,
            method: method || 'manual'
        });
        // Limiter à MAX_HISTORY entrées
        if (history.length > this.MAX_HISTORY) {
            history.length = this.MAX_HISTORY;
        }
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    },

    /**
     * Affiche la bannière de rappel sous la <nav>
     */
    showReminder() {
        // Ne pas afficher si déjà masquée pour cette session
        if (sessionStorage.getItem(this.DISMISS_KEY)) return;
        // Ne pas dupliquer
        if (document.getElementById('prisma-autobackup-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'prisma-autobackup-banner';
        banner.style.cssText = 'background:#fef3c7;border-bottom:2px solid #f59e0b;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-family:Inter,sans-serif;font-size:14px;color:#92400e;z-index:9999;';

        const config = this.getConfig();
        const freqLabel = { daily: 'quotidienne', weekly: 'hebdomadaire', monthly: 'mensuelle' }[config.frequency] || config.frequency;
        const history = this.getHistory();
        const lastDate = history.length > 0
            ? new Date(history[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
            : 'jamais';

        banner.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;flex:1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span><strong>Sauvegarde ${freqLabel} en retard</strong> — Dernière : ${lastDate}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
                <button onclick="PrismaAutoBackup.onReminderBackup()" style="background:#d97706;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500;">
                    Sauvegarder maintenant
                </button>
                <button onclick="PrismaAutoBackup.hideReminder()" style="background:none;border:none;cursor:pointer;padding:4px;color:#92400e;font-size:18px;line-height:1;" title="Fermer">✕</button>
            </div>
        `;

        // Insérer après la nav ou en haut du body
        const nav = document.querySelector('nav');
        if (nav && nav.nextSibling) {
            nav.parentNode.insertBefore(banner, nav.nextSibling);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }
    },

    /**
     * Action du bouton "Sauvegarder maintenant" dans la bannière
     */
    onReminderBackup() {
        const success = this.performBackup('reminder');
        if (success) {
            this.hideReminder();
            if (typeof PrismaToast !== 'undefined') {
                PrismaToast.success('Sauvegarde effectuée avec succès !');
            }
        }
    },

    /**
     * Masque la bannière (pour la session courante)
     */
    hideReminder() {
        const banner = document.getElementById('prisma-autobackup-banner');
        if (banner) banner.remove();
        sessionStorage.setItem(this.DISMISS_KEY, '1');
    },

    /**
     * Initialisation : vérifie si un backup est en retard
     */
    init() {
        const config = this.getConfig();
        if (!config.enabled) return;

        if (this.isBackupOverdue()) {
            if (config.autoDownload) {
                // Téléchargement automatique silencieux
                const success = this.performBackup('auto');
                if (success && typeof PrismaToast !== 'undefined') {
                    PrismaToast.success('Sauvegarde automatique effectuée');
                }
            } else {
                // Afficher la bannière de rappel
                this.showReminder();
            }
        }
    }
};

// Initialiser PrismaAutoBackup au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    PrismaAutoBackup.init();
});


// Export pour compatibilité module (si utilisé)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PrismaToast, PrismaModal, PrismaLoader, PrismaAutoSave, PrismaSync, PrismaBackup, PrismaAutoBackup };
}
