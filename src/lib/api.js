import { supabase } from './supabase';

// ─────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────

export async function signUp({ email, password, fullName, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, phone } },
  });
  if (error) throw error;
  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ─────────────────────────────────────────
//  PROPERTIES
// ─────────────────────────────────────────

export async function getProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function searchProperties(term) {
  const q = term.toLowerCase();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'approved')
    .or(`title.ilike.%${q}%,location.ilike.%${q}%,city.ilike.%${q}%,type.ilike.%${q}%`);
  if (error) throw error;
  return data ?? [];
}

export async function getPropertyById(id) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function getAllPropertiesAdmin() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function updatePropertyStatus(id, status) {
  const { data, error } = await supabase
    .from('properties')
    .update({ status, verified: status === 'approved' })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProperty(id) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────
//  BOOKINGS
// ─────────────────────────────────────────

export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(bookingData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllBookingsAdmin() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// ─────────────────────────────────────────
//  OWNER SUBMISSIONS
// ─────────────────────────────────────────

export async function submitOwnerProperty(formData) {
  const { data, error } = await supabase
    .from('owner_submissions')
    .insert(formData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getOwnerSubmissionsAdmin() {
  const { data, error } = await supabase
    .from('owner_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}