import { supabase } from "./supabaseClient";

export function generateCode(length = 6): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  crypto.getRandomValues(new Uint32Array(length)).forEach((v) => {
    out += alphabet[v % alphabet.length];
  });
  return out;
}

export async function createShortLink(destination: string) {
  const code = generateCode(6);
  const { data, error } = await supabase
    .from("links")
    .insert({ code, destination })
    .select("code")
    .single();
  if (error) throw error;
  return data.code as string;
}


