export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      drops: {
        Row: {
          id: number
          item: string | null
          mvp_id: number | null
          rate: number | null
          steal_protected: boolean | null
        }
        Insert: {
          id?: number
          item?: string | null
          mvp_id?: number | null
          rate?: number | null
          steal_protected?: boolean | null
        }
        Update: {
          id?: number
          item?: string | null
          mvp_id?: number | null
          rate?: number | null
          steal_protected?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "drops_mvp_id_fkey"
            columns: ["mvp_id"]
            isOneToOne: false
            referencedRelation: "mvps"
            referencedColumns: ["id"]
          },
        ]
      }
      mvp_drops: {
        Row: {
          id: number
          item: string | null
          mvp_id: number | null
          rate: number | null
        }
        Insert: {
          id?: number
          item?: string | null
          mvp_id?: number | null
          rate?: number | null
        }
        Update: {
          id?: number
          item?: string | null
          mvp_id?: number | null
          rate?: number | null
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
          height: number | null
          id: number
          mvp_id: number | null
          name: string | null
          respawn_timer: number | null
          tomb_pos_x: number | null
          tomb_pos_y: number | null
          width: number | null
        }
        Insert: {
          death_time?: string | null
          height?: number | null
          id?: number
          mvp_id?: number | null
          name?: string | null
          respawn_timer?: number | null
          tomb_pos_x?: number | null
          tomb_pos_y?: number | null
          width?: number | null
        }
        Update: {
          death_time?: string | null
          height?: number | null
          id?: number
          mvp_id?: number | null
          name?: string | null
          respawn_timer?: number | null
          tomb_pos_x?: number | null
          tomb_pos_y?: number | null
          width?: number | null
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
          mvp: boolean | null
          mvp_id: number
          teleport_block: boolean | null
        }
        Insert: {
          can_move?: boolean | null
          mvp?: boolean | null
          mvp_id: number
          teleport_block?: boolean | null
        }
        Update: {
          can_move?: boolean | null
          mvp?: boolean | null
          mvp_id?: number
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
      mvps: {
        Row: {
          aegis_name: string | null
          agi: number | null
          ai: number | null
          attack: number | null
          attack_delay: number | null
          attack_motion: number | null
          attack_range: number | null
          attack2: number | null
          base_exp: number | null
          chase_range: number | null
          class: string | null
          client_attack_motion: number | null
          damage_motion: number | null
          damage_taken: number | null
          defense: number | null
          dex: number | null
          element: string | null
          element_level: number | null
          hp: number | null
          id: number
          image: string | null
          int: number | null
          is_bookmark: boolean | null
          japanese_name: string | null
          job_exp: number | null
          level: number | null
          luk: number | null
          magic_defense: number | null
          mvp_exp: number | null
          name: string | null
          race: string | null
          size: string | null
          skill_range: number | null
          str: number | null
          vit: number | null
          walk_speed: number | null
        }
        Insert: {
          aegis_name?: string | null
          agi?: number | null
          ai?: number | null
          attack?: number | null
          attack_delay?: number | null
          attack_motion?: number | null
          attack_range?: number | null
          attack2?: number | null
          base_exp?: number | null
          chase_range?: number | null
          class?: string | null
          client_attack_motion?: number | null
          damage_motion?: number | null
          damage_taken?: number | null
          defense?: number | null
          dex?: number | null
          element?: string | null
          element_level?: number | null
          hp?: number | null
          id: number
          image?: string | null
          int?: number | null
          is_bookmark?: boolean | null
          japanese_name?: string | null
          job_exp?: number | null
          level?: number | null
          luk?: number | null
          magic_defense?: number | null
          mvp_exp?: number | null
          name?: string | null
          race?: string | null
          size?: string | null
          skill_range?: number | null
          str?: number | null
          vit?: number | null
          walk_speed?: number | null
        }
        Update: {
          aegis_name?: string | null
          agi?: number | null
          ai?: number | null
          attack?: number | null
          attack_delay?: number | null
          attack_motion?: number | null
          attack_range?: number | null
          attack2?: number | null
          base_exp?: number | null
          chase_range?: number | null
          class?: string | null
          client_attack_motion?: number | null
          damage_motion?: number | null
          damage_taken?: number | null
          defense?: number | null
          dex?: number | null
          element?: string | null
          element_level?: number | null
          hp?: number | null
          id?: number
          image?: string | null
          int?: number | null
          is_bookmark?: boolean | null
          japanese_name?: string | null
          job_exp?: number | null
          level?: number | null
          luk?: number | null
          magic_defense?: number | null
          mvp_exp?: number | null
          name?: string | null
          race?: string | null
          size?: string | null
          skill_range?: number | null
          str?: number | null
          vit?: number | null
          walk_speed?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
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

export type TablesInsert<
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

export type TablesUpdate<
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

export type Enums<
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

export type CompositeTypes<
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
