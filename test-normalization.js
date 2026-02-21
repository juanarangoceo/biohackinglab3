// Define the normalization logic we just updated

// Define the normalization logic we just updated
function normalizeCategory(category) {
  if (!category) return 'longevidad';
  
  const normalized = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  
  if (normalized.includes('mujer') || normalized.includes('femenina') || normalized.includes('ovari') || normalized.includes('menopausia') || normalized.includes('hormonas-femeninas')) return 'longevidad-femenina';
  if (normalized.includes('nootropico')) return 'nootropicos';
  if (normalized.includes('sueno') || normalized.includes('sleep')) return 'sueno';
  if (normalized.includes('nutricion')) return 'nutricion';
  if (normalized.includes('fitness') || normalized.includes('ejercicio')) return 'fitness';
  
  return 'longevidad'; // Default fallback
}

// Emulate what generate-blog.ts does for the category check
function testNormalization() {
  const tests = [
    { input: "Longevidad Femenina", expected: "longevidad-femenina" },
    { input: "longevidad-femenina", expected: "longevidad-femenina" },
    { input: "Salud de la Mujer", expected: "longevidad-femenina" },
    { input: "el eje ovárico", expected: "longevidad-femenina" },
    { input: "Biohacking Femenino", expected: "longevidad-femenina" },
    { input: "Menopausia", expected: "longevidad-femenina" },
    { input: "Fitness y pesas", expected: "fitness" },
    { input: "Nootrópicos", expected: "nootropicos" },
    { input: "Longevidad General", expected: "longevidad" },
  ];

  console.log("=== Testing normalizeCategory function ===");
  let passed = 0;
  for (const t of tests) {
    const output = normalizeCategory(t.input);
    if (output === t.expected) {
      console.log(`✅ Input: "${t.input}" -> "${output}"`);
      passed++;
    } else {
      console.log(`❌ Input: "${t.input}" -> "${output}" (expected: "${t.expected}")`);
    }
  }
  console.log(`\nResult: ${passed}/${tests.length} tests passed.`);
}

testNormalization();
