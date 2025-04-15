/// <reference types="vite/client" />

/**
 * Extends the Window interface to include the mvpApi object.
 */
interface Window {
    /**
     * Represents the MVP API.
     */
    mvpApi: {
        // MVP related methods
        /**
         * Retrieves all MVPs.
         * @returns {Promise<Mvp[]>} A promise that resolves to an array of Mvp objects.
         */
        getMvps: () => Promise<Mvp[]>

        /**
         * Updates a specific MVP.
         * @param {Mvp} mvp - The MVP object to update.
         */
        updateMvp: (mvp: Mvp) => void

        /**
         * Sets the entire list of MVPs.
         * @param {Mvp[]} mvps - An array of Mvp objects to set.
         */
        setMvps: (mvps: Mvp[]) => void

        // Settings related methods
        /**
         * Retrieves the current settings.
         * @returns {Promise<Settings>} A promise that resolves to a Settings object.
         */
        getSettings: () => Promise<UserState>

        /**
         * Updates a specific setting.
         * @param {string} key - The key of the setting to update.
         * @param {string|number|boolean|MvpNotification[]} value - The new value for the setting.
         */
        setSettings: (key: string, value: string | number | boolean | MvpNotification) => void

        // Notifications related methods
        /**
         * Adds a notification.
         */
        addNotification: (notification: MvpNotification) => void

        /**
         * Removes a notification.
         */
        removeNotification: (notification: MvpNotification) => void

        /**
         * Clears all notifications.
         */
        clearNotifications: () => void

        /**
         * Indicates that the application has loaded.
         */
        appLoaded: () => voida

        /**
         * Opens a link in the default browser.
         */
        openLink: (link: string) => void
    }

    /**
     * Represents the auto updater API.
     */
    autoUpdaterApi: {
        checkForUpdates: () => void
        downloadUpdate: () => void
        quitAndInstall: () => void
        updateAvailable: (callback: (info: UpdateInfo) => void) => void
        updateDownloaded: (callback: () => void) => void
        downloadProgress: (callback: (progress: ProgressInfo) => void) => void
    }
}

/**
 * Represents user settings.
 */
interface Settings {
    animation: boolean
    background: string
    soundNotification: boolean
    delayNotification: number
    respawnTimer: number
    perPage: number
}

/**
 * Represents an item drop from an MVP.
 */
interface Drop {
    Item: string
    Rate: number
    StealProtected?: boolean
    RandomOptionGroup?: string
    Index?: number
}

/**
 * Represents the position of an MVP's tomb.
 */
interface TombPos {
    x: number
    y: number
}

/**
 * Represents a map where an MVP can spawn.
 */
interface MvpMap {
    name: string
    deathTime: number
    respawnTimer: number
    displayName: string
    tombPos: TombPos
    size: {
        height: number,
        width: number
    },
    fiveMinutesLeft?: boolean
}

/**
 * Represents an MVP monster.
 */
interface Mvp {
    Id: number,
    AegisName: string
    Name: string
    JapaneseName?: string
    Level?: number
    Hp?: number
    BaseExp?: number
    JobExp?: number
    MvpExp?: number
    Attack?: number
    Attack2?: number
    Defense?: number
    MagicDefense?: number
    MagicResistance?: number
    Resistance?: number
    Str?: number
    Agi?: number
    Vit?: number
    Int?: number
    Dex?: number
    Luk?: number
    Sp?: number
    AttackRange?: number
    SkillRange?: number
    ChaseRange?: number
    Size?: string
    Race?: string
    RaceGroups?: {
        Faceworm?: boolean
        Ogh_Atk_Def?: boolean
        Clocktower?: boolean
        Biolab?: boolean
        Thanatos?: boolean
        Rachel_Sanctuary?: boolean
        Scaraba?: boolean
        Malangdo?: boolean
        Bio5_Mvp?: boolean
        Werner_Lab?: boolean
        Hearthunter?: boolean
        Illusion_Vampire?: boolean
        Illusion_Moonlight?: boolean
        Illusion_Frozen?: boolean
        Illusion_Turtle?: boolean
        Illusion_Luanda?: boolean
        EP172BETA?: boolean
    }
    Element?: string
    ElementLevel?: number
    WalkSpeed?: number
    AttackDelay?: number
    AttackMotion?: number
    ClientAttackMotion?: number
    DamageMotion?: number
    DamageTaken?: number
    Ai?: number
    Class?: string
    Modes?: {
        CanMove?: boolean
        CastSensorIdle?: boolean
        CastSensorChase?: boolean
        IgnoreMelee?: boolean
        ChangeChase?: boolean
        IgnoreMagic?: boolean
        IgnoreMisc?: boolean
        IgnoreRanged?: boolean
        NoRandomWalk?: boolean
        TeleportBlock?: boolean
        Mvp: boolean
    },
    MvpDrops?: Drop[]
    Drops?: Drop[]
    image: string
    imageObject?: HTMLImageElement
    isBookmark: boolean
    mvpMaps: MvpMap[]
}

/**
 * Represents the state of MVPs in the application.
 */
interface MvpState {
    mvps: Mvp[]
    filtered: Mvp[]
    mvpFocus: number | null
}

/**
 * Represents a notification.
 */
interface MvpNotification {
    id: string
    mvpName: string
    mapName: string
    respawn: number
}

interface Factor {
    /** ID of the factor. */
    id: string

    /** Friendly name of the factor, useful to disambiguate between multiple factors. */
    friendly_name?: string

    /**
     * Type of factor. `totp` and `phone` supported with this version
     */
    factor_type: 'totp' | 'phone' | (string & {})

    /** Factor's status. */
    status: 'verified' | 'unverified'

    created_at: string
    updated_at: string
}

interface UserIdentity {
    id: string
    user_id: string
    identity_data?: {
        [key: string]: any
    }
    identity_id: string
    provider: string
    created_at?: string
    last_sign_in_at?: string
    updated_at?: string
}

interface UserAppMetadata {
    provider?: string
    [key: string]: any
}

interface UserMetadata {
    [key: string]: any
}

interface User {
    id: string
    app_metadata: UserAppMetadata
    user_metadata: UserMetadata
    aud: string
    confirmation_sent_at?: string
    recovery_sent_at?: string
    email_change_sent_at?: string
    new_email?: string
    new_phone?: string
    invited_at?: string
    action_link?: string
    email?: string
    phone?: string
    created_at: string
    confirmed_at?: string
    email_confirmed_at?: string
    phone_confirmed_at?: string
    last_sign_in_at?: string
    role?: string
    updated_at?: string
    identities?: UserIdentity[]
    is_anonymous?: boolean
    factors?: Factor[]
}

interface Session {
    /**
     * The oauth provider token. If present, this can be used to make external API requests to the oauth provider used.
     */
    provider_token?: string | null
    /**
     * The oauth provider refresh token. If present, this can be used to refresh the provider_token via the oauth provider's API.
     * Not all oauth providers return a provider refresh token. If the provider_refresh_token is missing, please refer to the oauth provider's documentation for information on how to obtain the provider refresh token.
     */
    provider_refresh_token?: string | null
    /**
     * The access token jwt. It is recommended to set the JWT_EXPIRY to a shorter expiry value.
     */
    access_token: string
    /**
     * A one-time used refresh token that never expires.
     */
    refresh_token: string
    /**
     * The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
     */
    expires_in: number
    /**
     * A timestamp of when the token will expire. Returned when a login is confirmed.
     */
    expires_at?: number
    token_type: string
    user: User
}

/**
 * 
 * Represents the user state, extending the Settings interface.
 */
interface UserState extends Settings {
    activePage: number
    cardRates: number
    rates: number
    notificationVolume: number
    notifications: MvpNotification[]
    userSession: Session | null
    partyId: number | null
    partyName: string | null
}


/**
 * Extends React.CSSProperties to include custom CSS variables for tomb position.
 */
interface TombPosCss extends React.CSSProperties {
    "--tombpos-x": string
    "--tombpos-y": string
}

interface PartyMember {
    color: string | null;
    created_at: string;
    id: number;
    pseudo: string | null;
    user_id: string | null;
}

interface PartyState {
    partyId: number | null;
    partyName: string | null;
    partyMembers: PartyMember[];
    partyOwner: string | null;
    partyOwnerId: string | null;
}