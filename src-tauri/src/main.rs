// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod encryption;
use encryption::{generate_master_password, encrypt, decrypt};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![encrypt, decrypt, generate_master_password])
    .run(tauri::generate_context!())
    .expect("Error while running tauri application");
}
