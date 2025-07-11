export interface ExpenseTrend {
  month: string
  amount: number
}

export interface Category {
  id: number
  name: string
  is_active: boolean
  price_value?: string
  description?: string
}

export interface SubCategory {
  id: number
  name: string
  si_unit: string
  description: string
}

export interface IncomeType {
  id: number
  name: string
  si_unit: string
  description: string
}

export interface ExpenseReference {
  id: number
  reference_file: string
}

export interface IncomeReference {
  id: number
  reference_file: string
}

export interface OfficeExpense {
  id?: number
  description: string
  amount: string | number
  category: number
  sub_category: number | null
  quantity: number
  expense_date: string
  references?: ExpenseReference[]
}

export interface OfficeIncome {
  id?: number
  description: string
  amount: string | number
  category: number | null
  income_type: number | null
  income_date: string
  created_by?: number
  created_at?: string
  references?: IncomeReference[]
}

export interface User {
  id: number
  username: string
  email?: string
  first_name: string
  last_name: string
  permission_level: "view_only" | "editor" | "admin"
  is_active: boolean
  created_at: string
  updated_at: string
  is_mobile_user: boolean
  role?: Role
}

export interface Role {
  id: number
  name: string
  description?: string
}

export interface JourneyRequest {
  id: number
  category?: Category
  journey_name: string
  trip_from: string
  trip_to: string
  total_trip_amount: string
  start_date: string
  end_date?: string
  created_by: User
  created_by_name?: string
  assigned_to?: User
  assigned_to_active_category?: string
  assigned_to_active_category_value?: string
  is_active: boolean
  is_accepted: boolean
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
  total_amount?: number
  total_quantity?: number
}

export interface Journey {
  id: number
  journey_name: string
  trip_from: string
  trip_to: string
  total_trip_amount: string
  start_date: string
  end_date?: string
  created_by_name?: string
  current_balance: string
  total_expenses: string
  total_income: string
  transactions?: Transaction[]
}

export interface Transaction {
  id: number
  description: string
  transaction_type: "income" | "expense"
  amount: string
  transaction_date: string
  created_by_name?: string
  files?: TransactionFile[]
}

export interface TransactionFile {
  id: number
  file: string
  uploaded_at: string
}
