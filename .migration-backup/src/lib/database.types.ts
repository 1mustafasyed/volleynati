export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: number
          team1: string
          team2: string
          score1: number
          score2: number
          status: string
          start_time: string
          game_type: string
          bracket_id: number
          updated_by: string
          updated_at: string
        }
        Insert: {
          id?: number
          team1: string
          team2: string
          score1: number
          score2: number
          status: string
          start_time: string
          game_type: string
          bracket_id: number
          updated_by: string
          updated_at?: string
        }
        Update: {
          id?: number
          team1?: string
          team2?: string
          score1?: number
          score2?: number
          status?: string
          start_time?: string
          game_type?: string
          bracket_id?: number
          updated_by?: string
          updated_at?: string
        }
      }
      // Add your table definitions here
      // Example:
      // users: {
      //   Row: {
      //     id: string
      //     email: string
      //     created_at: string
      //   }
      //   Insert: {
      //     id?: string
      //     email: string
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     email?: string
      //     created_at?: string
      //   }
      // }
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
  }
} 