'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type Product = {
  id: string
  name: string
  price: number
  description: string | null
  created_at: string
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const description = (formData.get('description') as string) || null

  const { error } = await supabase
    .from('products')
    .insert({ name, price, description })

  if (error) throw new Error(error.message)
  revalidatePath('/')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
}
