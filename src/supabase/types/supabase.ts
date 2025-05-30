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
      maps_party: {
        Row: {
          created_at: string
          death_time: number | null
          id: number
          last_user_update: string | null
          map_name: string | null
          mvp_id: number | null
          party_id: number | null
          tomb_pos_x: number | null
          tomb_pos_y: number | null
        }
        Insert: {
          created_at?: string
          death_time?: number | null
          id?: number
          last_user_update?: string | null
          map_name?: string | null
          mvp_id?: number | null
          party_id?: number | null
          tomb_pos_x?: number | null
          tomb_pos_y?: number | null
        }
        Update: {
          created_at?: string
          death_time?: number | null
          id?: number
          last_user_update?: string | null
          map_name?: string | null
          mvp_id?: number | null
          party_id?: number | null
          tomb_pos_x?: number | null
          tomb_pos_y?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maps_party_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "party"
            referencedColumns: ["id"]
          },
        ]
      }
      party: {
        Row: {
          code_id: string | null
          created_at: string
          id: number
          leader: string | null
          party_name: string | null
        }
        Insert: {
          code_id?: string | null
          created_at?: string
          id?: number
          leader?: string | null
          party_name?: string | null
        }
        Update: {
          code_id?: string | null
          created_at?: string
          id?: number
          leader?: string | null
          party_name?: string | null
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
      user_profile: {
        Row: {
          color: string | null
          created_at: string
          id: number
          pseudo: string | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          pseudo?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          pseudo?: string | null
          user_id?: string | null
        }
        Relationships: []
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
        Returns: Json
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
