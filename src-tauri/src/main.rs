// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn getbattery() -> String {
    let battery_data = std::process::Command::new("upower")
                            .arg("-i")
                            .arg("/org/freedesktop/UPower/devices/battery_BAT0")
                            .output();
    
    match battery_data {
        Ok(bat_data) => {String::from_utf8_lossy(&bat_data.stdout).to_string()},
        Err(e) => {String::from("NIL")}        
    }                     
}

#[tauri::command]
fn whoami() -> String {
    let username = std::process::Command::new("whoami").output();

    match username {
        Ok(user_name) => {String::from_utf8_lossy(&user_name.stdout).to_string()},
        Err(e) => {String::from("NIL")}
    }
}

#[tauri::command]
fn cpuload() -> String {
    let cpu_load = std::process::Command::new("uptime").output();

    match cpu_load {
        Ok(loadcpu) => {String::from_utf8_lossy(&loadcpu.stdout).to_string()},
        Err(e) => {String::from("NIL")}
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![whoami])
        .invoke_handler(tauri::generate_handler![getbattery])
        .invoke_handler(tauri::generate_handler![cpuload])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
