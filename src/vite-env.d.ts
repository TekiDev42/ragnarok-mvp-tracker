/// <reference types="vite/client" />

/**
 * Extends the Window interface to include the mvpApi object.
 */
interface Window {
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
    deathTime: string
    respawnTimer: number
    tombPos: TombPos
    size: {
        height: number,
        width: number
    },
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

/**
 * Represents the user state, extending the Settings interface.
 */
interface UserState extends Settings {
    activePage: number
    cardRates: number
    rates: number
    notificationVolume: number
    notifications: MvpNotification[]
}


/**
 * Extends React.CSSProperties to include custom CSS variables for tomb position.
 */
interface TombPosCss extends React.CSSProperties {
    "--tombpos-x": string
    "--tombpos-y": string
}