export type Course = {
  title: string;
  category: string;
  level: string;
  duration: string;
  progress: number;
  color: string;
  icon: string;
};

export const courses: Course[] = [
  { title: "PLC Fundamentals: From I/O to Ladder", category: "PLC & Controls", level: "Foundation", duration: "4h 20m", progress: 68, color: "blue", icon: "⌘" },
  { title: "Sensor Selection & Troubleshooting", category: "Sensors", level: "Foundation", duration: "2h 45m", progress: 32, color: "purple", icon: "◎" },
  { title: "Servo & Motion Control Essentials", category: "Motion", level: "Intermediate", duration: "5h 10m", progress: 0, color: "orange", icon: "↗" },
];

export const recentLessons = [
  { title: "Reading a Mitsubishi FX5U wiring diagram", course: "PLC Fundamentals", time: "Today · 10:42 AM", icon: "⌘", color: "blue" },
  { title: "Proximity sensor: PNP vs NPN", course: "Sensor Selection", time: "Yesterday · 3:18 PM", icon: "◎", color: "purple" },
  { title: "Building a preventive maintenance checklist", course: "TPM in Practice", time: "Nov 10 · 9:05 AM", icon: "▤", color: "green" },
];

export const libraryDocuments = [
  { title: "FX5U Series User's Manual — Hardware", type: "PDF", category: "PLC", size: "12.4 MB", updated: "Nov 08, 2026", tags: ["Mitsubishi", "Wiring", "Reference"] },
  { title: "SOP — Servo motor replacement", type: "DOCX", category: "Maintenance", size: "2.1 MB", updated: "Nov 06, 2026", tags: ["Servo", "SOP", "Safety"] },
  { title: "Keyence IV3 quick-start guide", type: "PDF", category: "Vision", size: "8.7 MB", updated: "Nov 02, 2026", tags: ["Keyence", "Vision", "Setup"] },
  { title: "Monthly compressor inspection checklist", type: "XLSX", category: "Facility", size: "840 KB", updated: "Oct 28, 2026", tags: ["PM", "Air system"] },
  { title: "OEE loss tree workshop", type: "PPTX", category: "Factory management", size: "5.3 MB", updated: "Oct 20, 2026", tags: ["OEE", "Workshop"] },
  { title: "EtherNet/IP troubleshooting field notes", type: "PDF", category: "Networking", size: "3.6 MB", updated: "Oct 14, 2026", tags: ["Network", "EtherNet/IP"] },
];

export const alarms = [
  { code: "AL.52", equipment: "MR-J4 Servo Drive", family: "Servo", symptom: "Overload warning during acceleration", cause: "Excessive load inertia or short acceleration time", severity: "High", updated: "Nov 12, 2026" },
  { code: "E.0C", equipment: "FR-E800 Inverter", family: "Inverter", symptom: "Overcurrent trip at startup", cause: "Motor / cable short or acceleration too fast", severity: "Critical", updated: "Nov 11, 2026" },
  { code: "E6", equipment: "Omron E3Z Sensor", family: "Sensor", symptom: "Output remains OFF with target present", cause: "Incorrect wiring, sensitivity, or light/dark mode", severity: "Medium", updated: "Nov 08, 2026" },
  { code: "Er.20", equipment: "Keyence IV3 Vision", family: "Vision", symptom: "Communication timeout with controller", cause: "IP mismatch or network link instability", severity: "Medium", updated: "Nov 04, 2026" },
  { code: "SF", equipment: "Siemens S7-1200", family: "PLC", symptom: "Safety fault after restart", cause: "Safety circuit feedback did not return", severity: "High", updated: "Oct 31, 2026" },
];

export const roadmaps = [
  { level: "01", name: "Electrical foundations", subtitle: "Build safe, confident electrical fundamentals", topics: ["Electrical safety & LOTO", "AC/DC fundamentals", "Read wiring diagrams", "Motors & protection"], lessons: 12, duration: "8 hours", state: "Completed", progress: 100, tint: "blue" },
  { level: "02", name: "Sensors & instrumentation", subtitle: "Understand how machines see and measure", topics: ["Proximity & photoelectric", "PNP / NPN wiring", "Analog signals 4–20 mA", "Calibration & fault finding"], lessons: 16, duration: "11 hours", state: "In progress", progress: 45, tint: "purple" },
  { level: "03", name: "PLC & industrial networks", subtitle: "Program, connect and troubleshoot controllers", topics: ["Ladder logic, I/O & timers", "Mitsubishi · Keyence · Omron · Siemens", "Registers, counters & PID", "Modbus TCP · EtherNet/IP"], lessons: 28, duration: "22 hours", state: "Up next", progress: 0, tint: "orange" },
  { level: "04", name: "Automation systems", subtitle: "Connect motion, robotics and factory systems", topics: ["Servo & inverter", "Vision systems & robots", "AGV / conveyor integration", "SCADA & MES fundamentals"], lessons: 24, duration: "19 hours", state: "Locked", progress: 0, tint: "green" },
  { level: "05", name: "Factory excellence", subtitle: "Improve reliability and operational performance", topics: ["TPM & preventive maintenance", "OEE · MTBF · MTTR", "FMEA · SPC · 5M1E", "Predictive maintenance"], lessons: 20, duration: "16 hours", state: "Locked", progress: 0, tint: "pink" },
];

export const caseStudies = [
  { title: "Reducing false rejects on a vision inspection station", area: "Quality · Vision", result: "−38% false rejects", color: "purple" },
  { title: "Unplanned downtime on a pallet conveyor", area: "Maintenance · PLC", result: "+12.4 OEE points", color: "blue" },
];
