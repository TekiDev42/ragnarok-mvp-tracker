/// <reference types="vite/client" />

interface Window {
    mvpApi: {
        // MVP
        getMvps: () => Promise<Mvp[]>
        updateMvp: (mvp: Mvp) => void
        setMvps: (mvps: Mvp[]) => void

        // SETTINGS
        getSettings: () => Promise<Settings>
        setSettings: (key:string, value: string|number|boolean) => void
    }
}

interface Settings {
    animation: boolean
    background: string
    soundNotification: boolean
    delayNotification: number
    respawnTimer: number
    perPage: number
}

interface Drop {
    Item: string
    Rate: number
    StealProtected?: boolean
    RandomOptionGroup?: string
    Index?: number
}

interface TombPos {
    x: number
    y: number
}

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
    isBookmark: boolean
    mvpMaps: MvpMap[]
}

interface MvpState {
    mvps: Mvp[]
    filtered: Mvp[]
}

interface UserState extends Settings {}

interface TombPosCss extends React.CSSProperties {
    "--tombpos-x": string
    "--tombpos-y": string
}