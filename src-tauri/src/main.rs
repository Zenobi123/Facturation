// Prevents a console window from appearing on Windows in release mode
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    prisma_gestion_lib::run()
}
