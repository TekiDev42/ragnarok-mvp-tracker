/// <reference types="vite/client" />
/// <reference types="@supabase/supabase-js" />

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
    userSession: Session | null
}


/**
 * Extends React.CSSProperties to include custom CSS variables for tomb position.
 */
interface TombPosCss extends React.CSSProperties {
    "--tombpos-x": string
    "--tombpos-y": string
}


// SUPABASE
type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            graphql: {
                Args: {
                    operationName?: string
                    query?: string
                    variables?: Json
                    extensions?: Json
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    public: {
        Tables: {
            maps_party: {
                Row: {
                    created_at: string
                    death_time: string | null
                    id: number
                    map_id: number | null
                    mvp_id: number | null
                    party_id: number | null
                    respawn_timer: number | null
                    tomb_pos_x: number | null
                    tomb_pos_y: number | null
                }
                Insert: {
                    created_at?: string
                    death_time?: string | null
                    id?: number
                    map_id?: number | null
                    mvp_id?: number | null
                    party_id?: number | null
                    respawn_timer?: number | null
                    tomb_pos_x?: number | null
                    tomb_pos_y?: number | null
                }
                Update: {
                    created_at?: string
                    death_time?: string | null
                    id?: number
                    map_id?: number | null
                    mvp_id?: number | null
                    party_id?: number | null
                    respawn_timer?: number | null
                    tomb_pos_x?: number | null
                    tomb_pos_y?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "maps_party_map_id_fkey"
                        columns: ["map_id"]
                        isOneToOne: false
                        referencedRelation: "mvp_maps"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "maps_party_mvp_id_fkey"
                        columns: ["mvp_id"]
                        isOneToOne: false
                        referencedRelation: "mvps"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "maps_party_party_id_fkey"
                        columns: ["party_id"]
                        isOneToOne: false
                        referencedRelation: "party"
                        referencedColumns: ["id"]
                    },
                ]
            }
            mvp_drops: {
                Row: {
                    id: number
                    index: number | null
                    is_mvp_drop: boolean | null
                    item: string
                    mvp_id: number | null
                    random_option_group: string | null
                    rate: number
                    steal_protected: boolean | null
                }
                Insert: {
                    id?: number
                    index?: number | null
                    is_mvp_drop?: boolean | null
                    item: string
                    mvp_id?: number | null
                    random_option_group?: string | null
                    rate: number
                    steal_protected?: boolean | null
                }
                Update: {
                    id?: number
                    index?: number | null
                    is_mvp_drop?: boolean | null
                    item?: string
                    mvp_id?: number | null
                    random_option_group?: string | null
                    rate?: number
                    steal_protected?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "mvp_drops_mvp_id_fkey"
                        columns: ["mvp_id"]
                        isOneToOne: false
                        referencedRelation: "mvps"
                        referencedColumns: ["id"]
                    },
                ]
            }
            mvp_maps: {
                Row: {
                    death_time: string | null
                    id: number
                    map_height: number | null
                    map_width: number | null
                    mvp_id: number | null
                    name: string
                    respawn_timer: number
                    tomb_pos_x: number | null
                    tomb_pos_y: number | null
                }
                Insert: {
                    death_time?: string | null
                    id?: number
                    map_height?: number | null
                    map_width?: number | null
                    mvp_id?: number | null
                    name: string
                    respawn_timer: number
                    tomb_pos_x?: number | null
                    tomb_pos_y?: number | null
                }
                Update: {
                    death_time?: string | null
                    id?: number
                    map_height?: number | null
                    map_width?: number | null
                    mvp_id?: number | null
                    name?: string
                    respawn_timer?: number
                    tomb_pos_x?: number | null
                    tomb_pos_y?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "mvp_maps_mvp_id_fkey"
                        columns: ["mvp_id"]
                        isOneToOne: false
                        referencedRelation: "mvps"
                        referencedColumns: ["id"]
                    },
                ]
            }
            mvp_modes: {
                Row: {
                    can_move: boolean | null
                    cast_sensor_chase: boolean | null
                    cast_sensor_idle: boolean | null
                    change_chase: boolean | null
                    ignore_magic: boolean | null
                    ignore_melee: boolean | null
                    ignore_misc: boolean | null
                    ignore_ranged: boolean | null
                    mvp: boolean | null
                    mvp_id: number
                    no_random_walk: boolean | null
                    teleport_block: boolean | null
                }
                Insert: {
                    can_move?: boolean | null
                    cast_sensor_chase?: boolean | null
                    cast_sensor_idle?: boolean | null
                    change_chase?: boolean | null
                    ignore_magic?: boolean | null
                    ignore_melee?: boolean | null
                    ignore_misc?: boolean | null
                    ignore_ranged?: boolean | null
                    mvp?: boolean | null
                    mvp_id: number
                    no_random_walk?: boolean | null
                    teleport_block?: boolean | null
                }
                Update: {
                    can_move?: boolean | null
                    cast_sensor_chase?: boolean | null
                    cast_sensor_idle?: boolean | null
                    change_chase?: boolean | null
                    ignore_magic?: boolean | null
                    ignore_melee?: boolean | null
                    ignore_misc?: boolean | null
                    ignore_ranged?: boolean | null
                    mvp?: boolean | null
                    mvp_id?: number
                    no_random_walk?: boolean | null
                    teleport_block?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "mvp_modes_mvp_id_fkey"
                        columns: ["mvp_id"]
                        isOneToOne: true
                        referencedRelation: "mvps"
                        referencedColumns: ["id"]
                    },
                ]
            }
            mvp_race_groups: {
                Row: {
                    enabled: boolean | null
                    group_name: string
                    mvp_id: number
                }
                Insert: {
                    enabled?: boolean | null
                    group_name: string
                    mvp_id: number
                }
                Update: {
                    enabled?: boolean | null
                    group_name?: string
                    mvp_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "mvp_race_groups_mvp_id_fkey"
                        columns: ["mvp_id"]
                        isOneToOne: false
                        referencedRelation: "mvps"
                        referencedColumns: ["id"]
                    },
                ]
            }
            mvps: {
                Row: {
                    aegis_name: string
                    agi: number | null
                    ai: number | null
                    attack: number | null
                    attack_delay: number | null
                    attack_motion: number | null
                    attack_range: number | null
                    attack2: number | null
                    base_exp: number | null
                    chase_range: number | null
                    class: Database["public"]["Enums"]["class_type"] | null
                    client_attack_motion: number | null
                    created_at: string | null
                    damage_motion: number | null
                    damage_taken: number | null
                    defense: number | null
                    dex: number | null
                    element: Database["public"]["Enums"]["element_type"] | null
                    element_level: number | null
                    hp: number | null
                    id: number
                    image: string
                    int: number | null
                    is_bookmark: boolean | null
                    japanese_name: string | null
                    job_exp: number | null
                    level: number | null
                    luk: number | null
                    magic_defense: number | null
                    magic_resistance: number | null
                    mvp_exp: number | null
                    mvp_id: number
                    name: string
                    race: string | null
                    resistance: number | null
                    size: Database["public"]["Enums"]["size_type"] | null
                    skill_range: number | null
                    sp: number | null
                    str: number | null
                    updated_at: string | null
                    vit: number | null
                    walk_speed: number | null
                }
                Insert: {
                    aegis_name: string
                    agi?: number | null
                    ai?: number | null
                    attack?: number | null
                    attack_delay?: number | null
                    attack_motion?: number | null
                    attack_range?: number | null
                    attack2?: number | null
                    base_exp?: number | null
                    chase_range?: number | null
                    class?: Database["public"]["Enums"]["class_type"] | null
                    client_attack_motion?: number | null
                    created_at?: string | null
                    damage_motion?: number | null
                    damage_taken?: number | null
                    defense?: number | null
                    dex?: number | null
                    element?: Database["public"]["Enums"]["element_type"] | null
                    element_level?: number | null
                    hp?: number | null
                    id?: number
                    image: string
                    int?: number | null
                    is_bookmark?: boolean | null
                    japanese_name?: string | null
                    job_exp?: number | null
                    level?: number | null
                    luk?: number | null
                    magic_defense?: number | null
                    magic_resistance?: number | null
                    mvp_exp?: number | null
                    mvp_id: number
                    name: string
                    race?: string | null
                    resistance?: number | null
                    size?: Database["public"]["Enums"]["size_type"] | null
                    skill_range?: number | null
                    sp?: number | null
                    str?: number | null
                    updated_at?: string | null
                    vit?: number | null
                    walk_speed?: number | null
                }
                Update: {
                    aegis_name?: string
                    agi?: number | null
                    ai?: number | null
                    attack?: number | null
                    attack_delay?: number | null
                    attack_motion?: number | null
                    attack_range?: number | null
                    attack2?: number | null
                    base_exp?: number | null
                    chase_range?: number | null
                    class?: Database["public"]["Enums"]["class_type"] | null
                    client_attack_motion?: number | null
                    created_at?: string | null
                    damage_motion?: number | null
                    damage_taken?: number | null
                    defense?: number | null
                    dex?: number | null
                    element?: Database["public"]["Enums"]["element_type"] | null
                    element_level?: number | null
                    hp?: number | null
                    id?: number
                    image?: string
                    int?: number | null
                    is_bookmark?: boolean | null
                    japanese_name?: string | null
                    job_exp?: number | null
                    level?: number | null
                    luk?: number | null
                    magic_defense?: number | null
                    magic_resistance?: number | null
                    mvp_exp?: number | null
                    mvp_id?: number
                    name?: string
                    race?: string | null
                    resistance?: number | null
                    size?: Database["public"]["Enums"]["size_type"] | null
                    skill_range?: number | null
                    sp?: number | null
                    str?: number | null
                    updated_at?: string | null
                    vit?: number | null
                    walk_speed?: number | null
                }
                Relationships: []
            }
            party: {
                Row: {
                    code: string | null
                    created_at: string
                    id: number
                    leader: string | null
                }
                Insert: {
                    code?: string | null
                    created_at?: string
                    id?: number
                    leader?: string | null
                }
                Update: {
                    code?: string | null
                    created_at?: string
                    id?: number
                    leader?: string | null
                }
                Relationships: []
            }
            party_members: {
                Row: {
                    created_at: string
                    id: number
                    member_id: string | null
                    party_id: number | null
                }
                Insert: {
                    created_at?: string
                    id?: number
                    member_id?: string | null
                    party_id?: number | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    member_id?: string | null
                    party_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "party_members_party_id_fkey"
                        columns: ["party_id"]
                        isOneToOne: false
                        referencedRelation: "party"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            insert_party_member: {
                Args: {
                    code: string
                    user_id: string
                }
                Returns: string
            }
        }
        Enums: {
            class_type: "Normal" | "Boss" | "Guardian" | "Battlefield"
            element_type:
            | "Neutral"
            | "Water"
            | "Earth"
            | "Fire"
            | "Wind"
            | "Poison"
            | "Holy"
            | "Shadow"
            | "Ghost"
            | "Undead"
            | "Dark"
            size_type: "Small" | "Medium" | "Large"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
