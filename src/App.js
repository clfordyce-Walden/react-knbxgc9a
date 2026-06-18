import { useState, useMemo, useRef, useCallback, useEffect } from "react";

const WALDEN_LOGO = "data:image/png;base64,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";

// ── STORAGE ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = "buildtrack_v1";
function loadSaved() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveToDisk(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ["Not Started","In Progress","Complete","Blocked"];
const STATUS_COLORS  = {"Not Started":"#6B6B6B","In Progress":"#F59E0B","Complete":"#22C55E","Blocked":"#EF4444"};
const PHASE_COLORS   = ["#1A1A1A","#4A7B6F","#2B4C7E","#6B3FA0","#B04A4A","#3A7CB0","#8A7340","#2B7B5A"];
const TODAY = new Date().toISOString().split("T")[0];
const uid = () => Math.random().toString(36).slice(2,9);
const fmt$ = v => (!v && v!==0)||v==="" ? "—" : "$"+Number(v).toLocaleString();
const num  = v => parseFloat(v)||0;

// ── DEFAULT PHASES ────────────────────────────────────────────────────────────
function pouredWallPhases() {
  const T=(l,d)=>({id:uid(),label:l,duration:d||1,deps:[]});
  return [
    { id:uid(), label:"Site Prep", color:"#C17A3A", tasks:[
      T("Boundary Survey",1),
      T("Clearing Survey",1),
      T("Temp Toilet",1),
      T("Lot Clear",1),
      T("Silt Fence",1),
      T("Order Trusses",1),
      T("Order Mailbox",1),
      T("Confirm FFE w/ Approved Engineer Survey",1),
      T("Schedule Poured Walls",1),
      T("Rough House Stake",1),
      T("Piling Pad Elevation",1),
      T("Piling Pad",1),
      T("Piling Stake",1),
      T("Dumpster",1),
      T("Permit Plans to Lumber Supplier",1),
      T("Piling Steel Delivered",1),
      T("Piling Steel Install",1),
      T("Piling Survey",1),
      T("Piling Survey to FDEP",1),
      T("Piling Inspection Engineer",1),
      T("Pour Pilings",1),
      T("Build House Pad",1),
      T("Water Meter Install",1),
    ]},
    { id:uid(), label:"Site & Foundation", color:"#8A7340", tasks:[
      T("Good House Stake",1),
      T("Pad Compaction Test",1),
      T("Footer Steel",1),
      T("Pool Footer Required",1),
      T("Dig Footers",1),
      T("Footer UFER Ground",1),
      T("Footer Insp",1),
      T("Pour Footer",1),
      T("Stemwall Material",1),
      T("Stemwall Labor",1),
      T("Form Boards",1),
      T("Cabinet Layout Complete",1),
      T("Measure Forms",1),
      T("Form Check Survey",1),
      T("Plumber / Pool mark Stemwall for penetrations",1),
      T("Stemwall Insp",1),
      T("Pour Stemwall",1),
      T("Backfill Stemwall",1),
      T("Water Softener Pre-pipe",1),
      T("Underground Plumb",1),
      T("Underground Plumb Insp",1),
      T("Order Slab Pack",1),
      T("Slab Prep",1),
      T("Mono UFER Ground",1),
      T("Floor Plug if App",1),
      T("Slab Insp",1),
      T("Pour Slab",1),
    ]},
    { id:uid(), label:"Slab & Pre-Wall", color:"#B04A4A", tasks:[
      T("Foundation Survey as required",1),
      T("Order Windows",1),
      T("Grade Around",1),
      T("Window ROs",1),
      T("Exterior Door ROs",1),
      T("Electrical Box Locations",1),
    ]},
    { id:uid(), label:"Wall System (Lifts)", color:"#2B4C7E", tasks:[
      T("Poured Wall Steel Install 1st Lift",1),
      T("Extend Waste Pipes 1st Lift",1),
      T("Poured Wall Steel Insp 1st Lift",1),
      T("Poured Wall Forming 1st Lift",1),
      T("Embed Straps 1st Lift",1),
      T("Strap Layout 1st Lift",1),
      T("Poured Wall Pour 1st Lift",1),
      T("Deliver Trusses 1st Lift",1),
      T("Deliver Lumber 1st Lift",1),
      T("Set Floor Trusses 1st Lift",1),
      T("Poured Wall Steel Install 2nd Lift",1),
      T("Extend Waste Pipes 2nd Lift",1),
      T("Poured Wall Steel Insp 2nd Lift",1),
      T("Poured Wall Forming 2nd Lift",1),
      T("Embed Straps 2nd Lift",1),
      T("Strap Layout 2nd Lift",1),
      T("Poured Wall Pour 2nd Lift",1),
      T("Deliver Trusses 2nd Lift",1),
      T("Deliver Lumber 2nd Lift",1),
      T("Set Floor Trusses 2nd Lift",1),
      T("Poured Wall Steel Install 3rd Lift",1),
      T("Extend Waste Pipes 3rd Lift",1),
      T("Poured Wall Steel Insp 3rd Lift",1),
      T("Poured Wall Forming 3rd Lift",1),
      T("Embed Straps 3rd Lift",1),
      T("Strap Layout 3rd Lift",1),
      T("Poured Wall Pour 3rd Lift",1),
      T("Del Block",1),
      T("Lay Block",1),
      T("Order Embed Straps",1),
      T("Strap Lay Out",1),
      T("Lintel Insp",1),
      T("Lintel Pour",1),
      T("Truss Del",1),
      T("Lumber Delivery",1),
      T("Metal Strap Delivery",1),
      T("Sch. Window Install",1),
    ]},
    { id:uid(), label:"Framing & Dry-In", color:"#3A7CB0", tasks:[
      T("Order Tile",1),
      T("Start Frame",1),
      T("Sch. Roof Dry In",1),
      T("Sch. 2nd floor torch down",1),
      T("Order Corbels",1),
      T("Roof Wall Sheeting Insp.",1),
      T("Sch. / Measure Ext Doors",1),
      T("Up Lift Insp",1),
      T("Window Install",1),
      T("Install Ext Doors",1),
      T("Window / Door Inspection",1),
      T("Confirm Trim Order",1),
      T("Schedule Plumb Pre Con",1),
      T("Schedule Electric Pre Con",1),
      T("Tub Set / Top Out Fixtures Y/N",1),
      T("HVAC Rough Hood Duct Size",1),
      T("Install Roof Metal and Vent Caps",1),
      T("Roof Dry In Insp",1),
      T("Wall Dry In Insp.",1),
      T("Exterior Siding Install",1),
      T("Shingle Roof Mat",1),
      T("Shingle Roof Install",1),
      T("Metal Roof Install",1),
    ]},
    { id:uid(), label:"Rough-Ins", color:"#4A7B6F", tasks:[
      T("Septic EHS Survey to Electrician if Aerobic System",1),
      T("Electric Rough",1),
      T("Kitchen RO Sink to Fridge Line",1),
      T("Low Voltage",1),
      T("Gas Piping Rough",1),
      T("Drywall Take Off",1),
      T("T&G Ceiling Ordered",1),
      T("Frame Walk",1),
      T("Frame Punch",1),
      T("Schedule Pool Install",1),
      T("Fire Caulk",1),
      T("Plumb Rough Insp",1),
      T("HVAC Rough Insp",1),
      T("Electric Rough Insp",1),
      T("Gas Rough Insp",1),
      T("Have water lines pressurized and tubs filled",1),
      T("Frame All Insp",1),
      T("Insulation Foam or Batt",1),
      T("Insulation Inspection",1),
      T("Notify Drywall Sub of Passed Insp",1),
    ]},
    { id:uid(), label:"Drywall & Wells", color:"#6B3FA0", tasks:[
      T("Drywall Walk with Sub",1),
      T("Deliver Drywall",1),
      T("Order Pavers",1),
      T("Hang Drywall",1),
      T("Drywall Screw Inspection",1),
      T("Install Potable Well",1),
      T("Install Irrigation Well",1),
      T("Lathe",1),
      T("Lathe Insp",1),
      T("Notify Stucco Sub of passed Inspection",1),
      T("Stucco",1),
      T("Stucco WIP Insp",1),
      T("Drywall Spray Date",1),
      T("Paint Prime Int",1),
      T("Measure California Closet / Pantry",1),
      T("Order Bahama Shutters",1),
    ]},
    { id:uid(), label:"Septic & Tile", color:"#8A7340", tasks:[
      T("Install Septic",1),
      T("Water Tie In Inspection",1),
      T("Sewer Tie In Insp",1),
      T("Cover Septic",1),
      T("Confirm Appliance Order",1),
      T("Tile Precon with Client",1),
      T("Deliver Tile",1),
      T("Install Floor Tile Drains Onsite Y/N",1),
      T("Install Wall Tile",1),
    ]},
    { id:uid(), label:"Interior Finishes", color:"#B04A4A", tasks:[
      T("Cabinet Install",1),
      T("Trim Del",1),
      T("Trim Labor",1),
      T("Interior Paint",1),
      T("Exterior Paint",1),
      T("Install California Closets/Pantry",1),
      T("Install Elec Meter Can",1),
      T("Notify FPL of Meter Elec Can Set",1),
      T("Order Stone Brick",1),
      T("Garage Door",1),
      T("T&G Ceiling Install",1),
      T("HVAC Trim",1),
      T("Soffit Facia",1),
      T("Install Foam Details",1),
      T("Blow Insulation",1),
      T("Top Install",1),
      T("Appliance Inspection",1),
      T("Plumb Trim",1),
      T("Shelving Enclosure Buyer Precon and Measure",1),
      T("Electric Trim / Generator",1),
      T("Early Power Insp",1),
    ]},
    { id:uid(), label:"Driveway & Hardscape", color:"#2B4C7E", tasks:[
      T("Driveway Pull",1),
      T("Culvert Set",1),
      T("Form Driveway",1),
      T("Run Irrigation Chase",1),
      T("Driveway Insp",1),
      T("Pour Drive",1),
      T("Deliver Pavers",1),
      T("Install Pavers",1),
      T("Install Stone",1),
      T("Gutter Install",1),
      T("Electric Meter Set",1),
      T("Electric Hot Check",1),
      T("AC Breaker Disconnect needed",1),
      T("Connect AC / Pump Whips",1),
      T("AC Start Up",1),
      T("Water Softener Install",1),
      T("RO Install",1),
      T("Water Start",1),
      T("Bac T Test",1),
      T("Blower Door Test",1),
      T("Mirrors Shelving Enclosure",1),
    ]},
    { id:uid(), label:"Pool, Outdoor & Landscape", color:"#2B7B5A", tasks:[
      T("Pool Deck Poured / Paved",1),
      T("Install Outdoor Kitchen",1),
      T("Stucco Outdoor Kitchen",1),
      T("Final Grade",1),
      T("Pre Sod Insp",1),
      T("Set Gas Tank",1),
      T("Irrigation",1),
      T("Landscape Installed",1),
      T("Sod Installed",1),
      T("Irrigation Bump",1),
      T("Septic Start",1),
      T("Septic Final",1),
      T("After pour Insp",1),
      T("Final Survey",1),
      T("FFE Certification",1),
      T("Asphaut Repair",1),
      T("Final Termite",1),
    ]},
    { id:uid(), label:"Close-Out & Punch", color:"#1A1A1A", tasks:[
      T("Rough Clean",1),
      T("Set Appliances",1),
      T("Gas Final",1),
      T("Carpet",1),
      T("California Closet / Pantry Install",1),
      T("Fireplace Trim",1),
      T("Stucco Bump",1),
      T("Trim Bump",1),
      T("Drywall Bump",1),
      T("Paint Bump",1),
      T("Plumbing Final Insp",1),
      T("HVAC Final Insp",1),
      T("Electric Final Insp",1),
      T("Cabinet Bump",1),
      T("Install Handle Set",1),
      T("Builder Punch",1),
      T("Install Mailbox",1),
      T("Install House Numbers",1),
      T("Screen Out",1),
      T("Final Clean",1),
      T("Exterior and Garage Clean",1),
      T("Pressure Wash",1),
      T("Zoning / Landscape Final",1),
      T("ROW Insp",1),
      T("Final Inspection",1),
    ]},
  ];
}

function blockWallPhases() {
  const T=(l)=>({id:uid(),label:l,duration:1,deps:[]});
  return [
    { id:uid(), label:"Pre-Construction & Permits", color:"#8A7340", tasks:[
      T("FPL Service Location"),
      T("Boundary Survey"),
      T("Clearing Survey"),
      T("Temp Toilet"),
      T("Lot Clear"),
      T("Silt Fence"),
      T("OrderTrusses"),
      T("Order Mailbox"),
      T("Confirm FFE w/Approved Engineer Survey"),
      T("Schedule Poured Walls"),
      T("Rough House Stake"),
      T("Dumpster"),
      T("Permit Plans to Lumber Supplier"),
      T("Water Meter Install"),
    ]},
    { id:uid(), label:"Pilings & Pad", color:"#B04A4A", tasks:[
      T("Piling Pad Elevation"),
      T("Piling Pad"),
      T("Piling Stake"),
      T("Piling Steel Delivered"),
      T("Piling Steel Install"),
      T("Piling Survey"),
      T("Piling Survey to FDEP"),
      T("Piling Inspection Engineer"),
      T("Pour Pilings"),
      T("Build House Pad"),
    ]},
    { id:uid(), label:"Foundation & Slab", color:"#2B4C7E", tasks:[
      T("Good House Stake"),
      T("Pad Compaction Test"),
      T("Footer Steel"),
      T("Pool Footer Required"),
      T("Dig Footers"),
      T("Footer UFER Ground"),
      T("Footer Insp"),
      T("Pour Footer"),
      T("Stemwall Material"),
      T("Stemwall Labor"),
      T("Form Boards"),
      T("Cabinet Layout Complete"),
      T("Measure Forms"),
      T("Form Check Survey"),
      T("Plumber / Pool mark Stemwall for penetrations"),
      T("Stemwall Insp"),
      T("Pour Stemwall"),
      T("Backfill Stemwall"),
      T("Water Softener Pre-pipe"),
      T("Underground Plumb"),
      T("Underground Plumb Insp"),
      T("Order Slab Pack"),
      T("Slab Prep"),
      T("Mono UFER Ground"),
      T("Floor Plug if App"),
      T("Slab Insp"),
      T("Pour Slab"),
      T("Foundation Survey as required"),
      T("Order Windows"),
      T("Grade Around"),
      T("Window ROs"),
      T("Exterior Door ROs"),
    ]},
    { id:uid(), label:"Block Walls (Lifts & Tie Beams)", color:"#3A7CB0", tasks:[
      T("Del Block"),
      T("Lay Block 1st Lift"),
      T("Extend Waste Pipes 1st Lift"),
      T("Embed Straps 1st Lift"),
      T("Strap Layout 1st Lift"),
      T("(Partial if Appl) Tie Beam 1st Lift Inspection"),
      T("Tie Beam Pour 1st Lift"),
      T("Deliver Trusses 1st Lift"),
      T("Deliver Lumber 1st Lift"),
      T("Set Floor Trusses 1st Lift"),
      T("Lay Block 2nd Lift"),
      T("Extend Waste Pipes 2nd Lift"),
      T("Embed Straps 2nd Lift"),
      T("Strap Layout 2nd Lift"),
      T("Partial Tie Beam 2nd Lift Inspection"),
      T("Tie Beam Pour 2nd Lift"),
      T("Deliver Trusses 2nd Lift"),
      T("Deliver Lumber 2nd Lift"),
      T("Set Floor Trusses 2nd Lift"),
      T("Lay Block 3rd Lift"),
      T("Extend Waste Pipes 3rd Lift"),
      T("Embed Straps 3rd Lift"),
      T("Strap Layout 3rd Lift"),
      T("Final Tie Beam Insp 3rd Lift"),
      T("Tie Beam Pour 3rd Lift"),
      T("Roof Truss Del"),
      T("Lumber Delivery"),
      T("Metal Strap Delivery"),
      T("Sch. Window Install"),
    ]},
    { id:uid(), label:"Framing & Dry-In", color:"#4A7B6F", tasks:[
      T("Order Tile"),
      T("Start Frame"),
      T("Sch. Roof Dry In"),
      T("Sch. 2nd floor torch down"),
      T("Order Corbels"),
      T("Roof Wall Sheeting Insp."),
      T("Sch. / Measure Ext Doors"),
      T("Up Lift Insp"),
      T("Window Install"),
      T("Install Ext Doors"),
      T("Window / Door Inspection"),
      T("Confirm Trim Order"),
      T("Schedule Plumb Pre Con"),
      T("Schedule Electric Pre Con"),
      T("Tub Set / Top Out Fixtures Y/N"),
      T("HVAC Rough Hood Duct Size"),
      T("Install Roof Metal and Vent Caps"),
      T("Roof Dry In Insp"),
      T("Wall Dry In Insp."),
      T("Exterior Siding Install"),
      T("Shingle Roof Mat"),
      T("Shingle Roof Install"),
      T("Metal Roof Install"),
    ]},
    { id:uid(), label:"Rough-Ins", color:"#6B3FA0", tasks:[
      T("Septic EHS Survey to Electrician if Aerobic System"),
      T("Electric Rough"),
      T("Kitchen RO Sink to Fridge Line"),
      T("Low Voltage"),
      T("Gas Piping Rough"),
      T("Drywall Take Off"),
      T("T&G Ceiling Ordered"),
      T("Frame Walk"),
      T("Frame Punch"),
      T("Schedule Pool Install"),
      T("Fire Caulk"),
      T("Plumb Rough Insp"),
      T("HVAC Rough Insp"),
      T("Electric Rough Insp"),
      T("Gas Rough Insp"),
      T("Have water lines pressurized and tubs filled"),
      T("Frame All Insp"),
      T("Insulation Foam or Batt"),
      T("Insulation Inspection"),
      T("Notify Drywall Sub of Passed Insp"),
    ]},
    { id:uid(), label:"Drywall, Wells & Stucco", color:"#8A7340", tasks:[
      T("Drywall Walk with Sub"),
      T("Deliver Drywall"),
      T("Order Pavers"),
      T("Hang Drywall"),
      T("Drywall Screw Inspection"),
      T("Install Potable Well"),
      T("Install Irrigation Well"),
      T("Lathe"),
      T("Lathe Insp"),
      T("Notify Stucco Sub of passed Inspection"),
      T("Stucco"),
      T("Stucco WIP Insp"),
      T("Drywall Spray Date"),
      T("Paint Prime Int"),
      T("Measure California Closet / Pantry"),
      T("Order Bahama Shutters"),
    ]},
    { id:uid(), label:"Septic & Tile", color:"#B04A4A", tasks:[
      T("Install Septic"),
      T("Water Tie In Inspection"),
      T("Sewer Tie In Insp"),
      T("Cover Septic"),
      T("Confirm Appliance Order"),
      T("Tile Precon with Client"),
      T("Deliver Tile"),
      T("Install Floor Tile Drains Onsite Y/N"),
      T("Install Wall Tile"),
    ]},
    { id:uid(), label:"Interior Finishes", color:"#2B4C7E", tasks:[
      T("Cabinet Install"),
      T("Trim Del"),
      T("Trim Labor"),
      T("Interior Paint"),
      T("Exterior Paint"),
      T("Install California Closets/Pantry"),
      T("Install Elec Meter Can"),
      T("Notify FPL of Meter Elec Can Set"),
      T("Order Stone Brick"),
      T("Garage Door"),
      T("T&G Ceiling Install"),
      T("HVAC Trim"),
      T("Soffit Facia"),
      T("Install Foam Details"),
      T("Blow Insulation"),
      T("Top Install"),
      T("Appliance Inspection"),
      T("Plumb Trim"),
      T("Shelving Enclosure Buyer Precon and Measure"),
      T("Electric Trim"),
      T("Early Power Insp"),
    ]},
    { id:uid(), label:"Driveway & Hardscape", color:"#3A7CB0", tasks:[
      T("Driveway Pull"),
      T("Culvert Set"),
      T("Form Driveway"),
      T("Run Irrigation Chase"),
      T("Driveway Insp"),
      T("Pour Drive"),
      T("Deliver Pavers"),
      T("Install Pavers"),
      T("Install Stone"),
      T("Gutter Install"),
      T("Electric Meter Set"),
      T("Electric Hot Check"),
      T("AC Breaker Disconnect needed"),
      T("Connect AC / Pump Whips"),
      T("AC Start Up"),
      T("Water Softener Install"),
      T("RO Install"),
      T("Water Start"),
      T("Bac T Test"),
      T("Blower Door Test"),
      T("Mirrors Shelving Enclosure"),
    ]},
    { id:uid(), label:"Pool, Outdoor & Landscape", color:"#2B7B5A", tasks:[
      T("Pool Deck Poured / Paved"),
      T("Install Outdoor Kitchen"),
      T("Stucco Outdoor Kitchen"),
      T("Final Grade"),
      T("Pre Sod Insp"),
      T("Set Gas Tank"),
      T("Irrigation"),
      T("Landscape Installed"),
      T("Sod Installed"),
      T("Irrigation Bump"),
      T("Septic Start"),
      T("Septic Final"),
      T("After pour Insp"),
      T("Final Survey"),
      T("FFE Certification"),
      T("Asphaut Repair"),
      T("Final Termite"),
    ]},
    { id:uid(), label:"Close-Out & Punch", color:"#1A1A1A", tasks:[
      T("Rough Clean"),
      T("Set Appliances"),
      T("Gas Final"),
      T("Carpet"),
      T("California Closet / Pantry Install"),
      T("Fireplace Trim"),
      T("Stucco Bump"),
      T("Trim Bump"),
      T("Drywall Bump"),
      T("Paint Bump"),
      T("Plumbing Final Insp"),
      T("HVAC Final Insp"),
      T("Electric Final Insp"),
      T("Cabinet Bump"),
      T("Install Handle Set"),
      T("Builder Punch"),
      T("Install Mailbox"),
      T("Install House Numbers"),
      T("Screen Out"),
      T("Final Clean"),
      T("Exterior and Garage Clean"),
      T("Pressure Wash"),
      T("Zoning / Landscape Final"),
      T("ROW Insp"),
      T("Final Inspection"),
    ]},
  ];
}

const DEFAULT_FOLDERS = ["Surveys","Permits","Contracts","Plans","Inspections","Photos"];
const mkFolder = (name) => ({id:uid(),name,files:[],folders:[]});

function blankMeta(phases) {
  const o = {statuses:{},notes:{},budgets:{},subs:{},orders:{}};
  phases.forEach(p=>p.tasks.forEach(t=>{
    o.statuses[t.id]="Not Started"; o.notes[t.id]=""; o.budgets[t.id]={allocated:"",spent:""};
    o.subs[t.id]={subId:"",company:"",contact:"",phone:"",scheduledDate:"",completedDate:"",notes:""};
    // Auto-flag tasks that look like ordering/delivery items
    const isOrderLike=/^(order|deliver|del |sch\.? )/i.test(t.label) || /\border\b|\bdelivery\b|\bdeliver\b/i.test(t.label);
    o.orders[t.id]={isOrder:isOrderLike,leadDays:isOrderLike?"21":"",neededDate:"",orderedDate:""};
  }));
  // docs: tree of folders, each { id, name, files:[...], folders:[...] }
  o.docFolders = DEFAULT_FOLDERS.map(mkFolder);
  return o;
}

// ── Folder tree helpers (immutable updates by path of folder ids) ──────────────
function treeUpdate(folders, path, fn) {
  // path = array of folder ids leading to the target; fn(targetFolder)->newFolder
  if(path.length===0) return folders;
  const [head,...rest]=path;
  return folders.map(f=>{
    if(f.id!==head) return f;
    if(rest.length===0) return fn(f);
    return {...f, folders: treeUpdate(f.folders||[], rest, fn)};
  });
}
function treeGet(folders, path) {
  let cur=null, list=folders;
  for(const id of path){
    cur=(list||[]).find(f=>f.id===id);
    if(!cur) return null;
    list=cur.folders||[];
  }
  return cur;
}
// Flatten the tree into a list of {id, name, depth, path} for destination pickers
function flattenFolders(folders, path=[], depth=0, out=[]) {
  (folders||[]).forEach(f=>{
    const fpath=[...path,f.id];
    out.push({id:f.id,name:f.name,depth,path:fpath});
    flattenFolders(f.folders||[], fpath, depth+1, out);
  });
  return out;
}
// Is `maybeAncestorId` an ancestor of (or equal to) the folder at targetPath?
function pathContains(targetPath, id) { return targetPath.includes(id); }

function newProject(name,client,start,template) {
  const phases = template==="block" ? blockWallPhases() : pouredWallPhases();
  return { id:uid(), name:name||"New Project", client:client||"Client", start:start||TODAY, phases, totalBudget:"", todos:[], log:[], bids:[], ...blankMeta(phases) };
}

function buildSchedule(phases) {
  const r={};let d=0;
  phases.forEach(ph=>{let s=d;ph.tasks.forEach(t=>{r[t.id]={startDay:s,endDay:s+t.duration};s+=t.duration;});d=s;});
  return r;
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const P={
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  list:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  chart:"M18 20V10M12 20V4M6 20v-6",
  cal:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  dollar:"M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  folder:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  plus:"M12 5v14M5 12h14",
  edit:"M11 4H4a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  x:"M18 6L6 18M6 6l12 12",
  upload:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  file:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
  grip:"M9 5h2M9 12h2M9 19h2M13 5h2M13 12h2M13 19h2",
  check:"M20 6L9 17l-5-5",
  gear:"M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  up:"M18 15l-6-6-6 6",
  down:"M6 9l6 6 6-6",
  users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  phone:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  hard:"M3 17h18M12 3a9 9 0 019 9H3a9 9 0 019-9z M12 3v3",
  save:"M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8M7 3v5h8",
};
const Icon = ({name,size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {P[name]?.split("M").filter(Boolean).map((d,i)=><path key={i} d={"M"+d}/>)}
  </svg>
);

// ── SHARED UI ─────────────────────────────────────────────────────────────────
const S = {
  input: { width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:8,color:"#1A1A1A",padding:"8px 12px",fontSize:15,boxSizing:"border-box",outline:"none" },
  card:  { background:"#FFFFFF",border:"1px solid #EAE7E1",borderRadius:12,boxShadow:"0 1px 2px rgba(26,26,26,0.04), 0 4px 12px rgba(26,26,26,0.03)" },
};
const ACCENT = "#B5613A"; // warm brick — ties to the construction trade without being loud

function Btn({children,onClick,icon,small,danger,primary,dim,style:sx={}}) {
  const [h,setH]=useState(false);
  const base={display:"inline-flex",alignItems:"center",gap:6,padding:small?"4px 10px":"7px 14px",borderRadius:8,border:danger?"1px solid #E4B4B4":primary?"none":"1px solid #DAD6CE",cursor:"pointer",fontSize:small?11:13,fontWeight:600,transition:"all 0.13s",whiteSpace:"nowrap"};
  const colorStyle = primary
    ? {background:h?"#000":"#1A1A1A",color:"#fff",boxShadow:h?"0 2px 8px rgba(26,26,26,0.25)":"0 1px 2px rgba(26,26,26,0.15)"}
    : danger
    ? {background:h?"#FBEAEA":"#FCF4F4",color:"#C0392B"}
    : dim
    ? {background:h?"#F2F0EC":"transparent",color:"#5A5A5A"}
    : {background:h?"#EDEAE4":"#F4F2EE",color:"#3A3A3A"};
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{...base,...colorStyle,...sx}}>
      {icon&&<Icon name={icon} size={small?11:14}/>}{children}
    </button>
  );
}
function Modal({title,onClose,children,width=420}) {
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(26,26,26,0.38)",backdropFilter:"blur(3px)",WebkitBackdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:16}}>
      <div style={{background:"#FFFFFF",border:"1px solid #EAE7E1",borderRadius:16,padding:26,width,maxWidth:"95vw",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(26,26,26,0.22)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{margin:0,fontSize:18,fontWeight:800,letterSpacing:"-0.01em"}}>{title}</h3>
          <button onClick={onClose} style={{background:"#F4F2EE",border:"none",borderRadius:8,color:"#6B6B6B",cursor:"pointer",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="x" size={16}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({label,children}) {
  return <div style={{marginBottom:13}}><label style={{fontSize:13,color:"#6B6B6B",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</label>{children}</div>;
}
function Inp({value,onChange,placeholder,type="text"}) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={S.input}/>;
}
function NavItem({n,active,onClick}) {
  const [h,setH]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:"flex",alignItems:"center",gap:11,padding:"11px 13px",marginBottom:2,background:active?ACCENT:h?"#EEEBE5":"transparent",border:"none",borderRadius:10,color:active?"#fff":"#3A3A3A",cursor:"pointer",fontSize:14,fontWeight:active?700:500,textAlign:"left",width:"100%",transition:"background 0.13s, color 0.13s"}}>
      <span style={{display:"flex",opacity:active?1:0.75}}><Icon name={n.icon} size={17}/></span>
      <span style={{flex:1}}>{n.label}</span>
      {n.badge>0 && (
        <span style={{flexShrink:0,minWidth:20,height:20,padding:"0 6px",borderRadius:10,background:n.badgeColor?n.badgeColor:(active?"rgba(255,255,255,0.25)":"#1A1A1A"),color:"#fff",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {n.badge}
        </span>
      )}
    </button>
  );
}

// ── PRINT / PDF EXPORT ────────────────────────────────────────────────────────
function printReport(kind, project, opts={}) {
  const esc=s=>String(s==null?"":s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
  const today=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
  const sched=opts.sched||{};
  const subs=project.subs||{}, statuses=project.statuses||{}, orders=project.orders||{};
  const dateFromDay=(day)=>{const d=new Date(project.start+"T00:00:00");d.setDate(d.getDate()+day);return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});};
  let title="", body="";

  if(kind==="schedule"){
    title="Construction Schedule";
    project.phases.forEach(ph=>{
      body+=`<tr class="phase"><td colspan="4" style="color:${ph.color}">${esc(ph.label)}</td></tr>`;
      ph.tasks.forEach(t=>{
        const s=sched[t.id];
        const sub=subs[t.id]||{};
        body+=`<tr><td>${esc(t.label)}</td><td>${s?dateFromDay(s.startDay):"—"}</td><td>${esc(statuses[t.id]||"")}</td><td>${esc(sub.company||"")}</td></tr>`;
      });
    });
    body=`<table><thead><tr><th>Task</th><th>Start</th><th>Status</th><th>Subcontractor</th></tr></thead><tbody>${body}</tbody></table>`;
  } else if(kind==="punch"){
    title="Punch / To-Do List";
    const todos=project.todos||[];
    if(!todos.length) body="<p>No items.</p>";
    else body=`<table><thead><tr><th>✓</th><th>Item</th><th>Added</th><th>Status</th></tr></thead><tbody>`+
      todos.map(t=>`<tr><td>${t.done?"☑":"☐"}</td><td>${esc(t.text)}</td><td>${esc(t.created||"")}</td><td>${t.done?"Done":"Open"}</td></tr>`).join("")+`</tbody></table>`;
  } else if(kind==="orders"){
    title="Ordering & Lead Times";
    const items=project.phases.flatMap(ph=>ph.tasks.filter(t=>orders[t.id]?.isOrder).map(t=>({t,ph})));
    if(!items.length) body="<p>No order items flagged.</p>";
    else body=`<table><thead><tr><th>Item</th><th>Phase</th><th>Lead (days)</th><th>Ordered</th></tr></thead><tbody>`+
      items.map(({t,ph})=>{const o=orders[t.id]||{};return `<tr><td>${esc(t.label)}</td><td>${esc(ph.label)}</td><td>${esc(o.leadDays||"")}</td><td>${o.orderedDate?esc(o.orderedDate):"—"}</td></tr>`;}).join("")+`</tbody></table>`;
  } else if(kind==="subs"){
    title="Subcontractor Schedule";
    const rows=[];
    project.phases.forEach(ph=>ph.tasks.forEach(t=>{const s=subs[t.id];if(s&&(s.company||s.subId)&&opts.dirById){const info=s.subId&&opts.dirById[s.subId]?opts.dirById[s.subId]:{company:s.company,phone:s.phone};rows.push({task:t.label,company:info.company,phone:info.phone||"",date:s.scheduledDate||"",done:!!s.completedDate});}}));
    if(!rows.length) body="<p>No subcontractors assigned.</p>";
    else body=`<table><thead><tr><th>Task</th><th>Company</th><th>Phone</th><th>Scheduled</th><th>Status</th></tr></thead><tbody>`+
      rows.map(r=>`<tr><td>${esc(r.task)}</td><td>${esc(r.company)}</td><td>${esc(r.phone)}</td><td>${r.date?esc(r.date):"—"}</td><td>${r.done?"Complete":"Scheduled"}</td></tr>`).join("")+`</tbody></table>`;
  }

  const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(project.name)} — ${title}</title>
  <style>
    body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1A1A1A;margin:40px;font-size:12px}
    h1{font-size:20px;margin:0 0 2px}h2{font-size:13px;color:#6B6B6B;margin:0 0 18px;font-weight:500}
    table{width:100%;border-collapse:collapse;margin-top:8px}
    th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#9A9A9A;border-bottom:2px solid #1A1A1A;padding:6px 8px}
    td{padding:6px 8px;border-bottom:1px solid #E5E2DC}
    tr.phase td{font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-size:11px;padding-top:14px;border-bottom:1px solid #ccc}
    .head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #1A1A1A;padding-bottom:10px;margin-bottom:16px}
    .meta{text-align:right;font-size:11px;color:#6B6B6B}
    @media print{body{margin:0}}
  </style></head><body>
  <div class="head"><div><h1>${esc(project.name)}</h1><div style="font-size:12px;color:#6B6B6B">${esc(project.client||"")}</div></div>
  <div class="meta"><div style="font-weight:800;font-size:14px;color:#1A1A1A">Walden Custom Builders</div><div>${esc(title)}</div><div>Printed ${esc(today)}</div></div></div>
  ${body}
  <div style="margin-top:30px;font-size:10px;color:#B8B4AC;text-align:center">Walden Custom Builders · ${esc(project.name)} · ${esc(title)}</div>
  </body></html>`;

  const w=window.open("","_blank");
  if(!w){alert("Please allow pop-ups to print/export.");return;}
  w.document.write(html); w.document.close();
  setTimeout(()=>{w.focus();w.print();},350);
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const saved = useMemo(()=>loadSaved(),[]);
  const [projects,setProjects] = useState(()=>saved?.projects||[newProject("The Henderson Residence","Henderson Family",TODAY)]);
  const [activeId,setActiveId] = useState(()=>saved?.activeId||null);
  const [logoUrl,setLogoUrl]   = useState(()=>saved?.logoUrl||WALDEN_LOGO);
  // Logo can never be empty — always falls back to the built-in Walden logo
  const safeLogo = logoUrl || WALDEN_LOGO;
  const [directory,setDirectory] = useState(()=>saved?.directory||[]);
  const [view,setView]         = useState("today");
  const [showNew,setShowNew]   = useState(false);
  const [projOpen,setProjOpen] = useState(false);
  const [projSearch,setProjSearch] = useState("");
  const [gSearch,setGSearch] = useState("");
  const [gOpen,setGOpen] = useState(false);
  const [newForm,setNewForm]   = useState({name:"",client:"",start:TODAY,template:"poured"});
  const [saveState,setSaveState] = useState("saved");
  const [dark,setDark] = useState(()=>!!saved?.dark);
  const saveTimer = useRef(null);

  const pid = projects.find(p=>p.id===activeId)?activeId:projects[0]?.id;
  const project = projects.find(p=>p.id===pid)||projects[0];

  useEffect(()=>{
    setSaveState("saving");
    if(saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(()=>{ saveToDisk({projects,activeId:pid,logoUrl,directory,dark}); setSaveState("saved"); },700);
    return ()=>clearTimeout(saveTimer.current);
  },[projects,pid,logoUrl,directory,dark]);

  const upd = useCallback((id,fn)=>setProjects(ps=>ps.map(p=>p.id===id?(typeof fn==="function"?fn(p):{...p,...fn}):p)),[]);

  const mutate = useCallback((fn)=>upd(pid,p=>{
    const phases=fn(JSON.parse(JSON.stringify(p.phases)));
    const st={...p.statuses},no={...p.notes},bu={...p.budgets},su={...(p.subs||{})},or={...(p.orders||{})};
    phases.flatMap(ph=>ph.tasks).forEach(t=>{
      if(!(t.id in st)){st[t.id]="Not Started";no[t.id]="";bu[t.id]={allocated:"",spent:""};su[t.id]={subId:"",company:"",contact:"",phone:"",scheduledDate:"",completedDate:"",notes:""};}
      if(!(t.id in or)){const isOrderLike=/^(order|deliver|del |sch\.? )/i.test(t.label)||/\border\b|\bdelivery\b|\bdeliver\b/i.test(t.label);or[t.id]={isOrder:isOrderLike,leadDays:isOrderLike?"21":"",neededDate:"",orderedDate:""};}
    });
    return {...p,phases,statuses:st,notes:no,budgets:bu,subs:su,orders:or};
  }),[pid,upd]);

  const addPhase=(l,c)=>mutate(ph=>[...ph,{id:uid(),label:l,color:c,tasks:[]}]);
  const editPhase=(id,l,c)=>mutate(ph=>ph.map(p=>p.id===id?{...p,label:l,color:c}:p));
  const delPhase=(id)=>mutate(ph=>ph.filter(p=>p.id!==id));
  const movePhase=(id,dir)=>mutate(ph=>{const i=ph.findIndex(p=>p.id===id),j=i+dir;if(j<0||j>=ph.length)return ph;const a=[...ph];[a[i],a[j]]=[a[j],a[i]];return a;});
  const addTask=(pid2,l,dur)=>mutate(ph=>ph.map(p=>p.id===pid2?{...p,tasks:[...p.tasks,{id:uid(),label:l,duration:Number(dur)||7,deps:[]}]}:p));
  const editTask=(pid2,tid,l,dur)=>mutate(ph=>ph.map(p=>p.id===pid2?{...p,tasks:p.tasks.map(t=>t.id===tid?{...t,label:l,duration:Number(dur)||1}:t)}:p));
  const delTask=(pid2,tid)=>mutate(ph=>ph.map(p=>p.id===pid2?{...p,tasks:p.tasks.filter(t=>t.id!==tid)}:p));
  const moveTask=(pid2,tid,dir)=>mutate(ph=>ph.map(p=>{if(p.id!==pid2)return p;const a=[...p.tasks],i=a.findIndex(t=>t.id===tid),j=i+dir;if(j<0||j>=a.length)return p;[a[i],a[j]]=[a[j],a[i]];return{...p,tasks:a};}));

  const set=(field,tid,val)=>upd(pid,p=>({...p,[field]:{...p[field],[tid]:val}}));
  const setFolders=(folders)=>upd(pid,p=>({...p,docFolders:folders}));
  const setTodos=(todos)=>upd(pid,p=>({...p,todos}));
  const setOrders=(orders)=>upd(pid,p=>({...p,orders}));
  const setLog=(log)=>upd(pid,p=>({...p,log}));
  const setBids=(bids)=>upd(pid,p=>({...p,bids}));

  const addProj=()=>{const p=newProject(newForm.name,newForm.client,newForm.start,newForm.template);setProjects(ps=>[...ps,p]);setActiveId(p.id);setShowNew(false);setNewForm({name:"",client:"",start:TODAY,template:"poured"});setView("dashboard");};
  const delProj=(id)=>{const r=projects.filter(p=>p.id!==id);setProjects(r);if(pid===id)setActiveId(r[0]?.id);};

  const sched=useMemo(()=>buildSchedule(project.phases),[project.phases]);
  const totalDays=Math.max(...Object.values(sched).map(s=>s.endDay),1);
  const allTasks=project.phases.flatMap(p=>p.tasks.map(t=>({...t,phaseColor:p.color,phaseLabel:p.label,phaseId:p.id})));
  const done=allTasks.filter(t=>project.statuses[t.id]==="Complete").length;
  const inProg=allTasks.filter(t=>project.statuses[t.id]==="In Progress").length;
  const blocked=allTasks.filter(t=>project.statuses[t.id]==="Blocked").length;
  const pct=allTasks.length?Math.round(done/allTasks.length*100):0;
  const totAlloc=allTasks.reduce((s,t)=>s+num(project.budgets[t.id]?.allocated),0);
  const totSpent=allTasks.reduce((s,t)=>s+num(project.budgets[t.id]?.spent),0);

  // Badge counts for the active project
  const todoOpenCount=(project.todos||[]).filter(t=>!t.done).length;
  const orderAlertCount=useMemo(()=>{
    const orders=project.orders||{}; const subs=project.subs||{};
    const t0=new Date(); t0.setHours(0,0,0,0);
    let n=0;
    project.phases.forEach(ph=>ph.tasks.forEach(t=>{
      const o=orders[t.id];
      if(o&&o.isOrder&&!o.orderedDate&&o.leadDays){
        let need=o.neededDate;
        if(!need){ const s=subs[t.id]; if(s?.scheduledDate) need=s.scheduledDate; else { const sc=sched[t.id]; if(sc){const d=new Date(project.start+"T00:00:00");d.setDate(d.getDate()+sc.startDay);need=d.toISOString().split("T")[0];} } }
        if(need){ const ob=new Date(need+"T00:00:00"); ob.setDate(ob.getDate()-Number(o.leadDays)); if(Math.round((ob-t0)/86400000)<=7) n++; }
      }
    }));
    return n;
  },[project,sched]);

  const NAV=[
    {id:"today",icon:"home",label:"Today (All Jobs)"},
    {id:"master",icon:"cal",label:"Walden - Job Calendar"},
    {id:"analytics",icon:"chart",label:"Analytics & Insights"},
    {id:"dashboard",icon:"home",label:"Dashboard"},
    {id:"schedule",icon:"gear",label:"Edit Schedule"},
    {id:"tasks",icon:"list",label:"Tasks"},
    {id:"todo",icon:"check",label:"To-Do / Punch List",badge:todoOpenCount},
    {id:"orders",icon:"list",label:"Ordering & Lead Times",badge:orderAlertCount,badgeColor:"#EF4444"},
    {id:"log",icon:"edit",label:"Activity Log"},
    {id:"subs",icon:"users",label:"Subcontractors"},
    {id:"budget",icon:"dollar",label:"Budget"},
    {id:"bids",icon:"users",label:"Bidding"},
    {id:"docs",icon:"folder",label:"Documents"},
    {id:"gantt",icon:"chart",label:"Gantt"},
    {id:"calendar",icon:"cal",label:"This Job's Calendar"},
  ];

  const exportData=()=>{
    const blob=new Blob([JSON.stringify({projects},null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`buildtrack-${TODAY}.json`;a.click();
  };
  const importRef=useRef();
  const importData=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.projects&&window.confirm(`Import ${d.projects.length} project(s)? This replaces current data.`)){setProjects(d.projects);setActiveId(d.projects[0]?.id);}}catch{alert("Invalid file.");}};
    r.readAsText(f);e.target.value="";
  };

  // ── Global search across all jobs ──
  const gResults=useMemo(()=>{
    const q=gSearch.trim().toLowerCase();
    if(q.length<2) return [];
    const out=[];
    const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));
    projects.forEach(p=>{
      p.phases.forEach(ph=>ph.tasks.forEach(t=>{
        if(t.label.toLowerCase().includes(q)) out.push({type:"Task",projectId:p.id,projectName:p.name,label:t.label,view:"tasks"});
        const s=(p.subs||{})[t.id];
        if(s){const co=s.subId&&dirById[s.subId]?dirById[s.subId].company:s.company;if(co&&co.toLowerCase().includes(q))out.push({type:"Sub",projectId:p.id,projectName:p.name,label:`${co} — ${t.label}`,view:"subs"});}
      }));
      (p.todos||[]).forEach(td=>{if(td.text.toLowerCase().includes(q))out.push({type:"To-Do",projectId:p.id,projectName:p.name,label:td.text,view:"todo"});});
      (p.log||[]).forEach(e=>{if(e.text.toLowerCase().includes(q))out.push({type:"Log",projectId:p.id,projectName:p.name,label:e.text,view:"log"});});
      const walkDocs=(folders,prefix="")=>{(folders||[]).forEach(f=>{(f.files||[]).forEach(fl=>{if((fl.name||"").toLowerCase().includes(q)||(fl.fileName||"").toLowerCase().includes(q))out.push({type:"Doc",projectId:p.id,projectName:p.name,label:`${prefix}${f.name}/${fl.name}`,view:"docs"});});walkDocs(f.folders,prefix+f.name+"/");});};
      walkDocs(p.docFolders);
    });
    (directory||[]).forEach(d=>{if((d.company||"").toLowerCase().includes(q)||(d.contact||"").toLowerCase().includes(q))out.push({type:"Directory",projectId:null,projectName:"Sub Directory",label:`${d.company}${d.contact?" — "+d.contact:""}`,view:"subs"});});
    return out.slice(0,40);
  },[gSearch,projects,directory]);

  const gGo=(r)=>{ if(r.projectId)setActiveId(r.projectId); setView(r.view); setGOpen(false); setGSearch(""); };

  return (
    <div className={dark?"walden-dark":""} style={{height:"100vh",background:"#FFFFFF",color:"#1A1A1A",fontFamily:"'Inter',system-ui,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{`
        .walden-dark { filter: invert(0.92) hue-rotate(180deg); }
        .walden-dark img,
        .walden-dark .no-invert { filter: invert(1) hue-rotate(180deg); }
      `}</style>

      {/* TOP BAR */}
      <header style={{background:"#FFFFFF",borderBottom:"1px solid #E5E2DC",padding:"0 16px",height:60,display:"flex",alignItems:"center",gap:14,flexShrink:0,zIndex:30,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
        <div style={{height:42,display:"flex",alignItems:"center",flexShrink:0}}>
          <img src={safeLogo} alt="Walden Custom Builders" style={{height:42,objectFit:"contain"}}/>
        </div>
        <div style={{width:1,height:24,background:"#E5E2DC",flexShrink:0}}/>

        {/* PROJECT DROPDOWN SELECTOR */}
        <div style={{position:"relative",flex:1,maxWidth:380,minWidth:0}}>
          <button onClick={()=>{setProjOpen(o=>!o);setProjSearch("");}}
            style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"7px 12px",background:"#F7F6F3",border:"1px solid #D6D2CA",borderRadius:9,cursor:"pointer",textAlign:"left"}}>
            <Icon name="home" size={16}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700,color:"#1A1A1A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{project.name}</div>
              <div style={{fontSize:12,color:"#6B6B6B",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{project.client}</div>
            </div>
            <span style={{fontSize:12,color:"#9A9A9A",flexShrink:0}}>▼</span>
          </button>

          {projOpen && (
            <>
              {/* click-away backdrop */}
              <div onClick={()=>setProjOpen(false)} style={{position:"fixed",inset:0,zIndex:40}}/>
              <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:50,maxHeight:"70vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
                <div style={{padding:10,borderBottom:"1px solid #E5E2DC"}}>
                  <input autoFocus value={projSearch} onChange={e=>setProjSearch(e.target.value)} placeholder={`Search ${projects.length} projects…`}
                    style={{width:"100%",background:"#F7F6F3",border:"1px solid #D6D2CA",borderRadius:7,color:"#1A1A1A",padding:"8px 11px",fontSize:14,boxSizing:"border-box"}}/>
                </div>
                <div style={{overflowY:"auto",flex:1,padding:6}}>
                  {projects.filter(p=>(p.name+" "+p.client).toLowerCase().includes(projSearch.toLowerCase())).map(p=>{
                    const pAll=p.phases.flatMap(ph=>ph.tasks);
                    const pPct=pAll.length?Math.round(pAll.filter(t=>p.statuses[t.id]==="Complete").length/pAll.length*100):0;
                    const isActive=p.id===pid;
                    const hasBlocked=pAll.some(t=>p.statuses[t.id]==="Blocked");
                    return (
                      <button key={p.id} onClick={()=>{setActiveId(p.id);setView("dashboard");setProjOpen(false);}}
                        style={{width:"100%",display:"flex",alignItems:"center",gap:9,textAlign:"left",padding:"9px 10px",marginBottom:2,borderRadius:8,border:"none",background:isActive?"#1A1A1A":"transparent",cursor:"pointer"}}>
                        {hasBlocked&&<div style={{width:7,height:7,borderRadius:"50%",background:"#EF4444",flexShrink:0}} title="Has blocked tasks"/>}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:14,fontWeight:isActive?700:600,color:isActive?"#fff":"#1A1A1A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                          <div style={{fontSize:12,color:isActive?"#C8C4BC":"#9A9A9A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.client}</div>
                        </div>
                        <span style={{fontSize:13,fontWeight:700,color:isActive?"#fff":"#9A9A9A",flexShrink:0}}>{pPct}%</span>
                      </button>
                    );
                  })}
                  {projects.filter(p=>(p.name+" "+p.client).toLowerCase().includes(projSearch.toLowerCase())).length===0 &&
                    <div style={{padding:"16px 10px",fontSize:13,color:"#9A9A9A",textAlign:"center"}}>No matches.</div>}
                </div>
                <div style={{padding:8,borderTop:"1px solid #E5E2DC"}}>
                  <button onClick={()=>{setShowNew(true);setProjOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"9px 0",background:"#1A1A1A",border:"none",borderRadius:8,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
                    <Icon name="plus" size={13}/> New Project
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{flex:1}}/>

        {/* GLOBAL SEARCH */}
        <div style={{position:"relative",width:230,flexShrink:0}}>
          <input value={gSearch} onChange={e=>{setGSearch(e.target.value);setGOpen(true);}} onFocus={()=>setGOpen(true)}
            placeholder="Search all jobs…"
            style={{width:"100%",background:"#F7F6F3",border:"1px solid #D6D2CA",borderRadius:9,color:"#1A1A1A",padding:"8px 11px",fontSize:13,boxSizing:"border-box"}}/>
          {gOpen&&gSearch.trim().length>=2&&(
            <>
              <div onClick={()=>setGOpen(false)} style={{position:"fixed",inset:0,zIndex:40}}/>
              <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,width:340,maxWidth:"80vw",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.14)",zIndex:50,maxHeight:"70vh",overflowY:"auto",padding:6}}>
                {gResults.length===0?(
                  <div style={{padding:"14px 10px",fontSize:13,color:"#9A9A9A",textAlign:"center"}}>No matches.</div>
                ):gResults.map((r,i)=>(
                  <button key={i} onClick={()=>gGo(r)}
                    style={{display:"flex",alignItems:"center",gap:9,width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:7,border:"none",background:"transparent",cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#F7F6F3"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{fontSize:10,fontWeight:700,color:"#6B6B6B",background:"#F2F0EC",borderRadius:5,padding:"2px 7px",flexShrink:0,textTransform:"uppercase"}}>{r.type}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,color:"#1A1A1A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.label}</div>
                      <div style={{fontSize:11,color:"#9A9A9A"}}>{r.projectName}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Dark mode toggle */}
        <button onClick={()=>setDark(d=>!d)} title={dark?"Switch to light mode":"Switch to dark mode"}
          style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:20,padding:"5px 11px",cursor:"pointer",fontSize:13,fontWeight:600,color:"#3A3A3A"}}>
          <span style={{fontSize:14}}>{dark?"☀️":"🌙"}</span>{dark?"Light":"Dark"}
        </button>

        {/* Save indicator */}
        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{textAlign:"right"}}><div style={{fontSize:12,color:"#6B6B6B"}}>Progress</div><div style={{fontWeight:800,fontSize:16,color:"#1A1A1A"}}>{pct}%</div></div>
          <div style={{width:50,height:5,background:"#E5E2DC",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"#1A1A1A",transition:"width 0.4s"}}/></div>
        </div>
      </header>

      {/* BODY: nav sidebar + content */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* LEFT SIDEBAR — nav tabs */}
        <aside style={{width:210,flexShrink:0,background:"#F7F6F3",borderRight:"1px solid #E5E2DC",display:"flex",flexDirection:"column",overflow:"hidden",padding:"10px 8px"}}>
          {NAV.map((n,i)=>(
            <span key={n.id}>
              {i===0 && <div style={{fontSize:10,fontWeight:800,color:"#B0ABA1",textTransform:"uppercase",letterSpacing:"0.12em",padding:"4px 13px 7px"}}>All Jobs</div>}
              {i===3 && <div style={{fontSize:10,fontWeight:800,color:"#B0ABA1",textTransform:"uppercase",letterSpacing:"0.12em",padding:"14px 13px 7px",borderTop:"1px solid #E5E2DC",marginTop:7}}>This Job</div>}
              <NavItem n={n} active={view===n.id} onClick={()=>setView(n.id)}/>
            </span>
          ))}
          <div style={{flex:1}}/>
          <div style={{padding:"10px 13px",fontSize:11,color:"#B8B4AC",borderTop:"1px solid #E5E2DC"}}>
            {projects.length} active project{projects.length!==1?"s":""}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{flex:1,overflowY:"auto",padding:20,minWidth:0}}>
          {view==="today"     && <TodayHome projects={projects} directory={directory} setActiveId={setActiveId} setView={setView}/>}
          {view==="master"    && <MasterCalendar projects={projects} directory={directory} setActiveId={setActiveId} setView={setView}/>}
          {view==="analytics" && <Analytics projects={projects} directory={directory} setActiveId={setActiveId} setView={setView}/>}
          {view==="dashboard" && <Dashboard project={project} upd={upd} sched={sched} totalDays={totalDays} done={done} inProg={inProg} blocked={blocked} pct={pct} totAlloc={totAlloc} totSpent={totSpent} projects={projects} delProj={delProj} allTasks={allTasks} exportData={exportData} importRef={importRef} logoUrl={logoUrl} setLogoUrl={setLogoUrl} directory={directory}/>}
          {view==="schedule"  && <SchedEditor project={project} addPhase={addPhase} editPhase={editPhase} delPhase={delPhase} movePhase={movePhase} addTask={addTask} editTask={editTask} delTask={delTask} moveTask={moveTask} sched={sched}/>}
          {view==="tasks"     && <Tasks project={project} sched={sched} set={set} allTasks={allTasks}/>}
          {view==="todo"      && <TodoList project={project} setTodos={setTodos}/>}
          {view==="orders"    && <Ordering project={project} setOrders={setOrders} sched={sched} allTasks={allTasks}/>}
          {view==="log"       && <ActivityLog project={project} setLog={setLog}/>}
          {view==="subs"      && <Subs project={project} set={set} allTasks={allTasks} directory={directory} setDirectory={setDirectory} projects={projects} setActiveId={setActiveId} setView={setView}/>}
          {view==="budget"    && <Budget project={project} upd={upd} set={set} allTasks={allTasks} totAlloc={totAlloc} totSpent={totSpent}/>}
          {view==="bids"      && <Bidding project={project} setBids={setBids} set={set} directory={directory} upd={upd}/>}
          {view==="docs"      && <Docs project={project} setFolders={setFolders}/>}
          {view==="gantt"     && <GanttView project={project} sched={sched} totalDays={totalDays}/>}
          {view==="calendar"  && <CalView project={project} sched={sched}/>}
        </main>
      </div>

      <input type="file" ref={importRef} accept=".json" style={{display:"none"}} onChange={importData}/>

      {showNew&&(
        <Modal title="New Project" onClose={()=>setShowNew(false)} width={370}>
          <Field label="Project Name"><Inp value={newForm.name} onChange={e=>setNewForm(f=>({...f,name:e.target.value}))} placeholder="e.g. The Johnson Residence"/></Field>
          <Field label="Client Name"><Inp value={newForm.client} onChange={e=>setNewForm(f=>({...f,client:e.target.value}))} placeholder="e.g. Johnson Family"/></Field>
          <Field label="Start Date"><Inp type="date" value={newForm.start} onChange={e=>setNewForm(f=>({...f,start:e.target.value}))}/></Field>
          <Field label="Schedule Template">
            <div style={{display:"flex",gap:8}}>
              {[["poured","Poured Wall"],["block","Block Wall"]].map(([val,lbl])=>(
                <button key={val} onClick={()=>setNewForm(f=>({...f,template:val}))}
                  style={{flex:1,padding:"10px 8px",borderRadius:8,border:`2px solid ${newForm.template===val?"#1A1A1A":"#D6D2CA"}`,background:newForm.template===val?"#1A1A1A":"#FFFFFF",color:newForm.template===val?"#fff":"#3A3A3A",cursor:"pointer",fontSize:15,fontWeight:700}}>
                  {lbl}
                </button>
              ))}
            </div>
            <div style={{fontSize:13,color:"#9A9A9A",marginTop:6}}>
              {newForm.template==="poured"?"Poured concrete wall lifts with steel forming.":"Concrete block lifts with tie beam pours. Includes pilings & pad prep."}
            </div>
          </Field>
          <button onClick={addProj} style={{width:"100%",marginTop:8,padding:"10px 0",background:"#1A1A1A",border:"none",borderRadius:8,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer"}}>
            Create Project
          </button>
        </Modal>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({project,upd,sched,totalDays,done,inProg,blocked,pct,totAlloc,totSpent,projects,delProj,allTasks,exportData,importRef,logoUrl,setLogoUrl,directory}) {
  const [editing,setEditing]=useState(false);
  const [printOpen,setPrintOpen]=useState(false);
  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));
  const [form,setForm]=useState({name:project.name,client:project.client,start:project.start,totalBudget:project.totalBudget||""});
  const logoRef=useRef();
  const endDate=new Date(project.start+"T00:00:00");endDate.setDate(endDate.getDate()+totalDays);
  const over=project.totalBudget&&totSpent>num(project.totalBudget);
  const bpct=project.totalBudget?Math.min(100,Math.round(totSpent/num(project.totalBudget)*100)):null;
  const phProg=project.phases.map(p=>{const d=p.tasks.filter(t=>project.statuses[t.id]==="Complete").length;return{...p,d,tot:p.tasks.length,pct:p.tasks.length?Math.round(d/p.tasks.length*100):0};});
  const save=()=>{upd(project.id,{name:form.name,client:form.client,start:form.start,totalBudget:form.totalBudget});setEditing(false);};
  const handleLogo=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setLogoUrl(ev.target.result);r.readAsDataURL(f);e.target.value="";};

  return (
    <div>
      {/* Project card */}
      <div style={{...S.card,padding:"15px 18px",marginBottom:18,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
        {editing?(
          <div style={{display:"flex",flexWrap:"wrap",gap:9,flex:1}}>
            {[["Project Name","name","text"],["Client","client","text"],["Start Date","start","date"],["Total Budget ($)","totalBudget","number"]].map(([l,k,t])=>(
              <div key={k}><div style={{fontSize:12,color:"#6B6B6B",marginBottom:2,textTransform:"uppercase"}}>{l}</div>
                <input type={t} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
                  style={{background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:6,color:"#1A1A1A",padding:"5px 9px",fontSize:14}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
              <Btn primary onClick={save}>Save</Btn>
              <Btn onClick={()=>setEditing(false)}>Cancel</Btn>
            </div>
          </div>
        ):(
          <>
            <div>
              <div style={{fontSize:19,fontWeight:800}}>{project.name}</div>
              <div style={{fontSize:14,color:"#6B6B6B",marginTop:2}}>{project.client} · Starts {new Date(project.start+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
              {project.totalBudget&&<div style={{fontSize:14,color:"#1A1A1A",marginTop:2}}>Budget: {fmt$(project.totalBudget)}</div>}
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <Btn icon="edit" onClick={()=>{setForm({name:project.name,client:project.client,start:project.start,totalBudget:project.totalBudget||""});setEditing(true);}}>Edit</Btn>
              {projects.length>1&&<Btn danger icon="trash" onClick={()=>window.confirm("Delete this project?")&&delProj(project.id)}>Delete</Btn>}
              <input type="file" ref={logoRef} accept="image/*" style={{display:"none"}} onChange={handleLogo}/>
              <Btn icon="upload" onClick={()=>logoRef.current?.click()}>Change Logo</Btn>
              <Btn icon="save" onClick={exportData}>Backup</Btn>
              <Btn onClick={()=>importRef.current?.click()}>Restore</Btn>
              <div style={{position:"relative"}}>
                <Btn icon="file" onClick={()=>setPrintOpen(o=>!o)}>Print / PDF ▾</Btn>
                {printOpen&&(
                  <>
                    <div onClick={()=>setPrintOpen(false)} style={{position:"fixed",inset:0,zIndex:60}}/>
                    <div style={{position:"absolute",top:"calc(100% + 4px)",right:0,background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:9,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:70,minWidth:200,overflow:"hidden"}}>
                      {[["schedule","Full Schedule"],["subs","Subcontractor Schedule"],["punch","Punch / To-Do List"],["orders","Ordering Sheet"]].map(([k,lbl])=>(
                        <button key={k} onClick={()=>{setPrintOpen(false);printReport(k,project,{sched,dirById});}}
                          style={{display:"block",width:"100%",textAlign:"left",padding:"9px 13px",border:"none",background:"transparent",cursor:"pointer",fontSize:13,color:"#1A1A1A",borderBottom:"1px solid #F0EEE9"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#F7F6F3"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:11,marginBottom:18}}>
        {[
          {label:"Est. Completion",value:endDate.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),sub:`${totalDays} days`,color:"#1A1A1A"},
          {label:"Complete",value:done,sub:`of ${allTasks.length} tasks`,color:"#22C55E"},
          {label:"In Progress",value:inProg,sub:"active",color:"#F59E0B"},
          {label:"Blocked",value:blocked,sub:"need attention",color:"#EF4444"},
          {label:"Budget Spent",value:fmt$(totSpent),sub:`of ${fmt$(totAlloc)} alloc.`,color:over?"#EF4444":"#4A7B6F"},
        ].map(s=>(
          <div key={s.label} style={{...S.card,padding:"12px 15px",borderLeft:`3px solid ${s.color}`}}>
            <div style={{fontSize:13,color:"#6B6B6B",marginBottom:3}}>{s.label}</div>
            <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:13,color:"#9A9A9A",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {project.totalBudget&&(
        <div style={{...S.card,padding:"13px 17px",marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:14,fontWeight:600}}>Budget Overview</span>
            <span style={{fontSize:14,color:over?"#EF4444":"#6B6B6B"}}>{fmt$(totSpent)} / {fmt$(project.totalBudget)}</span>
          </div>
          <div style={{height:6,background:"#E5E2DC",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${bpct}%`,background:over?"#EF4444":"linear-gradient(90deg,#4A7B6F,#22C55E)",transition:"width 0.4s"}}/>
          </div>
          <div style={{fontSize:13,color:"#9A9A9A",marginTop:4}}>{bpct}% used</div>
        </div>
      )}

      <div style={{fontSize:13,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Phase Progress</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10}}>
        {phProg.map(p=>(
          <div key={p.id} style={{...S.card,padding:"12px 15px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:14,fontWeight:700,color:p.color}}>{p.label}</span>
              <span style={{fontSize:14,fontWeight:700}}>{p.pct}%</span>
            </div>
            <div style={{height:4,background:"#E5E2DC",borderRadius:3,overflow:"hidden",marginBottom:6}}>
              <div style={{height:"100%",width:`${p.pct}%`,background:p.color,transition:"width 0.4s"}}/>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:4}}>
              {p.tasks.map(t=><div key={t.id} style={{width:8,height:8,borderRadius:"50%",background:STATUS_COLORS[project.statuses[t.id]]}} title={t.label}/>)}
            </div>
            <div style={{fontSize:13,color:"#9A9A9A"}}>{p.d}/{p.tot} complete</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCHEDULE EDITOR ───────────────────────────────────────────────────────────
function SchedEditor({project,addPhase,editPhase,delPhase,movePhase,addTask,editTask,delTask,moveTask,sched}) {
  const [phModal,setPhModal]=useState(null);
  const [tModal,setTModal]=useState(null);
  const [phForm,setPhForm]=useState({label:"",color:PHASE_COLORS[0]});
  const [tForm,setTForm]=useState({label:"",duration:"7"});

  const openNewPh=()=>{setPhForm({label:"",color:PHASE_COLORS[project.phases.length%PHASE_COLORS.length]});setPhModal("new");};
  const openEditPh=p=>{setPhForm({label:p.label,color:p.color});setPhModal(p.id);};
  const openNewT=pid=>{setTForm({label:"",duration:"7"});setTModal({pid,mode:"new"});};
  const openEditT=(pid,t)=>{setTForm({label:t.label,duration:String(t.duration)});setTModal({pid,mode:"edit",t});};

  const savePh=()=>{if(!phForm.label.trim())return;phModal==="new"?addPhase(phForm.label.trim(),phForm.color):editPhase(phModal,phForm.label.trim(),phForm.color);setPhModal(null);};
  const saveT=()=>{if(!tForm.label.trim())return;tModal.mode==="new"?addTask(tModal.pid,tForm.label.trim(),tForm.duration):editTask(tModal.pid,tModal.t.id,tForm.label.trim(),tForm.duration);setTModal(null);};

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:700}}>Edit Schedule</h2>
        <span style={{fontSize:14,color:"#9A9A9A"}}>Add, rename, reorder or delete phases and tasks</span>
        <Btn primary icon="plus" onClick={openNewPh} sx={{marginLeft:"auto"}}>Add Phase</Btn>
      </div>

      {project.phases.length===0&&<div style={{textAlign:"center",padding:60,color:"#9A9A9A"}}>No phases yet — click Add Phase to start.</div>}

      {project.phases.map((phase,pi)=>(
        <div key={phase.id} style={{marginBottom:18}}>
          <div style={{...S.card,border:`1px solid ${phase.color}44`,overflow:"hidden"}}>
            {/* Phase header */}
            <div style={{display:"flex",alignItems:"center",gap:9,padding:"10px 14px",background:`${phase.color}18`}}>
              <div style={{width:3,height:18,background:phase.color,borderRadius:2,flexShrink:0}}/>
              <span style={{fontWeight:700,fontSize:15,color:phase.color,flex:1}}>{phase.label}</span>
              <span style={{fontSize:13,color:"#9A9A9A"}}>{phase.tasks.length} tasks · {phase.tasks.reduce((s,t)=>s+t.duration,0)}d</span>
              <button onClick={()=>movePhase(phase.id,-1)} disabled={pi===0} style={{background:"none",border:"none",color:pi===0?"#D6D2CA":"#9A9A9A",cursor:pi===0?"default":"pointer",padding:2}}><Icon name="up" size={13}/></button>
              <button onClick={()=>movePhase(phase.id,1)}  disabled={pi===project.phases.length-1} style={{background:"none",border:"none",color:pi===project.phases.length-1?"#D6D2CA":"#9A9A9A",cursor:pi===project.phases.length-1?"default":"pointer",padding:2}}><Icon name="down" size={13}/></button>
              <Btn small icon="edit" onClick={()=>openEditPh(phase)}>Edit</Btn>
              <Btn small danger icon="trash" onClick={()=>window.confirm(`Delete "${phase.label}" and all its tasks?`)&&delPhase(phase.id)}>Delete</Btn>
            </div>
            {/* Tasks */}
            {phase.tasks.map((task,ti)=>{
              const s=sched[task.id];
              return (
                <div key={task.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderTop:"1px solid #E5E2DC",background:ti%2===1?"#FFFFFF33":"transparent"}}>
                  <Icon name="grip" size={12}/>
                  <span style={{flex:1,fontSize:14,color:"#1A1A1A"}}>{task.label}</span>
                  <span style={{fontSize:13,color:"#9A9A9A",minWidth:55}}>{task.duration}d</span>
                  <span style={{fontSize:13,color:"#9A9A9A",minWidth:80,textAlign:"right"}}>Day {s?.startDay}–{s?.endDay}</span>
                  <button onClick={()=>moveTask(phase.id,task.id,-1)} disabled={ti===0} style={{background:"none",border:"none",color:ti===0?"#D6D2CA":"#9A9A9A",cursor:ti===0?"default":"pointer",padding:2}}><Icon name="up" size={12}/></button>
                  <button onClick={()=>moveTask(phase.id,task.id,1)}  disabled={ti===phase.tasks.length-1} style={{background:"none",border:"none",color:ti===phase.tasks.length-1?"#D6D2CA":"#9A9A9A",cursor:ti===phase.tasks.length-1?"default":"pointer",padding:2}}><Icon name="down" size={12}/></button>
                  <Btn small icon="edit" onClick={()=>openEditT(phase.id,task)}>Edit</Btn>
                  <Btn small danger icon="trash" onClick={()=>window.confirm(`Delete "${task.label}"?`)&&delTask(phase.id,task.id)}>Del</Btn>
                </div>
              );
            })}
            {/* Add task */}
            <div style={{padding:"8px 14px",borderTop:"1px solid #E5E2DC"}}>
              <Btn small icon="plus" onClick={()=>openNewT(phase.id)} sx={{color:phase.color,borderColor:phase.color+"55"}}>Add Task</Btn>
            </div>
          </div>
        </div>
      ))}

      {phModal!==null&&(
        <Modal title={phModal==="new"?"Add Phase":"Edit Phase"} onClose={()=>setPhModal(null)}>
          <Field label="Phase Name"><Inp value={phForm.label} onChange={e=>setPhForm(f=>({...f,label:e.target.value}))} placeholder="e.g. Landscaping"/></Field>
          <Field label="Color">
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {PHASE_COLORS.map(c=><button key={c} onClick={()=>setPhForm(f=>({...f,color:c}))} style={{width:26,height:26,borderRadius:6,background:c,border:`3px solid ${phForm.color===c?"#fff":"transparent"}`,cursor:"pointer"}}/>)}
            </div>
          </Field>
          <div style={{display:"flex",gap:7,marginTop:4}}>
            <Btn primary onClick={savePh}>{phModal==="new"?"Add Phase":"Save"}</Btn>
            <Btn onClick={()=>setPhModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {tModal&&(
        <Modal title={tModal.mode==="new"?"Add Task":"Edit Task"} onClose={()=>setTModal(null)}>
          <Field label="Task Name"><Inp value={tForm.label} onChange={e=>setTForm(f=>({...f,label:e.target.value}))} placeholder="e.g. Install Windows"/></Field>
          <Field label="Duration (days)"><Inp type="number" value={tForm.duration} onChange={e=>setTForm(f=>({...f,duration:e.target.value}))} placeholder="7"/></Field>
          <div style={{fontSize:13,color:"#9A9A9A",marginBottom:12}}>Tasks run sequentially within a phase.</div>
          <div style={{display:"flex",gap:7}}>
            <Btn primary onClick={saveT}>{tModal.mode==="new"?"Add Task":"Save"}</Btn>
            <Btn onClick={()=>setTModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
function Tasks({project,sched,set,allTasks}) {
  const [open,setOpen]=useState(null);
  const [filter,setFilter]=useState("All");
  const subs=project.subs||{};

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:15,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:700}}>Task Tracker</h2>
        <div style={{display:"flex",gap:4,marginLeft:"auto",flexWrap:"wrap"}}>
          {["All",...STATUS_OPTIONS].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${filter===s?(STATUS_COLORS[s]||"#1A1A1A"):"#E5E2DC"}`,background:filter===s?(STATUS_COLORS[s]||"#1A1A1A")+"22":"transparent",color:filter===s?(STATUS_COLORS[s]||"#1A1A1A"):"#6B6B6B",cursor:"pointer",fontSize:13}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {allTasks.length===0&&<div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:15}}>No tasks yet — go to <b>Edit Schedule</b> to add some.</div>}

      {project.phases.map(phase=>{
        const vis=filter==="All"?phase.tasks:phase.tasks.filter(t=>project.statuses[t.id]===filter);
        if(!vis.length)return null;
        return (
          <div key={phase.id} style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{width:3,height:14,background:phase.color,borderRadius:2}}/>
              <span style={{fontSize:13,fontWeight:700,color:phase.color,textTransform:"uppercase",letterSpacing:"0.08em"}}>{phase.label}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {vis.map(task=>{
                const s=sched[task.id],isOpen=open===task.id,sc=STATUS_COLORS[project.statuses[task.id]];
                const sub=subs[task.id]||{};
                const sd=s?new Date(project.start+"T00:00:00"):null;
                if(sd)sd.setDate(sd.getDate()+(s?.startDay||0));
                const ed=s?new Date(project.start+"T00:00:00"):null;
                if(ed)ed.setDate(ed.getDate()+(s?.endDay||0));
                return (
                  <div key={task.id} style={{...S.card,border:`1px solid ${isOpen?phase.color+"55":"#E5E2DC"}`,overflow:"hidden"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",cursor:"pointer"}} onClick={()=>setOpen(isOpen?null:task.id)}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:sc,flexShrink:0}}/>
                      <span style={{flex:1,fontSize:14,fontWeight:600}}>{task.label}</span>
                      {sub.company&&<span style={{fontSize:13,color:"#4A7B6F",background:"#4A7B6F22",borderRadius:4,padding:"1px 6px"}}>{sub.company}</span>}
                      {sub.scheduledDate&&!sub.completedDate&&<span style={{fontSize:13,color:"#1A1A1A"}}>{new Date(sub.scheduledDate+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
                      {sub.completedDate&&<span style={{fontSize:13,color:"#22C55E",display:"flex",alignItems:"center",gap:3}}><Icon name="check" size={10}/>Done</span>}
                      <select value={project.statuses[task.id]} onChange={e=>{e.stopPropagation();set("statuses",task.id,e.target.value);}} onClick={e=>e.stopPropagation()}
                        style={{background:sc+"22",border:`1px solid ${sc}`,borderRadius:5,color:sc,padding:"2px 5px",fontSize:13,cursor:"pointer"}}>
                        {STATUS_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                      <span style={{color:"#9A9A9A",fontSize:13}}>{isOpen?"▲":"▼"}</span>
                    </div>
                    {isOpen&&(
                      <div style={{padding:"0 12px 12px",borderTop:"1px solid #E5E2DC"}}>
                        {/* Subcontractor section */}
                        <div style={{background:"#FFFFFF",borderRadius:8,padding:"10px 12px",marginTop:10,border:"1px solid #E5E2DC"}}>
                          <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,display:"flex",alignItems:"center",gap:4}}>
                            <Icon name="hard" size={10}/> Subcontractor
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                            {[["company","Company","text","e.g. Advanced Plumbing"],["contact","Contact","text","e.g. Mike Johnson"],["phone","Phone","tel","(555) 000-0000"],["scheduledDate","Scheduled Date","date",""]].map(([k,l,t,ph])=>(
                              <div key={k}>
                                <div style={{fontSize:12,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>{l}</div>
                                <input type={t} value={sub[k]||""} placeholder={ph}
                                  onChange={e=>{const v=e.target.value;set("subs",task.id,{...sub,[k]:v});if(k==="scheduledDate"&&v&&project.statuses[task.id]==="Not Started")set("statuses",task.id,"In Progress");}}
                                  style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                              </div>
                            ))}
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:7}}>
                            <div>
                              <div style={{fontSize:12,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Date Completed</div>
                              <input type="date" value={sub.completedDate||""}
                                onChange={e=>{set("subs",task.id,{...sub,completedDate:e.target.value});if(e.target.value)set("statuses",task.id,"Complete");}}
                                style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                            </div>
                            <div>
                              <div style={{fontSize:12,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Sub Notes</div>
                              <input value={sub.notes||""} placeholder="License #, access info..." onChange={e=>set("subs",task.id,{...sub,notes:e.target.value})}
                                style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                            </div>
                          </div>
                          {!sub.completedDate&&sub.company&&(
                            <button onClick={()=>{set("subs",task.id,{...sub,completedDate:TODAY});set("statuses",task.id,"Complete");}}
                              style={{marginTop:8,padding:"5px 12px",background:"#22C55E22",border:"1px solid #22C55E",borderRadius:6,color:"#22C55E",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                              <Icon name="check" size={12}/> Mark Complete Today
                            </button>
                          )}
                        </div>
                        {/* Notes & budget */}
                        <div style={{marginTop:8}}>
                          <div style={{fontSize:12,color:"#6B6B6B",marginBottom:3,textTransform:"uppercase"}}>Notes</div>
                          <textarea value={project.notes[task.id]||""} onChange={e=>set("notes",task.id,e.target.value)} placeholder="Notes, decisions..." rows={2}
                            style={{width:"100%",background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:5,color:"#1A1A1A",padding:"5px 8px",fontSize:13,resize:"vertical",boxSizing:"border-box"}}/>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:7}}>
                          {["allocated","spent"].map(k=>(
                            <div key={k}>
                              <div style={{fontSize:12,color:"#6B6B6B",marginBottom:2,textTransform:"uppercase"}}>{k==="allocated"?"Allocated ($)":"Spent ($)"}</div>
                              <input type="number" value={project.budgets[task.id]?.[k]||""} placeholder="0"
                                onChange={e=>set("budgets",task.id,{...project.budgets[task.id],[k]:e.target.value})}
                                style={{width:"100%",background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── SUBCONTRACTORS ────────────────────────────────────────────────────────────
const TRADES = ["Plumbing","Electrical","HVAC","Grading","Clearing","Framing","Concrete","Roofing","Drywall","Stucco","Paint","Cabinets","Trim","Flooring","Tile","Septic","Well","Pool","Landscape","Irrigation","Survey","Inspection","Gas","Low Voltage","Garage Door","Gutters","Pavers","Other"];

function Subs({project,set,allTasks,directory,setDirectory,projects,setActiveId,setView}) {
  const [tab,setTab]=useState("assign"); // "assign" | "directory" | "workload"
  const [filter,setFilter]=useState("all");
  const [editSub,setEditSub]=useState(null); // directory entry being added/edited
  const [assignFor,setAssignFor]=useState(null); // task id we're assigning a sub to
  const todayD=new Date();todayD.setHours(0,0,0,0);
  const subs=project.subs||{};

  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));

  const fmtD=d=>d?new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}):"—";
  const until=d=>{
    if(!d)return null;
    const diff=Math.round((new Date(d+"T00:00:00")-todayD)/86400000);
    if(diff<0)return{label:`${Math.abs(diff)}d overdue`,color:"#EF4444"};
    if(diff===0)return{label:"Today",color:"#F59E0B"};
    if(diff===1)return{label:"Tomorrow",color:"#F59E0B"};
    if(diff<=7)return{label:`In ${diff} days`,color:"#1A1A1A"};
    return{label:`In ${diff} days`,color:"#9A9A9A"};
  };
  // Resolve a task's assigned company info from directory (subId) or legacy fields
  const subInfo=(s)=>{
    if(s.subId&&dirById[s.subId]) return dirById[s.subId];
    if(s.company) return {company:s.company,contact:s.contact,phone:s.phone};
    return null;
  };

  // ── DIRECTORY TAB ──
  const saveSub=()=>{
    if(!editSub.company.trim())return;
    if(editSub.id){ setDirectory(directory.map(d=>d.id===editSub.id?editSub:d)); }
    else { setDirectory([...(directory||[]),{...editSub,id:uid()}]); }
    setEditSub(null);
  };
  const delSub=(id)=>{ if(window.confirm("Remove this subcontractor from your directory?")) setDirectory(directory.filter(d=>d.id!==id)); };

  // group directory by trade
  const byTrade={};
  (directory||[]).forEach(d=>{ const t=d.trade||"Other"; (byTrade[t]=byTrade[t]||[]).push(d); });
  const tradeOrder=Object.keys(byTrade).sort();

  // ── ASSIGN TAB data ──
  const tagged=allTasks.map(t=>({...t,sub:subs[t.id]||{},status:project.statuses[t.id]}));
  const filt=tagged.filter(t=>{
    const info=subInfo(t.sub);
    if(filter==="upcoming")  return t.sub.scheduledDate&&!t.sub.completedDate;
    if(filter==="completed") return !!t.sub.completedDate;
    if(filter==="unassigned")return !info;
    return true;
  }).sort((a,b)=>{
    if(a.sub.completedDate&&!b.sub.completedDate)return 1;
    if(!a.sub.completedDate&&b.sub.completedDate)return -1;
    if(a.sub.scheduledDate&&b.sub.scheduledDate)return new Date(a.sub.scheduledDate)-new Date(b.sub.scheduledDate);
    if(a.sub.scheduledDate)return -1;if(b.sub.scheduledDate)return 1;return 0;
  });
  const upcoming=tagged.filter(t=>t.sub.scheduledDate&&!t.sub.completedDate).length;
  const comp=tagged.filter(t=>t.sub.completedDate).length;
  const unassigned=tagged.filter(t=>!subInfo(t.sub)).length;

  const assignSub=(taskId,subId)=>{ const s=subs[taskId]||{}; set("subs",taskId,{...s,subId}); setAssignFor(null); };

  return (
    <div>
      {/* Header + tab toggle */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:700}}>Subcontractors</h2>
        <div style={{display:"flex",gap:0,border:"1px solid #D6D2CA",borderRadius:8,overflow:"hidden"}}>
          {[["assign","Assignments"],["directory","Directory"],["workload","Workload"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{padding:"6px 14px",border:"none",background:tab===id?"#1A1A1A":"#FFFFFF",color:tab===id?"#fff":"#6B6B6B",cursor:"pointer",fontSize:14,fontWeight:700}}>{lbl}</button>
          ))}
        </div>
        {tab==="directory"&&<Btn primary icon="plus" onClick={()=>setEditSub({company:"",trade:"Plumbing",contact:"",phone:"",email:"",notes:""})} style={{marginLeft:"auto"}}>Add Subcontractor</Btn>}
      </div>

      {/* ===================== DIRECTORY TAB ===================== */}
      {tab==="directory"&&(
        <div>
          {(directory||[]).length===0&&(
            <div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:15}}>
              No subcontractors yet. Click <b>Add Subcontractor</b> to build your master list — e.g. your three plumbers, your grading companies, etc.
            </div>
          )}
          {tradeOrder.map(trade=>(
            <div key={trade} style={{marginBottom:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#1A1A1A",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>{trade} <span style={{color:"#9A9A9A"}}>({byTrade[trade].length})</span></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
                {byTrade[trade].map(d=>(
                  <div key={d.id} style={{...S.card,padding:"13px 15px"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                      <Icon name="hard" size={15}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:15,fontWeight:700}}>{d.company}</div>
                        {d.contact&&<div style={{fontSize:13,color:"#6B6B6B",marginTop:1}}>{d.contact}</div>}
                        {d.phone&&<div style={{fontSize:13,color:"#4A7B6F",marginTop:3}}><a href={`tel:${d.phone}`} style={{color:"#4A7B6F",textDecoration:"none"}}>{d.phone}</a></div>}
                        {d.email&&<div style={{fontSize:13,color:"#9A9A9A",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.email}</div>}
                        {d.notes&&<div style={{fontSize:13,color:"#9A9A9A",marginTop:4,fontStyle:"italic"}}>{d.notes}</div>}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:10,marginTop:10}}>
                      <button onClick={()=>setEditSub(d)} style={{fontSize:13,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",padding:0}}>Edit</button>
                      <button onClick={()=>delSub(d.id)} style={{fontSize:13,color:"#DC2626",background:"none",border:"none",cursor:"pointer",padding:0}}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================== ASSIGNMENTS TAB ===================== */}
      {tab==="assign"&&(
        <div>
          <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
            {[["all","All",null],["upcoming","Upcoming","#F59E0B"],["completed","Completed","#22C55E"],["unassigned","Unassigned","#6B6B6B"]].map(([id,lbl,c])=>(
              <button key={id} onClick={()=>setFilter(id)}
                style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${filter===id?(c||"#1A1A1A"):"#E5E2DC"}`,background:filter===id?(c||"#1A1A1A")+"22":"transparent",color:filter===id?(c||"#1A1A1A"):"#6B6B6B",cursor:"pointer",fontSize:13}}>{lbl}</button>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:18}}>
            {[{label:"Upcoming",value:upcoming,color:"#F59E0B"},{label:"Completed",value:comp,color:"#22C55E"},{label:"Unassigned",value:unassigned,color:"#6B6B6B"},{label:"Total Tasks",value:allTasks.length,color:"#1A1A1A"}].map(s=>(
              <div key={s.label} style={{...S.card,padding:"11px 14px",borderLeft:`3px solid ${s.color}`}}>
                <div style={{fontSize:13,color:"#6B6B6B",marginBottom:2}}>{s.label}</div>
                <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div>
              </div>
            ))}
          </div>

          {filt.length===0&&<div style={{textAlign:"center",padding:40,color:"#9A9A9A",fontSize:14}}>No tasks match this filter.</div>}

          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {filt.map(t=>{
              const sub=t.sub,isComp=!!sub.completedDate;
              const info=subInfo(sub);
              const u=until(sub.scheduledDate);
              const overdue=sub.scheduledDate&&!isComp&&new Date(sub.scheduledDate+"T00:00:00")<todayD;
              return (
                <div key={t.id} style={{...S.card,border:`1px solid ${isComp?"#22C55E33":overdue?"#EF444444":sub.scheduledDate?"#1A1A1A33":"#E5E2DC"}`,overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,padding:"11px 14px",flexWrap:"wrap"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:STATUS_COLORS[t.status],flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:600}}>{t.label}</div>
                      <div style={{fontSize:13,color:t.phaseColor,marginTop:1}}>{t.phaseLabel}</div>
                    </div>
                    {info?(
                      <div style={{display:"flex",alignItems:"center",gap:6,background:"#FFFFFF",borderRadius:7,padding:"5px 9px",border:"1px solid #D6D2CA"}}>
                        <Icon name="hard" size={11}/>
                        <div>
                          <div style={{fontSize:13,fontWeight:700}}>{info.company}</div>
                          {info.contact&&<div style={{fontSize:12,color:"#6B6B6B"}}>{info.contact}</div>}
                        </div>
                        {info.phone&&<a href={`tel:${info.phone}`} style={{color:"#4A7B6F",marginLeft:3}} title={info.phone}><Icon name="phone" size={12}/></a>}
                        <button onClick={()=>setAssignFor(t.id)} style={{fontSize:12,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",marginLeft:4}}>change</button>
                      </div>
                    ):(
                      <button onClick={()=>setAssignFor(t.id)} style={{fontSize:13,fontWeight:600,color:"#1A1A1A",background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:7,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                        <Icon name="plus" size={11}/> Assign Sub
                      </button>
                    )}
                    {isComp?(
                      <div style={{display:"flex",alignItems:"center",gap:4,background:"#22C55E22",border:"1px solid #22C55E",borderRadius:20,padding:"3px 9px",fontSize:13,fontWeight:700,color:"#22C55E"}}>
                        <Icon name="check" size={10}/> Done {fmtD(sub.completedDate)}
                      </div>
                    ):sub.scheduledDate?(
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:13,fontWeight:600}}>{fmtD(sub.scheduledDate)}</div>
                        {u&&<div style={{fontSize:13,fontWeight:700,color:overdue?"#EF4444":u.color}}>{overdue?`Overdue`:u.label}</div>}
                      </div>
                    ):null}
                  </div>
                  <div style={{padding:"0 14px 12px",borderTop:"1px solid #E5E2DC"}}>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:7,marginTop:10}}>
                      <div>
                        <div style={{fontSize:12,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Scheduled Date</div>
                        <input type="date" value={sub.scheduledDate||""}
                          onChange={e=>{const v=e.target.value;set("subs",t.id,{...sub,scheduledDate:v});if(v&&project.statuses[t.id]==="Not Started")set("statuses",t.id,"In Progress");}}
                          style={{width:"100%",background:"#FFFFFF",border:`1px solid ${overdue?"#EF4444":"#D6D2CA"}`,borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                      </div>
                      <div>
                        <div style={{fontSize:12,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Date Completed</div>
                        <input type="date" value={sub.completedDate||""}
                          onChange={e=>{const v=e.target.value;set("subs",t.id,{...sub,completedDate:v});if(v)set("statuses",t.id,"Complete");}}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                      </div>
                      <div>
                        <div style={{fontSize:12,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Job Notes</div>
                        <input value={sub.notes||""} placeholder="Scope, access, reminders..." onChange={e=>set("subs",t.id,{...sub,notes:e.target.value})}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:13,boxSizing:"border-box"}}/>
                      </div>
                    </div>
                    {!isComp&&info&&(
                      <button onClick={()=>{set("subs",t.id,{...sub,completedDate:TODAY});set("statuses",t.id,"Complete");}}
                        style={{marginTop:9,padding:"5px 12px",background:"#22C55E22",border:"1px solid #22C55E",borderRadius:6,color:"#22C55E",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                        <Icon name="check" size={12}/> Mark Complete Today
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== WORKLOAD TAB ===================== */}
      {tab==="workload"&&(
        <SubWorkload projects={projects||[]} directory={directory} setActiveId={setActiveId} setView={setView}/>
      )}

      {/* ADD/EDIT SUB MODAL */}
      {editSub&&(
        <Modal title={editSub.id?"Edit Subcontractor":"Add Subcontractor"} onClose={()=>setEditSub(null)}>
          <Field label="Company Name"><Inp value={editSub.company} onChange={e=>setEditSub(s=>({...s,company:e.target.value}))} placeholder="e.g. Advanced Plumbing"/></Field>
          <Field label="Trade">
            <select value={editSub.trade} onChange={e=>setEditSub(s=>({...s,trade:e.target.value}))} style={{...S.input}}>
              {TRADES.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Contact Person"><Inp value={editSub.contact} onChange={e=>setEditSub(s=>({...s,contact:e.target.value}))} placeholder="e.g. Mike Johnson"/></Field>
          <Field label="Phone"><Inp type="tel" value={editSub.phone} onChange={e=>setEditSub(s=>({...s,phone:e.target.value}))} placeholder="(555) 000-0000"/></Field>
          <Field label="Email"><Inp value={editSub.email} onChange={e=>setEditSub(s=>({...s,email:e.target.value}))} placeholder="office@company.com"/></Field>
          <Field label="Notes"><Inp value={editSub.notes} onChange={e=>setEditSub(s=>({...s,notes:e.target.value}))} placeholder="License #, pricing, preferred, etc."/></Field>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <Btn primary onClick={saveSub}>{editSub.id?"Save Changes":"Add to Directory"}</Btn>
            <Btn onClick={()=>setEditSub(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {/* ASSIGN PICKER MODAL */}
      {assignFor&&(
        <Modal title="Assign Subcontractor" onClose={()=>setAssignFor(null)}>
          <div style={{fontSize:13,color:"#6B6B6B",marginBottom:12}}>
            Pick from your directory for: <b style={{color:"#1A1A1A"}}>{allTasks.find(t=>t.id===assignFor)?.label}</b>
          </div>
          {(directory||[]).length===0?(
            <div style={{fontSize:14,color:"#9A9A9A",padding:"10px 0"}}>Your directory is empty. Switch to the <b>Directory</b> tab and add subcontractors first.</div>
          ):(
            <div style={{maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
              {tradeOrder.map(trade=>(
                <div key={trade}>
                  <div style={{fontSize:12,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.07em",margin:"6px 0 3px"}}>{trade}</div>
                  {byTrade[trade].map(d=>(
                    <button key={d.id} onClick={()=>assignSub(assignFor,d.id)}
                      style={{display:"flex",alignItems:"center",gap:8,width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:7,border:"1px solid #E5E2DC",background:"#FFFFFF",cursor:"pointer",marginBottom:4}}>
                      <Icon name="hard" size={13}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:700}}>{d.company}</div>
                        {(d.contact||d.phone)&&<div style={{fontSize:13,color:"#6B6B6B"}}>{[d.contact,d.phone].filter(Boolean).join(" · ")}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
          {subs[assignFor]?.subId&&(
            <button onClick={()=>{const s=subs[assignFor];set("subs",assignFor,{...s,subId:""});setAssignFor(null);}}
              style={{marginTop:12,fontSize:13,color:"#DC2626",background:"none",border:"none",cursor:"pointer",padding:0}}>Clear assignment</button>
          )}
        </Modal>
      )}
    </div>
  );
}

// ── SUB WORKLOAD (across all jobs) ────────────────────────────────────────────
function SubWorkload({projects,directory,setActiveId,setView}) {
  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));
  const today=new Date(); today.setHours(0,0,0,0);
  const in14=new Date(today); in14.setDate(in14.getDate()+14);

  // Gather all assignments that resolve to a directory sub, with dates
  const bySub={}; // subId -> { name, items:[{projectId,projectName,task,date,done}] }
  projects.forEach(p=>{
    const subs=p.subs||{};
    p.phases.forEach(ph=>ph.tasks.forEach(t=>{
      const s=subs[t.id];
      if(!s)return;
      const id=s.subId&&dirById[s.subId]?s.subId:(s.company?("legacy:"+s.company):null);
      if(!id)return;
      const name=s.subId&&dirById[s.subId]?dirById[s.subId].company:s.company;
      (bySub[id]=bySub[id]||{name,items:[]}).items.push({
        projectId:p.id,projectName:p.name,task:t.label,date:s.scheduledDate||"",done:!!s.completedDate
      });
    }));
  });

  const rows=Object.entries(bySub).map(([id,v])=>{
    const upcoming=v.items.filter(i=>i.date&&!i.done&&new Date(i.date+"T00:00:00")>=today);
    const next2wk=upcoming.filter(i=>new Date(i.date+"T00:00:00")<=in14);
    // detect same-day double-bookings
    const dayCount={};
    upcoming.forEach(i=>{dayCount[i.date]=(dayCount[i.date]||0)+1;});
    const clashes=Object.entries(dayCount).filter(([,n])=>n>1).map(([d])=>d);
    return {id,name:v.name,items:v.items,upcoming,next2wk,clashes};
  }).sort((a,b)=>b.next2wk.length-a.next2wk.length || a.name.localeCompare(b.name));

  const fmtD=d=>d?new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—";

  if(rows.length===0) return (
    <div style={{...S.card,padding:30,textAlign:"center",color:"#9A9A9A",fontSize:14}}>
      No subs scheduled yet. Once you assign subs with dates across your jobs, this shows who's booked when — so you don't double-book the same crew.
    </div>
  );

  return (
    <div>
      <p style={{margin:"0 0 16px",fontSize:13,color:"#6B6B6B"}}>Who's booked across all your jobs. Red means the same sub is scheduled on two jobs the same day.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {rows.map(r=>(
          <div key={r.id} style={{...S.card,padding:"13px 15px",border:r.clashes.length?"1px solid #EF444466":"1px solid #E5E2DC"}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:r.upcoming.length?10:0,flexWrap:"wrap"}}>
              <Icon name="hard" size={15}/>
              <span style={{fontSize:15,fontWeight:700}}>{r.name}</span>
              <span style={{fontSize:12,color:"#9A9A9A"}}>{r.next2wk.length} in next 2 wks · {r.upcoming.length} upcoming</span>
              {r.clashes.length>0 && <span style={{fontSize:12,fontWeight:700,color:"#EF4444",background:"#EF444418",borderRadius:20,padding:"2px 10px"}}>⚠ Double-booked {r.clashes.map(fmtD).join(", ")}</span>}
            </div>
            {r.upcoming.length>0 && (
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {r.upcoming.slice(0,12).map((i,idx)=>{
                  const clash=r.clashes.includes(i.date);
                  return (
                    <button key={idx} onClick={()=>{setActiveId(i.projectId);setView("subs");}}
                      style={{textAlign:"left",background:clash?"#EF444418":"#F7F6F3",border:`1px solid ${clash?"#EF4444":"#E5E2DC"}`,borderRadius:7,padding:"6px 10px",cursor:"pointer"}}>
                      <div style={{fontSize:12,fontWeight:700,color:clash?"#EF4444":"#1A1A1A"}}>{fmtD(i.date)}</div>
                      <div style={{fontSize:12,color:"#3A3A3A"}}>{i.projectName}</div>
                      <div style={{fontSize:11,color:"#9A9A9A"}}>{i.task}</div>
                    </button>
                  );
                })}
                {r.upcoming.length>12&&<div style={{fontSize:12,color:"#9A9A9A",alignSelf:"center"}}>+{r.upcoming.length-12} more</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TO-DO / PUNCH LIST ────────────────────────────────────────────────────────
function TodoList({project,setTodos}) {
  const todos = project.todos || [];
  const [text,setText]=useState("");
  const [filter,setFilter]=useState("open"); // open | done | all
  const [editing,setEditing]=useState(null);
  const [editVal,setEditVal]=useState("");
  const [viewPhoto,setViewPhoto]=useState(null);
  const photoRefs=useRef({});

  const add=()=>{
    if(!text.trim())return;
    const item={id:uid(),text:text.trim(),done:false,created:new Date().toLocaleDateString(),completedDate:null,photos:[]};
    setTodos([item,...todos]);
    setText("");
  };
  const toggle=(id)=>setTodos(todos.map(t=>t.id===id?{...t,done:!t.done,completedDate:!t.done?new Date().toLocaleDateString():null}:t));
  const del=(id)=>setTodos(todos.filter(t=>t.id!==id));
  const saveEdit=(id)=>{ if(editVal.trim()) setTodos(todos.map(t=>t.id===id?{...t,text:editVal.trim()}:t)); setEditing(null); };
  const clearDone=()=>{ if(window.confirm("Remove all completed items?")) setTodos(todos.filter(t=>!t.done)); };
  const addPhoto=(id,e)=>{
    const f=e.target.files[0]; e.target.value="";
    if(!f)return;
    if(f.size>4*1024*1024){alert("Photo is over 4 MB. Try a smaller photo (this limit goes away in the team/cloud version).");return;}
    const r=new FileReader();
    r.onload=ev=>setTodos(todos.map(t=>t.id===id?{...t,photos:[...(t.photos||[]),{id:uid(),data:ev.target.result}]}:t));
    r.readAsDataURL(f);
  };
  const delPhoto=(tid,pid)=>setTodos(todos.map(t=>t.id===tid?{...t,photos:(t.photos||[]).filter(p=>p.id!==pid)}:t));

  const openCount=todos.filter(t=>!t.done).length;
  const doneCount=todos.filter(t=>t.done).length;
  const visible = filter==="open"?todos.filter(t=>!t.done) : filter==="done"?todos.filter(t=>t.done) : todos;

  return (
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800}}>To-Do / Punch List</h2>
        <span style={{fontSize:13,color:"#9A9A9A"}}>{project.name}</span>
      </div>
      <p style={{margin:"0 0 16px",fontSize:13,color:"#6B6B6B"}}>Add items as you walk the house. Tap the circle to mark complete.</p>

      {/* Add box */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
          placeholder="Add a to-do item… (e.g. Touch up paint in master bath)"
          style={{flex:1,background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:8,color:"#1A1A1A",padding:"11px 14px",fontSize:15,boxSizing:"border-box"}}/>
        <button onClick={add} style={{background:"#1A1A1A",border:"none",borderRadius:8,color:"#fff",padding:"0 20px",cursor:"pointer",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
          <Icon name="plus" size={15}/> Add
        </button>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:6,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
        {[["open",`Open (${openCount})`],["done",`Done (${doneCount})`],["all",`All (${todos.length})`]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setFilter(id)}
            style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${filter===id?"#1A1A1A":"#D6D2CA"}`,background:filter===id?"#1A1A1A":"transparent",color:filter===id?"#fff":"#6B6B6B",cursor:"pointer",fontSize:13,fontWeight:600}}>
            {lbl}
          </button>
        ))}
        {doneCount>0 && <button onClick={clearDone} style={{marginLeft:"auto",fontSize:12,color:"#DC2626",background:"none",border:"none",cursor:"pointer"}}>Clear completed</button>}
      </div>

      {/* List */}
      {visible.length===0 ? (
        <div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:14}}>
          {filter==="done"?"No completed items yet.":filter==="open"?"Nothing on the list — you're all caught up!":"No items yet. Add one above."}
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {visible.map(t=>(
            <div key={t.id} style={{...S.card,padding:"12px 15px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {/* Checkbox */}
                <button onClick={()=>toggle(t.id)} style={{flexShrink:0,width:24,height:24,borderRadius:"50%",border:`2px solid ${t.done?"#22C55E":"#C8C4BC"}`,background:t.done?"#22C55E":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                  {t.done && <Icon name="check" size={14}/>}
                </button>
                {/* Text */}
                {editing===t.id ? (
                  <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveEdit(t.id)} onBlur={()=>saveEdit(t.id)}
                    style={{flex:1,background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:6,padding:"6px 9px",fontSize:15,boxSizing:"border-box"}}/>
                ) : (
                  <div style={{flex:1,minWidth:0}} onDoubleClick={()=>{setEditing(t.id);setEditVal(t.text);}}>
                    <div style={{fontSize:15,color:t.done?"#9A9A9A":"#1A1A1A",textDecoration:t.done?"line-through":"none",lineHeight:1.3}}>{t.text}</div>
                    <div style={{fontSize:11,color:"#B8B4AC",marginTop:2}}>
                      Added {t.created}{t.done&&t.completedDate?` · Done ${t.completedDate}`:""}{(t.photos||[]).length?` · ${t.photos.length} photo${t.photos.length!==1?"s":""}`:""}
                    </div>
                  </div>
                )}
                {/* Actions */}
                {editing!==t.id && (
                  <div style={{display:"flex",gap:8,flexShrink:0,alignItems:"center"}}>
                    <input type="file" accept="image/*" capture="environment" style={{display:"none"}} ref={el=>photoRefs.current[t.id]=el} onChange={e=>addPhoto(t.id,e)}/>
                    <button onClick={()=>photoRefs.current[t.id]?.click()} style={{background:"none",border:"none",color:"#4A7B6F",cursor:"pointer",padding:2}} title="Add photo"><Icon name="upload" size={15}/></button>
                    <button onClick={()=>{setEditing(t.id);setEditVal(t.text);}} style={{background:"none",border:"none",color:"#9A9A9A",cursor:"pointer",padding:2}} title="Edit"><Icon name="edit" size={15}/></button>
                    <button onClick={()=>del(t.id)} style={{background:"none",border:"none",color:"#DC2626",cursor:"pointer",padding:2}} title="Delete"><Icon name="trash" size={15}/></button>
                  </div>
                )}
              </div>
              {/* Photo thumbnails */}
              {(t.photos||[]).length>0 && (
                <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:10,paddingLeft:36}}>
                  {t.photos.map(ph=>(
                    <div key={ph.id} style={{position:"relative"}}>
                      <img src={ph.data} alt="" onClick={()=>setViewPhoto(ph.data)}
                        style={{width:64,height:64,objectFit:"cover",borderRadius:7,border:"1px solid #E5E2DC",cursor:"pointer"}}/>
                      <button onClick={()=>delPhoto(t.id,ph.id)}
                        style={{position:"absolute",top:-6,right:-6,background:"#1A1A1A",border:"2px solid #fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><Icon name="x" size={9}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Photo lightbox */}
      {viewPhoto&&(
        <div onClick={()=>setViewPhoto(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,cursor:"pointer"}}>
          <img src={viewPhoto} alt="" style={{maxWidth:"92vw",maxHeight:"92vh",borderRadius:10}}/>
        </div>
      )}
    </div>
  );
}

// ── ORDERING & LEAD TIMES ─────────────────────────────────────────────────────
function Ordering({project,setOrders,sched,allTasks}) {
  const orders=project.orders||{};
  const [filter,setFilter]=useState("orders"); // orders | all
  const today=new Date(); today.setHours(0,0,0,0);

  // The scheduled date a task is needed (from sub scheduledDate, else from the built schedule)
  const neededFor=(t)=>{
    const o=orders[t.id]||{};
    if(o.neededDate) return o.neededDate;
    const sub=(project.subs||{})[t.id];
    if(sub?.scheduledDate) return sub.scheduledDate;
    // fall back to the computed schedule start day
    const s=sched[t.id];
    if(s){ const d=new Date(project.start+"T00:00:00"); d.setDate(d.getDate()+s.startDay); return d.toISOString().split("T")[0]; }
    return "";
  };
  // The date you should order by = neededDate - leadDays
  const orderByDate=(t)=>{
    const o=orders[t.id]||{};
    const need=neededFor(t);
    if(!need||!o.leadDays) return null;
    const d=new Date(need+"T00:00:00"); d.setDate(d.getDate()-Number(o.leadDays));
    return d;
  };
  const daysUntil=(d)=> d? Math.round((d-today)/86400000) : null;

  const setOne=(tid,patch)=>setOrders({...orders,[tid]:{...(orders[tid]||{}),...patch}});

  // Build the list
  const items=allTasks.map(t=>{
    const o=orders[t.id]||{};
    const need=neededFor(t);
    const oby=orderByDate(t);
    const du=daysUntil(oby);
    return {...t,o,need,oby,du,ordered:!!o.orderedDate};
  });

  const orderItems=items.filter(i=>i.o.isOrder);
  const shown=(filter==="orders"?orderItems:items)
    .sort((a,b)=>{
      if(a.ordered!==b.ordered) return a.ordered?1:-1;
      if(a.oby&&b.oby) return a.oby-b.oby;
      if(a.oby) return -1; if(b.oby) return 1; return 0;
    });

  const fmtD=d=>d?new Date(typeof d==="string"?d+"T00:00:00":d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—";

  // Status of an order line
  const lineStatus=(i)=>{
    if(i.ordered) return {label:"Ordered",color:"#22C55E"};
    if(i.du===null) return {label:"Set a date",color:"#9A9A9A"};
    if(i.du<0) return {label:`Order ${Math.abs(i.du)}d ago!`,color:"#EF4444"};
    if(i.du===0) return {label:"Order TODAY",color:"#EF4444"};
    if(i.du<=7) return {label:`Order in ${i.du}d`,color:"#F59E0B"};
    return {label:`Order in ${i.du}d`,color:"#6B6B6B"};
  };

  const needNow=orderItems.filter(i=>!i.ordered&&i.du!==null&&i.du<=7).length;
  const ordered=orderItems.filter(i=>i.ordered).length;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800}}>Ordering & Lead Times</h2>
        <span style={{fontSize:13,color:"#9A9A9A"}}>{project.name}</span>
      </div>
      <p style={{margin:"0 0 16px",fontSize:13,color:"#6B6B6B"}}>
        Set a lead time for each material order. The app counts back from when you need it and warns you when it's time to order — so trusses, windows, cabinets and tile never hold up the job.
      </p>

      {/* Summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:18}}>
        {[
          {label:"Order Items",value:orderItems.length,color:"#1A1A1A"},
          {label:"Order Now / Soon",value:needNow,color:needNow>0?"#EF4444":"#22C55E"},
          {label:"Already Ordered",value:ordered,color:"#22C55E"},
        ].map(s=>(
          <div key={s.label} style={{...S.card,padding:"13px 16px",borderLeft:`3px solid ${s.color}`}}>
            <div style={{fontSize:12,color:"#6B6B6B",marginBottom:3}}>{s.label}</div>
            <div style={{fontSize:24,fontWeight:800,color:s.color}}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[["orders",`Order Items (${orderItems.length})`],["all",`All Tasks (${items.length})`]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setFilter(id)}
            style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${filter===id?"#1A1A1A":"#D6D2CA"}`,background:filter===id?"#1A1A1A":"transparent",color:filter===id?"#fff":"#6B6B6B",cursor:"pointer",fontSize:13,fontWeight:600}}>{lbl}</button>
        ))}
      </div>

      {shown.length===0 && (
        <div style={{...S.card,padding:30,textAlign:"center",color:"#9A9A9A",fontSize:14}}>
          {filter==="orders"?"No order items flagged yet. Switch to All Tasks and toggle any task as an order item.":"No tasks."}
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {shown.map(i=>{
          const st=lineStatus(i);
          return (
            <div key={i.id} style={{...S.card,border:`1px solid ${i.ordered?"#22C55E33":i.du!==null&&i.du<=7&&!i.ordered?st.color+"55":"#E5E2DC"}`,padding:"12px 15px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                {/* Order toggle */}
                <button onClick={()=>setOne(i.id,{isOrder:!i.o.isOrder,leadDays:i.o.leadDays||"21"})}
                  title="Mark as an order item"
                  style={{flexShrink:0,width:22,height:22,borderRadius:6,border:`2px solid ${i.o.isOrder?"#1A1A1A":"#C8C4BC"}`,background:i.o.isOrder?"#1A1A1A":"transparent",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                  {i.o.isOrder&&<Icon name="check" size={13}/>}
                </button>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:700}}>{i.label}</div>
                  <div style={{fontSize:12,color:i.phaseColor,marginTop:1}}>{i.phaseLabel}</div>
                </div>
                {i.o.isOrder && (
                  <div style={{display:"flex",alignItems:"center",gap:5,background:st.color+"18",border:`1px solid ${st.color}`,borderRadius:20,padding:"4px 11px",flexShrink:0}}>
                    <span style={{fontSize:12,fontWeight:700,color:st.color}}>{st.label}</span>
                  </div>
                )}
              </div>

              {i.o.isOrder && (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:9,marginTop:11,paddingTop:11,borderTop:"1px solid #E5E2DC"}}>
                  <div>
                    <div style={{fontSize:11,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Lead Time (days)</div>
                    <input type="number" value={i.o.leadDays||""} placeholder="21" onChange={e=>setOne(i.id,{leadDays:e.target.value})}
                      style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"5px 8px",fontSize:13,boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Needed By {!i.o.neededDate&&"(auto)"}</div>
                    <input type="date" value={i.need||""} onChange={e=>setOne(i.id,{neededDate:e.target.value})}
                      style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"5px 8px",fontSize:13,boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Order By</div>
                    <div style={{padding:"6px 8px",fontSize:13,fontWeight:700,color:i.oby?st.color:"#9A9A9A"}}>{i.oby?fmtD(i.oby):"—"}</div>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Ordered Date</div>
                    <input type="date" value={i.o.orderedDate||""} onChange={e=>setOne(i.id,{orderedDate:e.target.value})}
                      style={{width:"100%",background:"#FFFFFF",border:`1px solid ${i.ordered?"#22C55E":"#D6D2CA"}`,borderRadius:5,color:"#1A1A1A",padding:"5px 8px",fontSize:13,boxSizing:"border-box"}}/>
                  </div>
                </div>
              )}
              {i.o.isOrder && !i.ordered && (
                <button onClick={()=>setOne(i.id,{orderedDate:new Date().toISOString().split("T")[0]})}
                  style={{marginTop:9,padding:"5px 12px",background:"#22C55E22",border:"1px solid #22C55E",borderRadius:6,color:"#22C55E",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                  <Icon name="check" size={12}/> Mark Ordered Today
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ACTIVITY LOG ──────────────────────────────────────────────────────────────
function ActivityLog({project,setLog}) {
  const log=project.log||[];
  const [text,setText]=useState("");
  const [date,setDate]=useState(()=>new Date().toISOString().split("T")[0]);
  const [cat,setCat]=useState("Note");
  const [editing,setEditing]=useState(null);
  const [editVal,setEditVal]=useState("");

  const CATS=[["Note","#6B6B6B"],["Inspection","#2B4C7E"],["Delivery","#C17A3A"],["Issue","#EF4444"],["Milestone","#22C55E"],["Client","#6B3FA0"]];
  const catColor=(c)=>(CATS.find(x=>x[0]===c)||CATS[0])[1];

  const add=()=>{
    if(!text.trim())return;
    const entry={id:uid(),date,cat,text:text.trim(),created:Date.now()};
    setLog([entry,...log]);
    setText("");
  };
  const del=(id)=>{ if(window.confirm("Delete this log entry?")) setLog(log.filter(e=>e.id!==id)); };
  const saveEdit=(id)=>{ if(editVal.trim()) setLog(log.map(e=>e.id===id?{...e,text:editVal.trim()}:e)); setEditing(null); };

  // Sort newest first by date then created
  const sorted=[...log].sort((a,b)=>(b.date+"").localeCompare(a.date+"")||b.created-a.created);
  // Group by date
  const groups={};
  sorted.forEach(e=>{(groups[e.date]=groups[e.date]||[]).push(e);});
  const dates=Object.keys(groups).sort((a,b)=>b.localeCompare(a));
  const fmtDate=d=>new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

  return (
    <div style={{maxWidth:820,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800}}>Activity Log</h2>
        <span style={{fontSize:13,color:"#9A9A9A"}}>{project.name}</span>
      </div>
      <p style={{margin:"0 0 16px",fontSize:13,color:"#6B6B6B"}}>A running journal of what happened on this job — inspections, deliveries, issues, client decisions. Scroll back anytime to see the full history.</p>

      {/* Add entry */}
      <div style={{...S.card,padding:"13px 15px",marginBottom:20}}>
        <div style={{display:"flex",gap:8,marginBottom:9,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:11,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Date</div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)}
              style={{background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:6,color:"#1A1A1A",padding:"7px 9px",fontSize:14,boxSizing:"border-box"}}/>
          </div>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontSize:11,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Category</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {CATS.map(([c,col])=>(
                <button key={c} onClick={()=>setCat(c)}
                  style={{padding:"6px 11px",borderRadius:7,border:`1px solid ${cat===c?col:"#D6D2CA"}`,background:cat===c?col:"transparent",color:cat===c?"#fff":"#6B6B6B",cursor:"pointer",fontSize:12,fontWeight:600}}>{c}</button>
              ))}
            </div>
          </div>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="What happened? (e.g. Poured slab, passed inspection. Inspector noted rebar spacing OK.)" rows={2}
          onKeyDown={e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))add();}}
          style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:8,color:"#1A1A1A",padding:"9px 12px",fontSize:14,resize:"vertical",boxSizing:"border-box"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:9}}>
          <span style={{fontSize:11,color:"#B8B4AC"}}>Tip: Ctrl/Cmd + Enter to add</span>
          <button onClick={add} style={{background:"#1A1A1A",border:"none",borderRadius:8,color:"#fff",padding:"8px 18px",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
            <Icon name="plus" size={14}/> Add Entry
          </button>
        </div>
      </div>

      {/* Timeline */}
      {log.length===0 ? (
        <div style={{textAlign:"center",padding:40,color:"#9A9A9A",fontSize:14}}>No entries yet. Add the first note about this job above.</div>
      ) : (
        dates.map(d=>(
          <div key={d} style={{marginBottom:22}}>
            <div style={{fontSize:13,fontWeight:800,color:"#1A1A1A",marginBottom:10,position:"sticky",top:0}}>{fmtDate(d)}</div>
            <div style={{borderLeft:"2px solid #E5E2DC",paddingLeft:16,display:"flex",flexDirection:"column",gap:10}}>
              {groups[d].map(e=>(
                <div key={e.id} style={{position:"relative"}}>
                  <div style={{position:"absolute",left:-23,top:4,width:10,height:10,borderRadius:"50%",background:catColor(e.cat),border:"2px solid #FFFFFF"}}/>
                  <div style={{...S.card,padding:"10px 13px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:700,color:catColor(e.cat),background:catColor(e.cat)+"18",borderRadius:5,padding:"2px 8px",textTransform:"uppercase",letterSpacing:"0.05em"}}>{e.cat}</span>
                      <div style={{flex:1}}/>
                      {editing!==e.id && (
                        <>
                          <button onClick={()=>{setEditing(e.id);setEditVal(e.text);}} style={{background:"none",border:"none",color:"#B8B4AC",cursor:"pointer",padding:2}} title="Edit"><Icon name="edit" size={13}/></button>
                          <button onClick={()=>del(e.id)} style={{background:"none",border:"none",color:"#DC2626",cursor:"pointer",padding:2}} title="Delete"><Icon name="trash" size={13}/></button>
                        </>
                      )}
                    </div>
                    {editing===e.id ? (
                      <div>
                        <textarea autoFocus value={editVal} onChange={ev=>setEditVal(ev.target.value)} rows={2}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:6,padding:"6px 9px",fontSize:14,resize:"vertical",boxSizing:"border-box"}}/>
                        <div style={{display:"flex",gap:6,marginTop:6}}>
                          <Btn primary small onClick={()=>saveEdit(e.id)}>Save</Btn>
                          <Btn small onClick={()=>setEditing(null)}>Cancel</Btn>
                        </div>
                      </div>
                    ) : (
                      <div style={{fontSize:14,color:"#1A1A1A",lineHeight:1.4,whiteSpace:"pre-wrap"}}>{e.text}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ── BIDDING ───────────────────────────────────────────────────────────────────
function Bidding({project,setBids,set,directory,upd}) {
  const bids=project.bids||[];
  const [creating,setCreating]=useState(false);
  const [form,setForm]=useState({phaseId:"",dueDate:"",notes:"",invites:[]});
  const [openBid,setOpenBid]=useState(null);
  const [emailModal,setEmailModal]=useState(null); // {kind:"invite"|"reminder", bid, sub}
  const today=new Date(); today.setHours(0,0,0,0);

  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));
  // suggest subs by matching trade to phase label keywords
  const TRADE_HINTS={Framing:["Framing","Carpentry"],Plumbing:["Plumbing"],Electrical:["Electrical"],HVAC:["HVAC"],Roofing:["Roofing"],Drywall:["Drywall"],Stucco:["Stucco"],Paint:["Paint"],Tile:["Tile","Flooring"],Concrete:["Concrete"],Foundation:["Concrete"],Landscape:["Landscape","Irrigation"],Septic:["Septic"],Pool:["Pool"]};

  const fmtD=d=>d?new Date(d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—";
  const daysLeft=d=>d?Math.round((new Date(d+"T00:00:00")-today)/86400000):null;

  // ── create a bid package ──
  const startCreate=()=>{ setForm({phaseId:project.phases[0]?.id||"",dueDate:"",notes:"",invites:[]}); setCreating(true); };
  const toggleInvite=(subId)=>setForm(f=>({...f,invites:f.invites.includes(subId)?f.invites.filter(x=>x!==subId):[...f.invites,subId]}));
  const saveBid=()=>{
    if(!form.phaseId||form.invites.length===0)return;
    const ph=project.phases.find(p=>p.id===form.phaseId);
    const nb={id:uid(),phaseId:form.phaseId,phaseLabel:ph?.label||"Phase",dueDate:form.dueDate,notes:form.notes,sentDate:null,
      invites:form.invites.map(subId=>({subId,status:"pending",amount:"",respondedDate:null})),awardedSubId:null};
    setBids([nb,...bids]); setCreating(false); setOpenBid(nb.id);
  };
  const delBid=(id)=>{ if(window.confirm("Delete this bid package?")) setBids(bids.filter(b=>b.id!==id)); };
  const updBid=(id,patch)=>setBids(bids.map(b=>b.id===id?{...b,...patch}:b));
  const updInvite=(bid,subId,patch)=>setBids(bids.map(b=>b.id===bid.id?{...b,invites:b.invites.map(iv=>iv.subId===subId?{...iv,...patch}:iv)}:b));

  // award a bid → push amount into the phase budget (spread across phase tasks' allocated, or store on first task)
  const award=(bid,subId)=>{
    const iv=bid.invites.find(i=>i.subId===subId);
    if(!iv||!iv.amount){alert("Enter this sub's bid amount first.");return;}
    updBid(bid.id,{awardedSubId:subId});
    // distribute the awarded amount to the phase's tasks (put full amount on first task's allocated, clear others) — keeps it simple & visible
    const ph=project.phases.find(p=>p.id===bid.phaseId);
    if(ph&&ph.tasks.length){
      const first=ph.tasks[0];
      const b=project.budgets[first.id]||{};
      set("budgets",first.id,{...b,allocated:String(iv.amount)});
    }
    alert(`Awarded to ${dirById[subId]?.company||"sub"}. ${ph?`The bid amount was added to "${ph.label}" budget (on "${ph.tasks[0]?.label}").`:""}`);
  };

  // ── email drafts ──
  const inviteEmail=(bid,sub)=>{
    const subj=`Bid Request — ${project.name} — ${bid.phaseLabel}`;
    const body=`Hi ${sub.contact||sub.company||""},

We'd like to invite ${sub.company} to bid on the following scope for ${project.name}${project.client?` (${project.client})`:""}:

SCOPE: ${bid.phaseLabel}
${(project.phases.find(p=>p.id===bid.phaseId)?.tasks||[]).slice(0,40).map(t=>"  • "+t.label).join("\n")}

${bid.notes?`NOTES: ${bid.notes}\n\n`:""}Please return your bid by ${fmtD(bid.dueDate)}.

Plans are available on request. Reply to this email with your number and any questions.

Thank you,
Walden Custom Builders`;
    return {subj,body,to:sub.email||""};
  };
  const reminderEmail=(bid,sub)=>{
    const dl=daysLeft(bid.dueDate);
    const subj=`Reminder — Bid Due ${fmtD(bid.dueDate)} — ${project.name} — ${bid.phaseLabel}`;
    const body=`Hi ${sub.contact||sub.company||""},

A friendly reminder that we're still waiting on your bid for ${bid.phaseLabel} at ${project.name}.

The deadline is ${fmtD(bid.dueDate)}${dl!=null?(dl<0?` (now ${Math.abs(dl)} day(s) past)`:dl===0?" (today)":` (${dl} day(s) away)`):""}.

If you're still planning to bid, please send it over. If not, just let us know so we can plan accordingly.

Thank you,
Walden Custom Builders`;
    return {subj,body,to:sub.email||""};
  };
  const openMail=({to,subj,body})=>{
    const url=`mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    window.location.href=url;
  };

  const phaseSubs=(directory||[]); // all subs available to invite

  return (
    <div style={{maxWidth:920}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,letterSpacing:"-0.01em"}}>Bidding</h2>
        <span style={{fontSize:13,color:"#9A9A9A"}}>{project.name}</span>
        <Btn primary icon="plus" onClick={startCreate} style={{marginLeft:"auto"}}>New Bid Package</Btn>
      </div>
      <p style={{margin:"0 0 18px",fontSize:13,color:"#6B6B6B"}}>Bid a phase out to selected subs, track responses against a deadline, compare bids, and award the winner straight into your budget. Email drafts open in your mail app — ready to send.</p>

      {bids.length===0 && !creating && (
        <div style={{...S.card,padding:30,textAlign:"center",color:"#9A9A9A",fontSize:14}}>
          No bid packages yet. Click <b>New Bid Package</b> to bid a phase out to your subs.
        </div>
      )}

      {/* Bid package list */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {bids.map(bid=>{
          const dl=daysLeft(bid.dueDate);
          const responded=bid.invites.filter(i=>i.status==="responded"||i.amount).length;
          const overdue=bid.dueDate&&dl<0&&responded<bid.invites.length&&!bid.awardedSubId;
          const isOpen=openBid===bid.id;
          const awardedSub=bid.awardedSubId?dirById[bid.awardedSubId]:null;
          return (
            <div key={bid.id} style={{...S.card,overflow:"hidden",borderLeft:`3px solid ${bid.awardedSubId?"#22C55E":overdue?"#EF4444":ACCENT}`}}>
              {/* header */}
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"13px 16px",cursor:"pointer",flexWrap:"wrap"}} onClick={()=>setOpenBid(isOpen?null:bid.id)}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:700}}>{bid.phaseLabel}</div>
                  <div style={{fontSize:12,color:"#6B6B6B",marginTop:1}}>{bid.invites.length} sub{bid.invites.length!==1?"s":""} invited · {responded} responded · due {fmtD(bid.dueDate)}</div>
                </div>
                {bid.awardedSubId
                  ? <span style={{fontSize:12,fontWeight:700,color:"#22C55E",background:"#22C55E18",borderRadius:20,padding:"3px 11px"}}>Awarded · {awardedSub?.company||"sub"}</span>
                  : overdue
                  ? <span style={{fontSize:12,fontWeight:700,color:"#EF4444",background:"#EF444418",borderRadius:20,padding:"3px 11px"}}>{Math.abs(dl)}d overdue</span>
                  : dl!=null
                  ? <span style={{fontSize:12,fontWeight:700,color:dl<=3?"#C17A3A":"#6B6B6B",background:"#F2F0EC",borderRadius:20,padding:"3px 11px"}}>{dl<0?"closed":dl===0?"due today":`${dl}d left`}</span>
                  : null}
                <span style={{color:"#9A9A9A",fontSize:13}}>{isOpen?"▲":"▼"}</span>
              </div>

              {isOpen && (
                <div style={{padding:"0 16px 16px",borderTop:"1px solid #EEEBE5"}}>
                  {bid.notes && <div style={{fontSize:13,color:"#6B6B6B",margin:"10px 0",fontStyle:"italic"}}>{bid.notes}</div>}

                  {/* invited subs table */}
                  <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                    {bid.invites.map(iv=>{
                      const sub=dirById[iv.subId];
                      if(!sub) return null;
                      const isAwarded=bid.awardedSubId===iv.subId;
                      return (
                        <div key={iv.subId} style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",background:isAwarded?"#22C55E10":"#FAF9F6",border:`1px solid ${isAwarded?"#22C55E":"#EEEBE5"}`,borderRadius:9,padding:"9px 12px"}}>
                          <div style={{flex:1,minWidth:120}}>
                            <div style={{fontSize:13,fontWeight:700}}>{sub.company}</div>
                            <div style={{fontSize:11,color:"#9A9A9A"}}>{sub.trade}{sub.contact?` · ${sub.contact}`:""}</div>
                          </div>
                          {/* bid amount */}
                          <div style={{position:"relative"}}>
                            <span style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",color:"#9A9A9A",fontSize:13}}>$</span>
                            <input type="number" placeholder="bid amt" value={iv.amount||""} onClick={e=>e.stopPropagation()}
                              onChange={e=>updInvite(bid,iv.subId,{amount:e.target.value,status:e.target.value?"responded":"pending",respondedDate:e.target.value&&!iv.respondedDate?new Date().toISOString().split("T")[0]:iv.respondedDate})}
                              style={{width:110,background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:6,padding:"5px 8px 5px 18px",fontSize:13,boxSizing:"border-box"}}/>
                          </div>
                          {/* email buttons */}
                          <button onClick={()=>openMail(inviteEmail(bid,sub))} title="Email bid request"
                            style={{display:"flex",alignItems:"center",gap:4,background:"#F4F2EE",border:"1px solid #DAD6CE",borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:12,fontWeight:600,color:"#3A3A3A"}}>
                            <Icon name="upload" size={12}/> Request
                          </button>
                          {!iv.amount && (
                            <button onClick={()=>openMail(reminderEmail(bid,sub))} title="Send reminder"
                              style={{display:"flex",alignItems:"center",gap:4,background:overdue||dl<=3?"#C17A3A":"#F4F2EE",border:`1px solid ${overdue||dl<=3?"#C17A3A":"#DAD6CE"}`,borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:12,fontWeight:600,color:overdue||dl<=3?"#fff":"#3A3A3A"}}>
                              <Icon name="phone" size={12}/> Remind
                            </button>
                          )}
                          {/* award */}
                          {bid.awardedSubId
                            ? (isAwarded
                                ? <span style={{fontSize:12,fontWeight:700,color:"#22C55E",display:"flex",alignItems:"center",gap:3}}><Icon name="check" size={12}/>Awarded</span>
                                : <span style={{fontSize:12,color:"#C8C4BC"}}>—</span>)
                            : <button onClick={()=>award(bid,iv.subId)}
                                style={{background:"#1A1A1A",border:"none",borderRadius:7,padding:"5px 11px",cursor:"pointer",fontSize:12,fontWeight:700,color:"#fff"}}>Award</button>
                          }
                        </div>
                      );
                    })}
                  </div>

                  {/* lowest-bid hint */}
                  {(()=>{
                    const withAmt=bid.invites.filter(i=>num(i.amount)>0);
                    if(withAmt.length<2) return null;
                    const low=withAmt.reduce((m,i)=>num(i.amount)<num(m.amount)?i:m);
                    const lowSub=dirById[low.subId];
                    return <div style={{fontSize:12,color:"#6B6B6B",marginTop:10}}>Lowest bid: <b style={{color:"#22C55E"}}>{fmt$(low.amount)}</b> from {lowSub?.company}. {withAmt.length} of {bid.invites.length} responded.</div>;
                  })()}

                  <div style={{display:"flex",gap:8,marginTop:14}}>
                    <Btn small danger icon="trash" onClick={()=>delBid(bid.id)}>Delete Package</Btn>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {creating && (
        <Modal title="New Bid Package" onClose={()=>setCreating(false)} width={460}>
          <Field label="Phase to Bid">
            <select value={form.phaseId} onChange={e=>setForm(f=>({...f,phaseId:e.target.value}))} style={{...S.input}}>
              {project.phases.map(ph=><option key={ph.id} value={ph.id}>{ph.label} ({ph.tasks.length} tasks)</option>)}
            </select>
          </Field>
          <Field label="Bid Due Date"><Inp type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/></Field>
          <Field label="Notes for Subs (optional)"><Inp value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Plans link, site access, special requirements…"/></Field>
          <Field label={`Invite Subcontractors (${form.invites.length} selected)`}>
            {(directory||[]).length===0
              ? <div style={{fontSize:13,color:"#9A9A9A"}}>Your directory is empty — add subs first (Subcontractors → Directory).</div>
              : <div style={{maxHeight:240,overflowY:"auto",border:"1px solid #EEEBE5",borderRadius:9,padding:6}}>
                  {phaseSubs.map(d=>{
                    const sel=form.invites.includes(d.id);
                    return (
                      <button key={d.id} onClick={()=>toggleInvite(d.id)}
                        style={{display:"flex",alignItems:"center",gap:9,width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:7,border:"none",background:sel?ACCENT+"15":"transparent",cursor:"pointer",marginBottom:3}}>
                        <span style={{flexShrink:0,width:18,height:18,borderRadius:5,border:`2px solid ${sel?ACCENT:"#C8C4BC"}`,background:sel?ACCENT:"transparent",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<Icon name="check" size={11}/>}</span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:600}}>{d.company}</div>
                          <div style={{fontSize:11,color:"#9A9A9A"}}>{d.trade}{d.email?` · ${d.email}`:" · no email on file"}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
            }
          </Field>
          <div style={{display:"flex",gap:8,marginTop:6}}>
            <Btn primary onClick={saveBid}>Create &amp; Track</Btn>
            <Btn onClick={()=>setCreating(false)}>Cancel</Btn>
          </div>
          <div style={{fontSize:11,color:"#9A9A9A",marginTop:10}}>After creating, you'll send each request from the package (opens in your email app). Reminders are one click for anyone who hasn't responded.</div>
        </Modal>
      )}
    </div>
  );
}

// ── BUDGET ────────────────────────────────────────────────────────────────────
function Budget({project,upd,set,allTasks,totAlloc,totSpent}) {
  const over=project.totalBudget&&totSpent>num(project.totalBudget);
  return (
    <div>
      <h2 style={{margin:"0 0 16px",fontSize:20,fontWeight:700}}>Budget Tracker</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:11,marginBottom:18}}>
        {[{label:"Total Budget",value:fmt$(project.totalBudget),color:"#1A1A1A"},{label:"Allocated",value:fmt$(totAlloc),color:over?"#EF4444":"#4A7B6F"},{label:"Spent",value:fmt$(totSpent),color:"#F59E0B"},{label:"Remaining",value:project.totalBudget?fmt$(num(project.totalBudget)-totSpent):"—",color:num(project.totalBudget)-totSpent<0?"#EF4444":"#22C55E"}].map(s=>(
          <div key={s.label} style={{...S.card,padding:"12px 14px",borderLeft:`3px solid ${s.color}`}}>
            <div style={{fontSize:13,color:"#6B6B6B",marginBottom:2}}>{s.label}</div>
            <div style={{fontSize:21,fontWeight:800,color:s.color}}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{...S.card,padding:"13px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:14,fontWeight:600,whiteSpace:"nowrap"}}>Project Total Budget</span>
        <div style={{position:"relative",flex:1,maxWidth:230}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#9A9A9A",fontSize:14}}>$</span>
          <input type="number" value={project.totalBudget||""} onChange={e=>upd(project.id,{totalBudget:e.target.value})} placeholder="Enter total budget"
            style={{width:"100%",background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:6,color:"#1A1A1A",padding:"6px 9px 6px 20px",fontSize:14,boxSizing:"border-box"}}/>
        </div>
      </div>

      {project.phases.map(phase=>{
        const pA=phase.tasks.reduce((s,t)=>s+num(project.budgets[t.id]?.allocated),0);
        const pS=phase.tasks.reduce((s,t)=>s+num(project.budgets[t.id]?.spent),0);
        if(!phase.tasks.length)return null;
        return (
          <div key={phase.id} style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:3,height:14,background:phase.color,borderRadius:2}}/>
                <span style={{fontSize:13,fontWeight:700,color:phase.color,textTransform:"uppercase",letterSpacing:"0.08em"}}>{phase.label}</span>
              </div>
              <span style={{fontSize:13,color:"#6B6B6B"}}>Alloc: <b style={{color:"#1A1A1A"}}>{fmt$(pA)}</b> · Spent: <b style={{color:"#F59E0B"}}>{fmt$(pS)}</b></span>
            </div>
            <div style={{...S.card,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 120px 120px 85px",padding:"6px 13px",borderBottom:"1px solid #E5E2DC",gap:8}}>
                {["Task","Allocated","Spent","Variance"].map(h=><div key={h} style={{fontSize:12,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase"}}>{h}</div>)}
              </div>
              {phase.tasks.map((task,ti)=>{
                const b=project.budgets[task.id]||{};
                const al=num(b.allocated),sp=num(b.spent),va=al-sp,ov=sp>al&&al>0;
                return (
                  <div key={task.id} style={{display:"grid",gridTemplateColumns:"1fr 120px 120px 85px",padding:"7px 13px",borderBottom:"1px solid #E5E2DC08",gap:8,alignItems:"center",background:ti%2===1?"#FFFFFF33":"transparent"}}>
                    <div style={{fontSize:13,display:"flex",alignItems:"center",gap:5}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:STATUS_COLORS[project.statuses[task.id]],flexShrink:0}}/>
                      {task.label}
                    </div>
                    {["allocated","spent"].map(k=>(
                      <div key={k} style={{position:"relative"}}>
                        <span style={{position:"absolute",left:6,top:"50%",transform:"translateY(-50%)",color:"#9A9A9A",fontSize:13,pointerEvents:"none"}}>$</span>
                        <input type="number" value={b[k]||""} placeholder="0" onChange={e=>set("budgets",task.id,{...b,[k]:e.target.value})}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:5,color:"#1A1A1A",padding:"3px 6px 3px 17px",fontSize:13,boxSizing:"border-box"}}/>
                      </div>
                    ))}
                    <div style={{fontSize:13,fontWeight:600,color:al===0?"#9A9A9A":ov?"#EF4444":"#22C55E"}}>{al===0?"—":(ov?"-":"+")+fmt$(Math.abs(va))}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── DOCUMENTS ─────────────────────────────────────────────────────────────────
function Docs({project,setFolders}) {
  // Seed default folders for older projects
  useEffect(()=>{ if(!project.docFolders){ setFolders(DEFAULT_FOLDERS.map(mkFolder)); } },[]);
  const root = project.docFolders || [];

  // path = array of folder ids; [] means root level
  const [path,setPath]=useState([]);
  const [newName,setNewName]=useState("");
  const [renaming,setRenaming]=useState(null);
  const [renameVal,setRenameVal]=useState("");
  const [moving,setMoving]=useState(null); // {kind:"file"|"folder", id, name}
  const fRef=useRef();

  // Current folder & its contents
  const current = path.length? treeGet(root,path) : null;
  const folders = current? (current.folders||[]) : root;
  const files = current? (current.files||[]) : [];

  // Breadcrumb labels
  const crumbs=[]; { let list=root; for(const id of path){ const f=(list||[]).find(x=>x.id===id); if(!f)break; crumbs.push(f); list=f.folders||[]; } }

  // count helper (recursive)
  const countAll=(f)=>{ let n=(f.files||[]).length; (f.folders||[]).forEach(c=>n+=countAll(c)); return n; };

  // ── mutations ──
  const writeRoot=(newRoot)=>setFolders(newRoot);
  const writeInCurrent=(mutateFolderArrayOrFiles)=>{
    if(path.length===0){ writeRoot(mutateFolderArrayOrFiles(root)); }
    else { writeRoot(treeUpdate(root,path,(f)=>mutateFolderArrayOrFiles(f))); }
  };

  const addFolder=()=>{
    if(!newName.trim())return;
    const nf=mkFolder(newName.trim());
    if(path.length===0) writeRoot([...root,nf]);
    else writeRoot(treeUpdate(root,path,f=>({...f,folders:[...(f.folders||[]),nf]})));
    setNewName("");
  };
  const delFolder=(fid)=>{
    if(!window.confirm("Delete this folder and everything inside it?"))return;
    if(path.length===0) writeRoot(root.filter(f=>f.id!==fid));
    else writeRoot(treeUpdate(root,path,f=>({...f,folders:(f.folders||[]).filter(c=>c.id!==fid)})));
  };
  const renameFolder=(fid)=>{
    if(!renameVal.trim()){setRenaming(null);return;}
    if(path.length===0) writeRoot(root.map(f=>f.id===fid?{...f,name:renameVal.trim()}:f));
    else writeRoot(treeUpdate(root,path,f=>({...f,folders:(f.folders||[]).map(c=>c.id===fid?{...c,name:renameVal.trim()}:c)})));
    setRenaming(null);
  };

  const readFiles=(fileList)=>{
    if(path.length===0){ alert("Please open a folder first, then upload files into it."); return; }
    const files=Array.from(fileList);
    const tooBig=files.filter(f=>f.size>4*1024*1024);
    if(tooBig.length){
      alert("These files are larger than 4 MB and can't be stored in this version:\n\n"+tooBig.map(f=>"• "+f.name).join("\n")+"\n\nTip: photos can be resized smaller, or large PDFs can be compressed. The team version (with cloud storage) will remove this limit.");
    }
    files.filter(f=>f.size<=4*1024*1024).forEach(file=>{
      const r=new FileReader();
      r.onload=ev=>{
        const doc={id:uid(),name:file.name.replace(/\.[^.]+$/,""),fileName:file.name,type:file.type,size:file.size,data:ev.target.result,uploadedAt:new Date().toLocaleDateString()};
        setFolders(prev=> treeUpdate(prev,path,f=>({...f,files:[...(f.files||[]),doc]})) );
      };
      r.onerror=()=>alert("Could not read "+file.name+". Try a different file.");
      r.readAsDataURL(file);
    });
  };
  const handleFiles=e=>{readFiles(e.target.files);e.target.value="";};
  const onDrop=e=>{e.preventDefault();e.currentTarget.style.borderColor="#D6D2CA";readFiles(e.dataTransfer.files);};
  const renameFile=(fileId,name)=>writeRoot(treeUpdate(root,path,f=>({...f,files:(f.files||[]).map(d=>d.id===fileId?{...d,name}:d)})));
  const delFile=(fileId)=>writeRoot(treeUpdate(root,path,f=>({...f,files:(f.files||[]).filter(d=>d.id!==fileId)})));

  // ── MOVE ──
  // Remove a file from current path; returns [newRoot, removedFile]
  const removeFileFromCurrent=(rootArr,fileId)=>{
    let removed=null;
    const apply=(arr,p)=> arr.map(f=>{
      if(p.length===1 && f.id===p[0]){
        const keep=(f.files||[]).filter(d=>{if(d.id===fileId){removed=d;return false;}return true;});
        return {...f,files:keep};
      }
      if(p.length>1 && f.id===p[0]) return {...f,folders:apply(f.folders||[],p.slice(1))};
      return f;
    });
    const nr=apply(rootArr,path);
    return [nr,removed];
  };
  const insertFileAt=(rootArr,destPath,file)=>{
    if(destPath.length===0) return rootArr; // can't drop file at root
    return treeUpdate(rootArr,destPath,f=>({...f,files:[...(f.files||[]),file]}));
  };
  // Remove a folder by its id from anywhere; returns [newRoot, removedFolder]
  const removeFolder=(arr,fid)=>{
    let removed=null;
    const filtered=[];
    for(const f of arr){
      if(f.id===fid){removed=f;continue;}
      const [childArr,childRemoved]=removeFolder(f.folders||[],fid);
      if(childRemoved){removed=childRemoved;filtered.push({...f,folders:childArr});}
      else filtered.push(f);
    }
    return [filtered,removed];
  };
  const insertFolderAt=(arr,destPath,folder)=>{
    if(destPath.length===0) return [...arr,folder];
    return treeUpdate(arr,destPath,f=>({...f,folders:[...(f.folders||[]),folder]}));
  };

  const doMove=(destPath)=>{
    if(moving.kind==="file"){
      const [nr,file]=removeFileFromCurrent(root,moving.id);
      if(file) writeRoot(insertFileAt(nr,destPath,file));
    } else {
      const [nr,folder]=removeFolder(root,moving.id);
      if(folder) writeRoot(insertFolderAt(nr,destPath,folder));
    }
    setMoving(null);
  };

  // Destinations for the move picker
  const allDests=flattenFolders(root);

  return (
    <div style={{height:"calc(100vh - 140px)",minHeight:400,display:"flex",flexDirection:"column",gap:12}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
        <Icon name="folder" size={16}/>
        <button onClick={()=>setPath([])} style={{background:"none",border:"none",color:path.length?"#6B6B6B":"#1A1A1A",fontWeight:path.length?500:800,fontSize:18,cursor:"pointer",padding:0}}>Documents</button>
        {crumbs.map((c,i)=>(
          <span key={c.id} style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{color:"#C8C4BC"}}>/</span>
            <button onClick={()=>setPath(path.slice(0,i+1))} style={{background:"none",border:"none",color:i===crumbs.length-1?"#1A1A1A":"#6B6B6B",fontWeight:i===crumbs.length-1?800:500,fontSize:18,cursor:"pointer",padding:0}}>{c.name}</button>
          </span>
        ))}
        {path.length>0 && <button onClick={()=>setPath(path.slice(0,-1))} style={{marginLeft:8,fontSize:13,color:"#6B6B6B",background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:6,padding:"3px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="up" size={11}/> Up</button>}
      </div>

      {/* Add subfolder + upload row */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:5}}>
          <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={path.length?"New subfolder…":"New folder…"} onKeyDown={e=>e.key==="Enter"&&addFolder()}
            style={{background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:6,color:"#1A1A1A",padding:"7px 10px",fontSize:14,width:170,boxSizing:"border-box"}}/>
          <button onClick={addFolder} style={{background:"#1A1A1A",border:"none",borderRadius:6,color:"#fff",padding:"0 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:14,fontWeight:600}}><Icon name="plus" size={12}/> Folder</button>
        </div>
        {path.length>0 && (
          <button onClick={()=>fRef.current?.click()} style={{background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:6,color:"#3A3A3A",padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:14,fontWeight:600}}>
            <Icon name="upload" size={12}/> Upload Files Here
          </button>
        )}
        <input type="file" ref={fRef} style={{display:"none"}} multiple accept="image/*,.pdf,.doc,.docx,.xlsx,.txt" onChange={handleFiles}/>
      </div>

      {/* Hint at top level */}
      {path.length===0 && (
        <div style={{background:"#FFF8E8",border:"1px solid #E8C97A",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#6B5A2A"}}>
          Tip: Open a folder (like Surveys) first, then the <span style={{fontWeight:700}}>Upload Files Here</span> button appears. Files live inside folders.
        </div>
      )}

      {/* Drop zone (only inside a folder) */}
      {path.length>0 && (
        <div style={{...S.card,padding:"12px",textAlign:"center",cursor:"pointer",border:"2px dashed #D6D2CA"}}
          onClick={()=>fRef.current?.click()}
          onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor="#1A1A1A";}}
          onDragLeave={e=>{e.currentTarget.style.borderColor="#D6D2CA";}}
          onDrop={onDrop}>
          <div style={{fontSize:13,color:"#9A9A9A"}}>Drag & drop files into "{crumbs[crumbs.length-1]?.name}" — or use the buttons above</div>
        </div>
      )}

      {/* Contents */}
      <div style={{flex:1,overflowY:"auto"}}>
        {folders.length===0 && files.length===0 && (
          <div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:15}}>
            {path.length===0?"No folders yet. Create one like \"Surveys\" above.":"This folder is empty. Add a subfolder or upload files."}
          </div>
        )}

        {/* Subfolders grid */}
        {folders.length>0 && (
          <>
            <div style={{fontSize:13,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Folders</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:20}}>
              {folders.map(f=>{
                const n=countAll(f); const subs=(f.folders||[]).length;
                return (
                  <div key={f.id} style={{...S.card,padding:"12px 14px",position:"relative"}}>
                    {renaming===f.id?(
                      <div style={{display:"flex",gap:4}}>
                        <input autoFocus value={renameVal} onChange={e=>setRenameVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&renameFolder(f.id)}
                          style={{flex:1,background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:5,padding:"4px 7px",fontSize:14,minWidth:0,boxSizing:"border-box"}}/>
                        <button onClick={()=>renameFolder(f.id)} style={{background:"#1A1A1A",border:"none",borderRadius:5,color:"#fff",padding:"0 8px",cursor:"pointer"}}>✓</button>
                      </div>
                    ):(
                      <>
                        <div onClick={()=>setPath([...path,f.id])} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}}>
                          <Icon name="folder" size={20}/>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:15,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</div>
                            <div style={{fontSize:13,color:"#9A9A9A",marginTop:1}}>{n} file{n!==1?"s":""}{subs?` · ${subs} subfolder${subs!==1?"s":""}`:""}</div>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:8,marginTop:9}}>
                          <button onClick={()=>{setRenaming(f.id);setRenameVal(f.name);}} style={{fontSize:13,color:"#9A9A9A",background:"none",border:"none",cursor:"pointer",padding:0}}>Rename</button>
                          <button onClick={()=>setMoving({kind:"folder",id:f.id,name:f.name})} style={{fontSize:13,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",padding:0}}>Move</button>
                          <button onClick={()=>delFolder(f.id)} style={{fontSize:13,color:"#DC2626",background:"none",border:"none",cursor:"pointer",padding:0}}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Files grid */}
        {files.length>0 && (
          <>
            <div style={{fontSize:13,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Files</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:11}}>
              {files.map(doc=>(
                <div key={doc.id} style={{...S.card,overflow:"hidden",position:"relative",display:"flex",flexDirection:"column"}}>
                  {doc.type?.startsWith("image/")?
                    <a href={doc.data} download={doc.fileName} title="Download"><img src={doc.data} alt={doc.name} style={{width:"100%",height:100,objectFit:"cover",display:"block"}}/></a>:
                    <a href={doc.data} download={doc.fileName} title="Download" style={{height:100,display:"flex",alignItems:"center",justifyContent:"center",background:"#F7F6F3",color:"#4A7B6F"}}><Icon name="file" size={32}/></a>}
                  <div style={{padding:"7px 9px",flex:1}}>
                    <input value={doc.name} onChange={e=>renameFile(doc.id,e.target.value)}
                      style={{width:"100%",fontSize:13,fontWeight:600,color:"#1A1A1A",background:"transparent",border:"1px solid transparent",borderRadius:4,padding:"2px 4px",boxSizing:"border-box"}}
                      onFocus={e=>e.target.style.border="1px solid #D6D2CA"} onBlur={e=>e.target.style.border="1px solid transparent"}/>
                    <div style={{fontSize:12,color:"#9A9A9A",marginTop:2,padding:"0 4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={doc.fileName}>{doc.fileName}</div>
                    <div style={{fontSize:12,color:"#B8B4AC",padding:"0 4px",marginTop:1}}>{(doc.size/1024).toFixed(0)} KB · {doc.uploadedAt}</div>
                    <button onClick={()=>setMoving({kind:"file",id:doc.id,name:doc.name})} style={{fontSize:13,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",padding:"3px 4px 0",fontWeight:600}}>Move to…</button>
                  </div>
                  <button onClick={()=>delFile(doc.id)} style={{position:"absolute",top:5,right:5,background:"#00000099",border:"none",borderRadius:"50%",width:19,height:19,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><Icon name="x" size={10}/></button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MOVE MODAL */}
      {moving&&(
        <Modal title={`Move ${moving.kind==="file"?"File":"Folder"}: ${moving.name}`} onClose={()=>setMoving(null)} width={400}>
          <div style={{fontSize:13,color:"#6B6B6B",marginBottom:12}}>Choose a destination folder:</div>
          <div style={{maxHeight:300,overflowY:"auto",border:"1px solid #E5E2DC",borderRadius:8,padding:6}}>
            {moving.kind==="file"&&(
              <div style={{fontSize:13,color:"#9A9A9A",padding:"6px 8px"}}>Files must go inside a folder.</div>
            )}
            {moving.kind==="folder"&&(
              <button onClick={()=>doMove([])} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 9px",borderRadius:6,border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:700,color:"#1A1A1A"}}>
                📁 Documents (top level)
              </button>
            )}
            {allDests.map(d=>{
              // Disallow moving a folder into itself or its own descendants
              const blocked = moving.kind==="folder" && pathContains(d.path, moving.id);
              return (
                <button key={d.id} disabled={blocked} onClick={()=>!blocked&&doMove(d.path)}
                  style={{display:"block",width:"100%",textAlign:"left",padding:"7px 9px",paddingLeft:9+d.depth*16,borderRadius:6,border:"none",background:"transparent",cursor:blocked?"not-allowed":"pointer",fontSize:14,color:blocked?"#C8C4BC":"#3A3A3A"}}>
                  <Icon name="folder" size={11}/> {d.name}{blocked?"  (can't move into itself)":""}
                </button>
              );
            })}
          </div>
          <div style={{marginTop:14}}><Btn onClick={()=>setMoving(null)}>Cancel</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ── GANTT ─────────────────────────────────────────────────────────────────────
function GanttView({project,sched,totalDays}) {
  const LW=185,DW=Math.max(6,Math.min(14,Math.floor((860-185)/Math.max(totalDays,1))));
  const todayD=Math.round((new Date()-new Date(project.start+"T00:00:00"))/86400000);
  const months=[];let cur=new Date(project.start+"T00:00:00");
  for(let d=0;d<=totalDays;){
    const lbl=cur.toLocaleDateString("en-US",{month:"short",year:"2-digit"});
    const rem=new Date(cur.getFullYear(),cur.getMonth()+1,1)-cur;
    const span=Math.min(Math.ceil(rem/86400000),totalDays-d);
    if(span<=0)break;months.push({lbl,span});d+=span;cur=new Date(cur.getTime()+span*86400000);
  }
  return (
    <div>
      <h2 style={{margin:"0 0 14px",fontSize:20,fontWeight:700}}>Gantt Schedule</h2>
      <div style={{overflowX:"auto",...S.card}}>
        <div style={{minWidth:LW+totalDays*DW}}>
          <div style={{display:"flex",borderBottom:"1px solid #E5E2DC"}}>
            <div style={{width:LW,flexShrink:0,padding:"6px 12px",fontSize:13,color:"#9A9A9A"}}>Task</div>
            <div style={{flex:1,display:"flex"}}>
              {months.map((m,i)=><div key={i} style={{width:m.span*DW,flexShrink:0,padding:"6px 4px",fontSize:12,color:"#9A9A9A",borderLeft:"1px solid #E5E2DC",overflow:"hidden",whiteSpace:"nowrap"}}>{m.lbl}</div>)}
            </div>
          </div>
          {project.phases.map(ph=>(
            <div key={ph.id}>
              <div style={{display:"flex",background:"#FFFFFF",borderBottom:"1px solid #E5E2DC"}}>
                <div style={{width:LW,flexShrink:0,padding:"4px 12px",fontSize:12,fontWeight:700,color:ph.color,textTransform:"uppercase",letterSpacing:"0.07em"}}>{ph.label}</div>
                <div style={{flex:1,position:"relative",height:22}}>
                  {todayD>=0&&todayD<=totalDays&&<div style={{position:"absolute",inset:0,left:todayD*DW,width:1,background:"#1A1A1A55"}}/>}
                </div>
              </div>
              {ph.tasks.map(task=>{
                const s=sched[task.id];if(!s)return null;
                const sc=STATUS_COLORS[project.statuses[task.id]];
                return (
                  <div key={task.id} style={{display:"flex",borderBottom:"1px solid #E5E2DC08",minHeight:30}}>
                    <div style={{width:LW,flexShrink:0,padding:"5px 12px",fontSize:13,color:"#6B6B6B",display:"flex",alignItems:"center",gap:5}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:sc,flexShrink:0}}/>
                      <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{task.label}</span>
                    </div>
                    <div style={{flex:1,position:"relative"}}>
                      {todayD>=0&&todayD<=totalDays&&<div style={{position:"absolute",inset:0,left:todayD*DW,width:1,background:"#1A1A1A44"}}/>}
                      <div style={{position:"absolute",top:5,left:s.startDay*DW,width:(s.endDay-s.startDay)*DW,height:18,background:sc+"33",border:`1px solid ${sc}`,borderRadius:3,display:"flex",alignItems:"center",paddingLeft:3,overflow:"hidden"}}>
                        <span style={{fontSize:11,color:sc,whiteSpace:"nowrap"}}>{task.duration}d</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {todayD>=0&&todayD<=totalDays&&<div style={{position:"relative",height:14}}><div style={{position:"absolute",left:LW+todayD*DW-14,fontSize:11,color:"#1A1A1A",fontWeight:700,background:"#FFFFFF",padding:"1px 3px",borderRadius:2}}>TODAY</div></div>}
        </div>
      </div>
      <div style={{display:"flex",gap:12,marginTop:10,flexWrap:"wrap"}}>
        {STATUS_OPTIONS.map(s=><div key={s} style={{display:"flex",alignItems:"center",gap:4,fontSize:13,color:"#6B6B6B"}}><div style={{width:10,height:10,background:STATUS_COLORS[s]+"44",border:`1px solid ${STATUS_COLORS[s]}`,borderRadius:2}}/>{s}</div>)}
      </div>
    </div>
  );
}

// ── TODAY HOME (all jobs command center) ──────────────────────────────────────
function TodayHome({projects,directory,setActiveId,setView}) {
  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));
  const subName=(s)=> s.subId&&dirById[s.subId]?dirById[s.subId].company : (s.company||null);
  const today=new Date(); today.setHours(0,0,0,0);
  const todayKey=today.toISOString().split("T")[0];
  const in7=new Date(today); in7.setDate(in7.getDate()+7);
  const dnum=(d)=>{const x=new Date(d+"T00:00:00");return Math.round((x-today)/86400000);};

  const scheduledToday=[], upcoming=[], overdue=[], blockedItems=[], openTodos=[], orderAlerts=[], bidAlerts=[];

  projects.forEach(p=>{
    const subs=p.subs||{};
    const orders=p.orders||{};
    const pSched=buildSchedule(p.phases);
    p.phases.forEach(ph=>ph.tasks.forEach(t=>{
      const s=subs[t.id];
      if(s&&s.scheduledDate&&!s.completedDate){
        const diff=dnum(s.scheduledDate);
        const item={projectId:p.id,projectName:p.name,task:t.label,sub:subName(s),date:s.scheduledDate,diff,color:ph.color};
        if(s.scheduledDate===todayKey) scheduledToday.push(item);
        else if(diff<0) overdue.push(item);
        else if(diff<=7) upcoming.push(item);
      }
      if(p.statuses[t.id]==="Blocked") blockedItems.push({projectId:p.id,projectName:p.name,task:t.label,color:ph.color});
      // Order lead-time alerts
      const o=orders[t.id];
      if(o&&o.isOrder&&!o.orderedDate&&o.leadDays){
        let need=o.neededDate;
        if(!need){ if(s?.scheduledDate) need=s.scheduledDate; else { const sc=pSched[t.id]; if(sc){const d=new Date(p.start+"T00:00:00");d.setDate(d.getDate()+sc.startDay);need=d.toISOString().split("T")[0];} } }
        if(need){
          const ob=new Date(need+"T00:00:00"); ob.setDate(ob.getDate()-Number(o.leadDays));
          const du=Math.round((ob-today)/86400000);
          if(du<=7) orderAlerts.push({projectId:p.id,projectName:p.name,task:t.label,color:ph.color,du,need});
        }
      }
    }));
    (p.todos||[]).filter(td=>!td.done).forEach(td=>openTodos.push({projectId:p.id,projectName:p.name,text:td.text}));
    // Open bid packages with a due date and outstanding (non-responded) invites
    (p.bids||[]).forEach(b=>{
      if(b.awardedSubId||!b.dueDate) return;
      const waiting=b.invites.filter(iv=>!iv.amount).length;
      if(waiting===0) return; // everyone responded
      const du=Math.round((new Date(b.dueDate+"T00:00:00")-today)/86400000);
      if(du<=5) bidAlerts.push({projectId:p.id,projectName:p.name,phase:b.phaseLabel,du,date:b.dueDate,waiting,total:b.invites.length});
    });
  });

  bidAlerts.sort((a,b)=>a.du-b.du);
  orderAlerts.sort((a,b)=>a.du-b.du);

  overdue.sort((a,b)=>a.diff-b.diff);
  upcoming.sort((a,b)=>a.diff-b.diff);

  const go=(pid,v)=>{setActiveId(pid);setView(v);};
  const dateLabel=(d)=>new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

  const Row=({color,bold,children,onClick})=>(
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",background:"#FFFFFF",border:"1px solid #E5E2DC",borderLeft:`4px solid ${color||"#C8C4BC"}`,borderRadius:8,padding:"10px 13px",marginBottom:6,cursor:"pointer"}}>
      {children}
    </button>
  );

  const todayStr=today.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

  return (
    <div style={{maxWidth:1000}}>
      <div style={{marginBottom:4}}><h2 style={{margin:0,fontSize:22,fontWeight:800}}>Good morning 👋</h2></div>
      <p style={{margin:"0 0 20px",fontSize:14,color:"#6B6B6B"}}>{todayStr}</p>

      {/* Attention strip */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
        {[
          {label:"Scheduled Today",value:scheduledToday.length,color:"#C17A3A"},
          {label:"Order Now/Soon",value:orderAlerts.length,color:orderAlerts.length?"#EF4444":"#22C55E"},
          {label:"Bids Due",value:bidAlerts.length,color:bidAlerts.length?"#B5613A":"#22C55E"},
          {label:"Overdue",value:overdue.length,color:"#EF4444"},
          {label:"Blocked",value:blockedItems.length,color:"#EF4444"},
          {label:"Next 7 Days",value:upcoming.length,color:"#4A7B6F"},
          {label:"Open To-Dos",value:openTodos.length,color:"#6B6B6B"},
        ].map(s=>(
          <div key={s.label} style={{...S.card,padding:"14px 16px",borderLeft:`3px solid ${s.color}`,position:"relative",overflow:"hidden"}}>
            <div style={{fontSize:12,color:"#6B6B6B",marginBottom:4,fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:28,fontWeight:800,color:s.color,letterSpacing:"-0.02em"}}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* OVERDUE — most urgent, show first if any */}
      {overdue.length>0 && (
        <Section title="⚠️ Overdue — needs attention" count={overdue.length}>
          {overdue.map((e,i)=>(
            <Row key={i} color="#EF4444" onClick={()=>go(e.projectId,"subs")}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700}}>{e.projectName}</div>
                <div style={{fontSize:13,color:"#3A3A3A"}}>{e.task}{e.sub?` · ${e.sub}`:""}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:"#EF4444",flexShrink:0,textAlign:"right"}}>{Math.abs(e.diff)}d late<br/><span style={{fontWeight:400,color:"#9A9A9A"}}>{dateLabel(e.date)}</span></div>
            </Row>
          ))}
        </Section>
      )}

      {/* ORDER NOW — lead time alerts */}
      {orderAlerts.length>0 && (
        <Section title="📦 Time to Order — lead-time alerts" count={orderAlerts.length}>
          {orderAlerts.map((e,i)=>(
            <Row key={i} color={e.du<0?"#EF4444":"#C17A3A"} onClick={()=>go(e.projectId,"orders")}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700}}>{e.projectName}</div>
                <div style={{fontSize:13,color:"#3A3A3A"}}>{e.task}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:e.du<0?"#EF4444":"#C17A3A",flexShrink:0,textAlign:"right"}}>
                {e.du<0?`${Math.abs(e.du)}d overdue`:e.du===0?"Order today":`Order in ${e.du}d`}
                <br/><span style={{fontWeight:400,color:"#9A9A9A"}}>need by {dateLabel(e.need)}</span>
              </div>
            </Row>
          ))}
        </Section>
      )}

      {/* BID DEADLINES */}
      {bidAlerts.length>0 && (
        <Section title="📋 Bids Due — follow up with subs" count={bidAlerts.length}>
          {bidAlerts.map((e,i)=>(
            <Row key={i} color={e.du<0?"#EF4444":"#B5613A"} onClick={()=>go(e.projectId,"bids")}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700}}>{e.projectName}</div>
                <div style={{fontSize:13,color:"#3A3A3A"}}>{e.phase} · waiting on {e.waiting} of {e.total} sub{e.total!==1?"s":""}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:e.du<0?"#EF4444":"#B5613A",flexShrink:0,textAlign:"right"}}>
                {e.du<0?`${Math.abs(e.du)}d overdue`:e.du===0?"Due today":`Due in ${e.du}d`}
                <br/><span style={{fontWeight:400,color:"#9A9A9A"}}>{dateLabel(e.date)}</span>
              </div>
            </Row>
          ))}
        </Section>
      )}

      {/* SCHEDULED TODAY */}
      <Section title="📅 Scheduled Today" count={scheduledToday.length} empty="Nothing scheduled across your jobs today.">
        {scheduledToday.map((e,i)=>(
          <Row key={i} color={e.color} onClick={()=>go(e.projectId,"subs")}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700}}>{e.projectName}</div>
              <div style={{fontSize:13,color:"#3A3A3A"}}>{e.task}</div>
            </div>
            {e.sub&&<div style={{fontSize:13,color:"#6B6B6B",flexShrink:0}}>👷 {e.sub}</div>}
          </Row>
        ))}
      </Section>

      {/* BLOCKED */}
      {blockedItems.length>0 && (
        <Section title="🚧 Blocked Tasks" count={blockedItems.length}>
          {blockedItems.map((e,i)=>(
            <Row key={i} color="#EF4444" onClick={()=>go(e.projectId,"tasks")}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700}}>{e.projectName}</div>
                <div style={{fontSize:13,color:"#3A3A3A"}}>{e.task}</div>
              </div>
              <span style={{fontSize:12,fontWeight:700,color:"#EF4444",flexShrink:0}}>Blocked</span>
            </Row>
          ))}
        </Section>
      )}

      {/* UPCOMING 7 DAYS */}
      <Section title="🗓️ Coming Up (next 7 days)" count={upcoming.length} empty="Nothing scheduled in the next week.">
        {upcoming.map((e,i)=>(
          <Row key={i} color={e.color} onClick={()=>go(e.projectId,"subs")}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700}}>{e.projectName}</div>
              <div style={{fontSize:13,color:"#3A3A3A"}}>{e.task}{e.sub?` · ${e.sub}`:""}</div>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:"#6B6B6B",flexShrink:0,textAlign:"right"}}>{e.diff===1?"Tomorrow":`In ${e.diff} days`}<br/><span style={{fontWeight:400,color:"#9A9A9A"}}>{dateLabel(e.date)}</span></div>
          </Row>
        ))}
      </Section>

      {/* OPEN TO-DOS */}
      {openTodos.length>0 && (
        <Section title="✅ Open To-Do Items" count={openTodos.length}>
          {openTodos.slice(0,15).map((e,i)=>(
            <Row key={i} color="#C8C4BC" onClick={()=>go(e.projectId,"todo")}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,color:"#1A1A1A"}}>{e.text}</div>
                <div style={{fontSize:11,color:"#9A9A9A"}}>{e.projectName}</div>
              </div>
            </Row>
          ))}
          {openTodos.length>15&&<div style={{fontSize:12,color:"#9A9A9A",padding:"4px 2px"}}>+{openTodos.length-15} more across your jobs</div>}
        </Section>
      )}

      {projects.length===0 && (
        <div style={{...S.card,padding:24,textAlign:"center",color:"#9A9A9A",fontSize:14}}>
          No projects yet. Create one from the dropdown at the top to get started.
        </div>
      )}
    </div>
  );
}

function Section({title,count,empty,children}) {
  const isEmpty=!children || (Array.isArray(children)&&children.filter(Boolean).length===0);
  return (
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <h3 style={{margin:0,fontSize:15,fontWeight:800}}>{title}</h3>
        {count>0&&<span style={{fontSize:12,fontWeight:700,color:"#6B6B6B",background:"#F2F0EC",borderRadius:20,padding:"2px 9px"}}>{count}</span>}
      </div>
      {isEmpty
        ? <div style={{fontSize:13,color:"#9A9A9A",padding:"8px 2px"}}>{empty||"Nothing here."}</div>
        : children}
    </div>
  );
}

// ── ANALYTICS & INSIGHTS ──────────────────────────────────────────────────────
function Analytics({projects,directory,setActiveId,setView}) {
  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));
  const today=new Date(); today.setHours(0,0,0,0);

  const data=useMemo(()=>{
    let totalTasks=0,doneTasks=0,blockedTasks=0;
    let totAlloc=0,totSpent=0,totBudget=0;
    let overdueSubs=0,completedSubs=0,onTimeSubs=0,lateSubs=0;
    const phaseAgg={}; // label -> {alloc,spent,jobs:Set}
    const subUse={};   // subId/name -> {name,assigned,completed}
    const perProject=[];

    projects.forEach(p=>{
      const subs=p.subs||{}, budgets=p.budgets||{}, statuses=p.statuses||{};
      let pTasks=0,pDone=0,pAlloc=0,pSpent=0;
      totBudget+=num(p.totalBudget);
      p.phases.forEach(ph=>{
        const pa=phaseAgg[ph.label]||(phaseAgg[ph.label]={alloc:0,spent:0,jobs:new Set(),color:ph.color});
        ph.tasks.forEach(t=>{
          totalTasks++; pTasks++;
          const st=statuses[t.id];
          if(st==="Complete"){doneTasks++;pDone++;}
          if(st==="Blocked")blockedTasks++;
          const b=budgets[t.id]||{};
          const a=num(b.allocated),sp=num(b.spent);
          totAlloc+=a; totSpent+=sp; pAlloc+=a; pSpent+=sp;
          pa.alloc+=a; pa.spent+=sp; if(a||sp)pa.jobs.add(p.id);
          const s=subs[t.id];
          if(s){
            const ref=s.subId&&dirById[s.subId]?s.subId:(s.company?"n:"+s.company:null);
            const nm=s.subId&&dirById[s.subId]?dirById[s.subId].company:s.company;
            if(ref){const u=subUse[ref]||(subUse[ref]={name:nm,assigned:0,completed:0});u.assigned++;if(s.completedDate)u.completed++;}
            if(s.completedDate)completedSubs++;
            if(s.scheduledDate&&!s.completedDate&&new Date(s.scheduledDate+"T00:00:00")<today)overdueSubs++;
            // on-time: completed on/before scheduled
            if(s.completedDate&&s.scheduledDate){
              if(new Date(s.completedDate+"T00:00:00")<=new Date(s.scheduledDate+"T00:00:00"))onTimeSubs++; else lateSubs++;
            }
          }
        });
      });
      perProject.push({id:p.id,name:p.name,client:p.client,tasks:pTasks,done:pDone,pct:pTasks?Math.round(pDone/pTasks*100):0,alloc:pAlloc,spent:pSpent,budget:num(p.totalBudget)});
    });

    const phaseRows=Object.entries(phaseAgg).map(([label,v])=>({label,color:v.color,alloc:v.alloc,spent:v.spent,jobs:v.jobs.size,variance:v.alloc-v.spent})).filter(r=>r.alloc||r.spent).sort((a,b)=>b.spent-a.spent);
    const subRows=Object.values(subUse).sort((a,b)=>b.assigned-a.assigned).slice(0,8);
    const onTimeRate = (onTimeSubs+lateSubs)?Math.round(onTimeSubs/(onTimeSubs+lateSubs)*100):null;

    return {totalTasks,doneTasks,blockedTasks,totAlloc,totSpent,totBudget,overdueSubs,completedSubs,onTimeRate,phaseRows,subRows,perProject};
  },[projects,directory]);

  const pctDone=data.totalTasks?Math.round(data.doneTasks/data.totalTasks*100):0;
  const overBudget=data.totSpent>data.totAlloc&&data.totAlloc>0;
  const maxPhaseSpent=Math.max(...data.phaseRows.map(r=>Math.max(r.alloc,r.spent)),1);
  const maxSubAssigned=Math.max(...data.subRows.map(r=>r.assigned),1);

  const Bar=({value,max,color,h=8})=>(
    <div style={{height:h,background:"#EEEBE5",borderRadius:h/2,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${Math.min(100,value/max*100)}%`,background:color,borderRadius:h/2,transition:"width 0.5s"}}/>
    </div>
  );
  const Card=({children,style:sx})=> <div style={{...S.card,padding:"16px 18px",...sx}}>{children}</div>;
  const H=({children})=> <h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:800,letterSpacing:"-0.01em"}}>{children}</h3>;

  if(!projects.length) return <div style={{...S.card,padding:30,textAlign:"center",color:"#9A9A9A"}}>No projects yet.</div>;

  return (
    <div style={{maxWidth:1100}}>
      <div style={{marginBottom:4}}><h2 style={{margin:0,fontSize:22,fontWeight:800,letterSpacing:"-0.02em"}}>Analytics &amp; Insights</h2></div>
      <p style={{margin:"0 0 22px",fontSize:14,color:"#6B6B6B"}}>Trends across all {projects.length} job{projects.length!==1?"s":""} — completion, cost, and schedule health pulled from your live data.</p>

      {/* KPI ROW */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:12,marginBottom:14}}>
        {[
          {label:"Active Jobs",value:projects.length,sub:"in portfolio",color:ACCENT},
          {label:"Overall Completion",value:pctDone+"%",sub:`${data.doneTasks} of ${data.totalTasks} tasks`,color:"#22C55E"},
          {label:"Total Spent",value:fmt$(data.totSpent),sub:`of ${fmt$(data.totAlloc)} allocated`,color:overBudget?"#EF4444":"#4A7B6F"},
          {label:"On-Time Rate",value:data.onTimeRate==null?"—":data.onTimeRate+"%",sub:"subs done by sched. date",color:"#2B4C7E"},
          {label:"Overdue Items",value:data.overdueSubs,sub:"need attention",color:data.overdueSubs?"#EF4444":"#22C55E"},
        ].map(s=>(
          <div key={s.label} style={{...S.card,padding:"14px 16px",borderLeft:`3px solid ${s.color}`}}>
            <div style={{fontSize:12,color:"#6B6B6B",marginBottom:4,fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:26,fontWeight:800,color:s.color,letterSpacing:"-0.02em"}}>{s.value}</div>
            <div style={{fontSize:11,color:"#9A9A9A",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))",gap:14}}>

        {/* PROJECT COMPLETION */}
        <Card>
          <H>Completion by Job</H>
          {data.perProject.map(p=>(
            <div key={p.id} style={{marginBottom:13,cursor:"pointer"}} onClick={()=>{setActiveId(p.id);setView("dashboard");}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>
                <span style={{fontSize:13,fontWeight:700,color:p.pct>=100?"#22C55E":"#1A1A1A",flexShrink:0,marginLeft:8}}>{p.pct}%</span>
              </div>
              <Bar value={p.pct} max={100} color={p.pct>=100?"#22C55E":ACCENT}/>
            </div>
          ))}
        </Card>

        {/* BUDGET BY JOB */}
        <Card>
          <H>Budget: Spent vs Allocated by Job</H>
          {data.perProject.filter(p=>p.alloc||p.spent).length===0 && <div style={{fontSize:13,color:"#9A9A9A"}}>Add allocated/spent amounts on tasks to see cost trends.</div>}
          {data.perProject.filter(p=>p.alloc||p.spent).map(p=>{
            const over=p.spent>p.alloc&&p.alloc>0;
            return (
              <div key={p.id} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>
                  <span style={{fontSize:12,color:over?"#EF4444":"#6B6B6B",flexShrink:0,marginLeft:8}}>{fmt$(p.spent)} / {fmt$(p.alloc)}</span>
                </div>
                <Bar value={p.spent} max={Math.max(p.alloc,p.spent,1)} color={over?"#EF4444":"#4A7B6F"}/>
                {over && <div style={{fontSize:11,color:"#EF4444",marginTop:3,fontWeight:600}}>Over by {fmt$(p.spent-p.alloc)}</div>}
              </div>
            );
          })}
        </Card>

        {/* PHASE COST BENCHMARK */}
        <Card>
          <H>Spend by Phase (all jobs)</H>
          {data.phaseRows.length===0 && <div style={{fontSize:13,color:"#9A9A9A"}}>No budget data yet.</div>}
          {data.phaseRows.slice(0,10).map(r=>{
            const over=r.spent>r.alloc&&r.alloc>0;
            return (
              <div key={r.label} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,fontWeight:600,color:r.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.label}</span>
                  <span style={{fontSize:12,color:over?"#EF4444":"#6B6B6B",flexShrink:0,marginLeft:8}}>{fmt$(r.spent)}{r.jobs>1?` · ${r.jobs} jobs`:""}</span>
                </div>
                <Bar value={r.spent} max={maxPhaseSpent} color={r.color}/>
              </div>
            );
          })}
        </Card>

        {/* SUB USAGE */}
        <Card>
          <H>Most-Used Subcontractors</H>
          {data.subRows.length===0 && <div style={{fontSize:13,color:"#9A9A9A"}}>Assign subs to tasks to see usage trends.</div>}
          {data.subRows.map((r,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</span>
                <span style={{fontSize:12,color:"#6B6B6B",flexShrink:0,marginLeft:8}}>{r.assigned} job{r.assigned!==1?"s":""} · {r.completed} done</span>
              </div>
              <Bar value={r.assigned} max={maxSubAssigned} color="#2B4C7E"/>
            </div>
          ))}
        </Card>

      </div>

      {/* INSIGHTS */}
      <div style={{...S.card,padding:"18px 20px",marginTop:14,borderLeft:`3px solid ${ACCENT}`}}>
        <H>Insights</H>
        <ul style={{margin:0,paddingLeft:20,fontSize:13,color:"#3A3A3A",lineHeight:1.7}}>
          {(()=>{
            const ins=[];
            if(overBudget) ins.push(<li key="ob">You're <b style={{color:"#EF4444"}}>over allocated budget</b> by {fmt$(data.totSpent-data.totAlloc)} across all jobs — check the phase spend breakdown above.</li>);
            else if(data.totAlloc>0) ins.push(<li key="ub">You're <b style={{color:"#22C55E"}}>under budget</b> by {fmt$(data.totAlloc-data.totSpent)} across all jobs so far.</li>);
            if(data.blockedTasks>0) ins.push(<li key="bl"><b style={{color:"#EF4444"}}>{data.blockedTasks} blocked task{data.blockedTasks!==1?"s":""}</b> across the portfolio are holding up progress.</li>);
            if(data.overdueSubs>0) ins.push(<li key="od"><b style={{color:"#EF4444"}}>{data.overdueSubs} subcontractor visit{data.overdueSubs!==1?"s are":" is"}</b> past their scheduled date without being marked complete.</li>);
            if(data.onTimeRate!=null) ins.push(<li key="ot">Your subs complete work on or before the scheduled date <b>{data.onTimeRate}%</b> of the time.</li>);
            const topPhase=data.phaseRows[0];
            if(topPhase) ins.push(<li key="tp">Highest-spend phase is <b style={{color:topPhase.color}}>{topPhase.label}</b> at {fmt$(topPhase.spent)}{topPhase.jobs>1?` across ${topPhase.jobs} jobs`:""}.</li>);
            const topSub=data.subRows[0];
            if(topSub) ins.push(<li key="ts">Most-assigned sub is <b>{topSub.name}</b> ({topSub.assigned} job{topSub.assigned!==1?"s":""}).</li>);
            if(!ins.length) ins.push(<li key="none">Start entering budgets, statuses, and sub schedules and insights will appear here automatically.</li>);
            return ins;
          })()}
        </ul>
      </div>
    </div>
  );
}

// ── MASTER CALENDAR (all jobs) ────────────────────────────────────────────────
function MasterCalendar({projects,directory,setActiveId,setView}) {
  const [mode,setMode]=useState("week"); // day | week | month
  const [anchor,setAnchor]=useState(()=>{const d=new Date();d.setHours(0,0,0,0);return d;});
  const [tradeFilter,setTradeFilter]=useState("all");
  const [showTasks,setShowTasks]=useState(false);
  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));

  const subName=(sub)=>{
    if(sub.subId&&dirById[sub.subId]) return dirById[sub.subId].company;
    if(sub.company) return sub.company;
    return null;
  };
  const subTrade=(sub)=>{
    if(sub.subId&&dirById[sub.subId]) return dirById[sub.subId].trade||"Other";
    return null;
  };

  // Collect all scheduled events across all projects
  const allEvents=[];
  projects.forEach(p=>{
    const subs=p.subs||{};
    const pSched=buildSchedule(p.phases);
    p.phases.forEach(ph=>ph.tasks.forEach(t=>{
      const s=subs[t.id];
      if(s&&s.scheduledDate){
        allEvents.push({
          kind:"sub",
          date:s.scheduledDate,
          projectId:p.id,
          projectName:p.name,
          taskLabel:t.label,
          phaseColor:ph.color,
          sub:subName(s),
          trade:subTrade(s),
          done:!!s.completedDate,
        });
      } else if(showTasks){
        // No sub appointment — use the computed schedule start date as a planned task
        const sc=pSched[t.id];
        if(sc){
          const d=new Date(p.start+"T00:00:00"); d.setDate(d.getDate()+sc.startDay);
          allEvents.push({
            kind:"task",
            date:d.toISOString().split("T")[0],
            projectId:p.id,
            projectName:p.name,
            taskLabel:t.label,
            phaseColor:ph.color,
            sub:null,
            trade:null,
            done:p.statuses[t.id]==="Complete",
          });
        }
      }
    }));
  });
  // Trades present in the schedule, for the filter dropdown
  const tradesPresent=Array.from(new Set(allEvents.map(e=>e.trade).filter(Boolean))).sort();
  const events = tradeFilter==="all" ? allEvents : allEvents.filter(e=>e.trade===tradeFilter);

  const dateKey=(d)=>d.toISOString().split("T")[0];
  const eventsOn=(d)=>events.filter(e=>e.date===dateKey(d)).sort((a,b)=>a.projectName.localeCompare(b.projectName));

  const fmtLong=(d)=>d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  const fmtShort=(d)=>d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  const isToday=(d)=>dateKey(d)===dateKey(new Date());

  const shift=(days)=>{const d=new Date(anchor);d.setDate(d.getDate()+days);setAnchor(d);};
  const goToday=()=>{const d=new Date();d.setHours(0,0,0,0);setAnchor(d);};

  // Week start (Sunday)
  const weekStart=()=>{const d=new Date(anchor);d.setDate(d.getDate()-d.getDay());return d;};
  const weekDays=()=>{const s=weekStart();return Array.from({length:7},(_,i)=>{const d=new Date(s);d.setDate(d.getDate()+i);return d;});};

  const EventCard=({e,compact})=>(
    <button onClick={()=>{setActiveId(e.projectId);setView(e.kind==="task"?"gantt":"subs");}}
      style={{display:"block",width:"100%",textAlign:"left",background:e.done?"#F2F0EC":e.kind==="task"?"#FBFAF8":"#FFFFFF",border:e.kind==="task"?`1px dashed ${e.phaseColor}99`:`1px solid ${e.phaseColor}`,borderLeft:`4px solid ${e.phaseColor}`,borderRadius:6,padding:compact?"4px 6px":"7px 9px",marginBottom:4,cursor:"pointer",opacity:e.done?0.6:1}}>
      <div style={{fontSize:compact?11:13,fontWeight:700,color:"#1A1A1A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:e.done?"line-through":"none"}}>{e.projectName}</div>
      <div style={{fontSize:compact?10:12,color:"#3A3A3A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.taskLabel}</div>
      {e.sub&&<div style={{fontSize:compact?9:11,color:"#6B6B6B",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>👷 {e.sub}</div>}
      {e.kind==="task"&&!compact&&<div style={{fontSize:10,color:"#9A9A9A"}}>planned</div>}
    </button>
  );

  // Header label
  let title="";
  if(mode==="day") title=fmtLong(anchor);
  else if(mode==="week"){const w=weekDays();title=`${fmtShort(w[0])} – ${fmtShort(w[6])}`;}
  else title=anchor.toLocaleDateString("en-US",{month:"long",year:"numeric"});

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:800}}>Walden - Job Calendar</h2>
        <span style={{fontSize:13,color:"#9A9A9A"}}>{events.length} scheduled item{events.length!==1?"s":""}{tradeFilter!=="all"?` · ${tradeFilter} only`:` across ${projects.length} job${projects.length!==1?"s":""}`}</span>
      </div>
      <p style={{margin:"0 0 16px",fontSize:13,color:"#6B6B6B"}}>Everything scheduled across every job. Click any item to jump to that project.</p>

      {/* Controls */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        {/* Mode toggle */}
        <div style={{display:"flex",border:"1px solid #D6D2CA",borderRadius:8,overflow:"hidden"}}>
          {[["day","Day"],["week","Week"],["month","Month"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setMode(id)}
              style={{padding:"7px 16px",border:"none",background:mode===id?"#1A1A1A":"#FFFFFF",color:mode===id?"#fff":"#3A3A3A",cursor:"pointer",fontSize:13,fontWeight:600}}>
              {lbl}
            </button>
          ))}
        </div>
        {/* Navigation */}
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>shift(mode==="day"?-1:mode==="week"?-7:-30)} style={{background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:7,padding:"6px 11px",cursor:"pointer",fontSize:14}}>◀</button>
          <button onClick={goToday} style={{background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:7,padding:"6px 14px",cursor:"pointer",fontSize:13,fontWeight:600}}>Today</button>
          <button onClick={()=>shift(mode==="day"?1:mode==="week"?7:30)} style={{background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:7,padding:"6px 11px",cursor:"pointer",fontSize:14}}>▶</button>
        </div>
        <div style={{fontSize:16,fontWeight:700,marginLeft:4}}>{title}</div>
        {/* Trade filter */}
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <label style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#3A3A3A",cursor:"pointer"}}>
            <input type="checkbox" checked={showTasks} onChange={e=>setShowTasks(e.target.checked)} style={{cursor:"pointer"}}/>
            Show scheduled tasks
          </label>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:13,color:"#6B6B6B"}}>Trade:</span>
            <select value={tradeFilter} onChange={e=>setTradeFilter(e.target.value)}
              style={{background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:7,color:"#1A1A1A",padding:"6px 10px",fontSize:13,cursor:"pointer"}}>
              <option value="all">All Trades</option>
              {tradesPresent.map(tr=><option key={tr} value={tr}>{tr}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* DAY VIEW */}
      {mode==="day" && (
        <div style={{...S.card,padding:20,maxWidth:600}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:14,color:isToday(anchor)?"#C17A3A":"#1A1A1A"}}>{fmtLong(anchor)}{isToday(anchor)?" · Today":""}</div>
          {eventsOn(anchor).length===0
            ? <div style={{color:"#9A9A9A",fontSize:14,padding:"20px 0",textAlign:"center"}}>Nothing scheduled this day.</div>
            : eventsOn(anchor).map((e,i)=><EventCard key={i} e={e}/>)}
        </div>
      )}

      {/* WEEK VIEW */}
      {mode==="week" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8,minWidth:0}}>
          {weekDays().map((d,i)=>{
            const evs=eventsOn(d);
            return (
              <div key={i} style={{...S.card,padding:0,overflow:"hidden",minHeight:200,display:"flex",flexDirection:"column",border:isToday(d)?"2px solid #C17A3A":"1px solid #E5E2DC"}}>
                <div style={{padding:"8px 9px",borderBottom:"1px solid #E5E2DC",background:isToday(d)?"#FFF4E8":"#F7F6F3",textAlign:"center"}}>
                  <div style={{fontSize:11,color:"#6B6B6B",fontWeight:600}}>{d.toLocaleDateString("en-US",{weekday:"short"})}</div>
                  <div style={{fontSize:17,fontWeight:800,color:isToday(d)?"#C17A3A":"#1A1A1A"}}>{d.getDate()}</div>
                </div>
                <div style={{flex:1,overflowY:"auto",padding:6}}>
                  {evs.length===0?<div style={{fontSize:11,color:"#C8C4BC",textAlign:"center",padding:"12px 0"}}>—</div>:evs.map((e,j)=><EventCard key={j} e={e} compact/>)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MONTH VIEW */}
      {mode==="month" && (()=>{
        const y=anchor.getFullYear(),m=anchor.getMonth();
        const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
        return (
          <div style={{...S.card,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid #E5E2DC"}}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} style={{padding:"8px 0",textAlign:"center",fontSize:11,color:"#9A9A9A",fontWeight:700}}>{d}</div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
              {Array(first).fill(null).map((_,i)=><div key={`e${i}`} style={{minHeight:90,borderRight:"1px solid #F0EEE9",borderBottom:"1px solid #F0EEE9"}}/>)}
              {Array(days).fill(null).map((_,i)=>{
                const day=i+1;const d=new Date(y,m,day);const evs=eventsOn(d);const t=isToday(d);
                return (
                  <div key={day} style={{minHeight:90,padding:"4px 5px",borderRight:"1px solid #F0EEE9",borderBottom:"1px solid #F0EEE9",background:t?"#FFF4E8":"transparent"}}>
                    <div style={{fontSize:12,fontWeight:t?800:500,color:t?"#C17A3A":"#6B6B6B",marginBottom:2}}>{day}</div>
                    {evs.slice(0,3).map((e,j)=>(
                      <button key={j} onClick={()=>{setActiveId(e.projectId);setView(e.kind==="task"?"gantt":"subs");}} title={`${e.projectName}: ${e.taskLabel}`}
                        style={{display:"block",width:"100%",textAlign:"left",fontSize:9,background:e.phaseColor+"22",border:`1px solid ${e.phaseColor}66`,borderRadius:3,padding:"1px 4px",marginBottom:2,color:"#1A1A1A",cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {e.projectName}
                      </button>
                    ))}
                    {evs.length>3&&<div style={{fontSize:9,color:"#9A9A9A"}}>+{evs.length-3} more</div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {events.length===0 && (
        <div style={{...S.card,padding:24,marginTop:16,textAlign:"center",color:"#9A9A9A",fontSize:14}}>
          {tradeFilter!=="all"
            ? `No ${tradeFilter} work scheduled. Try "All Trades" or pick a different one.`
            : "No scheduled items yet. Schedule subcontractors on your jobs (in each project's Subcontractors tab) and they'll appear here automatically."}
        </div>
      )}
    </div>
  );
}

// ── CALENDAR ──────────────────────────────────────────────────────────────────
function CalView({project,sched}) {
  const [cur,setCur]=useState(()=>{const d=new Date(project.start+"T00:00:00");return{y:d.getFullYear(),m:d.getMonth()};});
  const {y,m}=cur;
  const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
  const allT=project.phases.flatMap(p=>p.tasks.map(t=>({...t,pc:p.color})));
  const byDay={};
  allT.forEach(task=>{
    const s=sched[task.id];if(!s)return;
    const sd=new Date(project.start+"T00:00:00");sd.setDate(sd.getDate()+s.startDay);
    const ed=new Date(project.start+"T00:00:00");ed.setDate(ed.getDate()+s.endDay);
    for(let d=new Date(sd);d<=ed;d.setDate(d.getDate()+1)){
      if(d.getFullYear()===y&&d.getMonth()===m){
        const day=d.getDate();
        if(!byDay[day])byDay[day]=[];
        if(!byDay[day].find(t=>t.id===task.id))byDay[day].push({...task,isStart:d.getDate()===sd.getDate()&&d.getMonth()===sd.getMonth()});
      }
    }
  });
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <h2 style={{margin:0,fontSize:20,fontWeight:700}}>Calendar</h2>
        <div style={{display:"flex",alignItems:"center",gap:7,marginLeft:"auto"}}>
          <button onClick={()=>setCur(c=>{const d=new Date(c.y,c.m-1);return{y:d.getFullYear(),m:d.getMonth()}})} style={{...S.card,border:"1px solid #E5E2DC",color:"#6B6B6B",padding:"4px 8px",cursor:"pointer"}}>◀</button>
          <span style={{fontSize:15,fontWeight:600,minWidth:140,textAlign:"center"}}>{new Date(y,m).toLocaleDateString("en-US",{month:"long",year:"numeric"})}</span>
          <button onClick={()=>setCur(c=>{const d=new Date(c.y,c.m+1);return{y:d.getFullYear(),m:d.getMonth()}})} style={{...S.card,border:"1px solid #E5E2DC",color:"#6B6B6B",padding:"4px 8px",cursor:"pointer"}}>▶</button>
        </div>
      </div>
      <div style={{...S.card,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid #E5E2DC"}}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} style={{padding:"7px 0",textAlign:"center",fontSize:12,color:"#9A9A9A",fontWeight:700,letterSpacing:"0.05em"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
          {Array(first).fill(null).map((_,i)=><div key={`e${i}`} style={{minHeight:72,borderRight:"1px solid #E5E2DC11",borderBottom:"1px solid #E5E2DC11"}}/>)}
          {Array(days).fill(null).map((_,i)=>{
            const day=i+1,ts=byDay[day]||[];
            const isT=new Date().getDate()===day&&new Date().getMonth()===m&&new Date().getFullYear()===y;
            return <div key={day} style={{minHeight:72,padding:"4px 5px",borderRight:"1px solid #E5E2DC22",borderBottom:"1px solid #E5E2DC22",background:isT?"#1A1A1A11":"transparent"}}>
              <div style={{fontSize:13,fontWeight:isT?700:400,color:isT?"#1A1A1A":"#6B6B6B",marginBottom:2}}>{day}</div>
              {ts.slice(0,3).map(t=><div key={t.id} style={{fontSize:11,background:t.pc+"33",border:`1px solid ${t.pc}55`,borderRadius:2,padding:"1px 3px",marginBottom:2,color:t.pc,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={t.label}>{t.isStart?"▶ ":""}{t.label}</div>)}
              {ts.length>3&&<div style={{fontSize:11,color:"#9A9A9A"}}>+{ts.length-3}</div>}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}