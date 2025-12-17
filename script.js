const subjects = {
  anatomia: { name: "Anatomía Humana", unlocks: ["anatpat"] },
  histologia: { name: "Histología", unlocks: ["fisiologia"] },
  embriologia: { name: "Embriología", unlocks: [] },
  medsoc1: { name: "Medicina social I", unlocks: ["medsoc2"] },

  fisiologia: { name: "Fisiología", unlocks: ["fisiopatologia"] },
  bioquimica: { name: "Bioquímica", unlocks: [] },
  parasitologia: { name: "Parasitología clínica", unlocks: [] },
  bacteriologia: { name: "Bacteriología clínica", unlocks: [] },
  medsoc2: { name: "Medicina social II", unlocks: ["medsoc3"] },

  semiologia: { name: "Semiología", unlocks: [] },
  imagenes: { name: "Diagnóstico por imágenes", unlocks: [] },
  tecnicaqx: { name: "Técnica quirúrgica", unlocks: [] },
  patqx: { name: "Patología quirúrgica", unlocks: [] },
  fisiopatologia: { name: "Fisiopatología", unlocks: [] },
  anatpat: { name: "Anatomía patológica", unlocks: [] },
  saludmental1: { name: "Salud mental I", unlocks: ["saludmental2"] },

  cardiologia: { name: "Cardiología", unlocks: [] },
  neumologia: { name: "Neumología", unlocks: [] },
  nefrologia: { name: "Nefrología", unlocks: [] },
  gastro: { name: "Gastroenterología", unlocks: [] },
  endo: { name: "Endocrinología", unlocks: [] },
  hemato: { name: "Hematología", unlocks: [] },
  reuma: { name: "Reumatología", unlocks: [] },
  cirugia: { name: "Cirugía", unlocks: [] },
  uro: { name: "Urología", unlocks: [] },
  saludmental2: { name: "Salud mental II", unlocks: [] },
  medsoc3: { name: "Medicina social III", unlocks: ["medsoc4"] },

  gine: { name: "Ginecología", unlocks: [] },
  obst: { name: "Obstetricia", unlocks: [] },
  pedia: { name: "Pediatría", unlocks: [] },
  smi: { name: "Salud materna infantil", unlocks: [] },
  nutri: { name: "Nutrición", unlocks: [] },
  neuro: { name: "Neurología", unlocks: [] },
  derma: { name: "Dermatología", unlocks: [] },
  infecto: { name: "Infectología", unlocks: [] },
  inmuno: { name: "Inmunología", unlocks: [] },
  otorrino: { name: "Otorrinolaringología", unlocks: [] },
  oftalmo: { name: "Oftalmología", unlocks: [] },
  trauma: { name: "Traumatología", unlocks: [] },
  legal: { name: "Medicina legal", unlocks: [] },
  medsoc4: { name: "Medicina social IV", unlocks: [] }
};

let approved = JSON.parse(localStorage.getItem("approved")) || {};

function toggleSubject(id) {
  if (document.getElementById(id).classList.contains("locked")) return;

  approved[id] = !approved[id];
  localStorage.setItem("approved", JSON.stringify(approved));
  updateUI();
}

function updateUI() {
  for (const id in subjects) {
    const el = document.getElementById(id);
    if (!el) continue;

    el.classList.remove("approved", "locked");

    if (approved[id]) {
      el.classList.add("approved");
      subjects[id].unlocks.forEach(u => {
        document.getElementById(u)?.classList.remove("locked");
      });
    }
  }

  for (const id in subjects) {
    if (!approved[id]) {
      const locked = Object.values(subjects).some(s =>
        s.unlocks.includes(id) && !approved[Object.keys(subjects).find(k => subjects[k] === s)]
      );
      if (locked) document.getElementById(id)?.classList.add("locked");
    }
  }
}

updateUI();
