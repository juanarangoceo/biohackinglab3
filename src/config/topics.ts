import { Brain, Sun, Moon, Thermometer, Dumbbell, Pill, Heart, Zap, LucideIcon } from "lucide-react"

export interface Topic {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  heroImage?: string
  seoTitle: string
  seoDescription: string
  intro: {
    heading: string
    content: string
  }
  keyBenefits: string[]
  scientificBasis: string
  faq: {
    question: string
    answer: string
  }[]
}

export const topics: Topic[] = [
  {
    slug: "nootropicos",
    title: "Nootrópicos",
    description: "Potencia tu mente, memoria y concentración con compuestos naturales y sintéticos respaldados por la ciencia.",
    icon: Brain,
    seoTitle: "Nootrópicos: Guía Completa para Potenciar tu Cerebro | Biohacking Lab",
    seoDescription: "Descubre qué son los nootrópicos, cómo funcionan y cuáles son los mejores para mejorar la memoria, concentración y claridad mental según la ciencia.",
    intro: {
      heading: "¿Qué son los Nootrópicos?",
      content: "Los nootrópicos, también conocidos como 'drogas inteligentes' o potenciadores cognitivos, son sustancias naturales o sintéticas que pueden mejorar la función mental. Esto incluye la memoria, la motivación, la creatividad, el estado de alerta y la función cognitiva general. En un mundo donde la atención es el recurso más valioso, los nootrópicos ofrecen una ventaja competitiva al optimizar la química cerebral para un rendimiento máximo."
    },
    keyBenefits: [
      "Mejora significativa de la memoria a corto y largo plazo.",
      "Aumento de la concentración y el 'flow state'.",
      "Mayor claridad mental y reducción de la neblina cerebral.",
      "Protección neurodegenerativa a largo plazo."
    ],
    scientificBasis: "Actúan modulando neurotransmisores (como dopamina, acetilcolina y serotonina), aumentando el flujo sanguíneo cerebral, o estimulando el crecimiento de nuevas neuronas (neurogénesis) y sinapsis (neuroplasticidad).",
    faq: [
      {
        question: "¿Son seguros los nootrópicos?",
        answer: "La mayoría de los nootrópicos naturales (como la cafeína, L-teanina, Creatina) son muy seguros cuando se usan correctamente. Los sintéticos requieren más precaución y siempre se recomienda consultar con un especialista."
      },
      {
        question: "¿Cuál es el mejor nootrópico para empezar?",
        answer: "La combinación de Cafeína + L-teanina es el 'stack' más básico y efectivo para principiantes, ofreciendo energía sin ansiedad."
      },
      {
        question: "¿Necesito receta médica?",
        answer: "Muchos nootrópicos son suplementos de venta libre, pero algunos fármacos específicos sí requieren prescripción médica."
      }
    ]
  },
  {
    slug: "terapia-de-luz",
    title: "Terapia de Luz",
    description: "Usa el poder de la luz para regular tus hormonas, mejorar tu piel y aumentar tu energía mitocondrial.",
    icon: Sun,
    seoTitle: "Terapia de Luz Roja e Infrarroja: Beneficios y Protocolos | Biohacking Lab",
    seoDescription: "Aprende cómo la fotobiomodulación y la luz roja pueden mejorar tu piel, reducir la inflamación y optimizar tu ritmo circadiano.",
    intro: {
      heading: "La Luz como Nutriente",
      content: "La luz no es solo iluminación; es información biológica fundamental. La terapia de luz, especialmente la luz roja e infrarroja cercana (RLT), utiliza longitudes de onda específicas para penetrar en la piel y estimular las mitocondrias, las 'centrales eléctricas' de tus células. Esto incrementa la producción de ATP (energía celular), reduce el estrés oxidativo y acelera la recuperación de tejidos."
    },
    keyBenefits: [
      "Producción incrementada de colágeno y salud de la piel.",
      "Reducción de la inflamación sistémica y dolor articular.",
      "Mejora del rendimiento deportivo y recuperación muscular.",
      "Optimización del sueño y ritmos circadianos."
    ],
    scientificBasis: "La fotobiomodulación funciona a nivel celular al interactuar con la citocromo c oxidasa en las mitocondrias, mejorando el uso de oxígeno y la generación de energía.",
    faq: [
      {
        question: "¿Con qué frecuencia debo usar la luz roja?",
        answer: "Para la mayoría de los objetivos, 10-20 minutos diarios, de 3 a 5 veces por semana, es ideal."
      },
      {
        question: "¿Es peligroso para los ojos?",
        answer: "La luz roja generalmente es segura, pero las luces infrarrojas intensas pueden requerir protección ocular. Siempre sigue las instrucciones del fabricante."
      },
      {
        question: "¿Sirve la luz del sol?",
        answer: "Sí, pero las terapias específicas permiten concentrar longitudes de onda terapéuticas sin la radiación UV dañina concentrada."
      }
    ]
  },
  {
    slug: "sueno",
    title: "Optimización del Sueño",
    description: "El pilar fundamental del rendimiento. Aprende a dormir más profundo y recuperarte más rápido.",
    icon: Moon,
    seoTitle: "Cómo Dormir Mejor: Ciencia del Sueño y Biohacking | Biohacking Lab",
    seoDescription: "Protocolos avanzados para combatir el insomnio, mejorar el sueño profundo y optimizar tu descanso nocturno.",
    intro: {
      heading: "Dormir no es una pérdida de tiempo",
      content: "Es el proceso fisiológico más crítico para la reparación física y mental. Durante el sueño, tu cerebro limpia toxinas (sistema glinfático), consolida memorias y tus músculos se regeneran. El biohacking del sueño no se trata solo de dormir más horas, sino de maximizar la *calidad* de cada minuto de descanso, optimizando las fases REM y de sueño profundo."
    },
    keyBenefits: [
      "Mayor energía y estado de alerta durante el día.",
      "Equilibrio hormonal (testosterona, hormona de crecimiento, cortisol).",
      "Mejora del estado de ánimo y regulación emocional.",
      "Fortalecimiento del sistema inmunológico."
    ],
    scientificBasis: "Nos basamos en la regulación de dos procesos: el ritmo circadiano (reloj biológico) y la presión homeostática del sueño (acumulación de adenosina).",
    faq: [
      {
        question: "¿Cuántas horas necesito dormir realmente?",
        answer: "La mayoría de los adultos necesitan entre 7 y 9 horas, pero la calidad y la consistencia son más importantes que el número exacto."
      },
      {
        question: "¿Por qué me despierto cansado?",
        answer: "Puede deberse a la inercia del sueño (despertar en sueño profundo), baja calidad del sueño, apnea o desalineación circadiana."
      },
      {
        question: "¿Ayuda la melatonina?",
        answer: "Es útil para ajustar el reloj interno (jet lag), pero no debe usarse como un sedante diario a largo plazo sin supervisión."
      }
    ]
  },
  {
    slug: "terapia-de-frio",
    title: "Terapia de Frío",
    description: "Domina el frío para fortalecer tu sistema inmune, acelerar tu metabolismo y construir resiliencia mental.",
    icon: Thermometer,
    seoTitle: "Baños de Hielo y Crioterapia: Beneficios del Frío | Biohacking Lab",
    seoDescription: "Descubre los beneficios de la exposición al frío: quema de grasa, recuperación muscular y fortaleza mental.",
    intro: {
      heading: "Hormesis: Lo que no te mata te hace más fuerte",
      content: "La exposición deliberada al frío es uno de los estresores horméticos más potentes. Al someter al cuerpo a frío intenso por periodos cortos, desencadenas una cascada de respuestas adaptativas beneficiosas: vasoconstricción seguida de vasodilatación, liberación de noradrenalina y activación de la grasa parda (tejido adiposo marrón) que quema calorías para generar calor."
    },
    keyBenefits: [
      "Reducción rápida de la inflamación muscular.",
      "Aumento masivo de dopamina (hasta 250%) y mejora del ánimo.",
      "Activación metabólica y quema de grasa.",
      "Fortaleza mental y disciplina."
    ],
    scientificBasis: "La respuesta al choque frío activa el sistema nervioso simpático y libera proteínas de choque térmico (cold shock proteins) que reparan proteínas dañadas.",
    faq: [
      {
        question: "¿Cuándo es mejor tomar un baño de hielo?",
        answer: "Por la mañana es ideal para despertar y aprovechar el pico de dopamina. Evítalo justo después de entrenar fuerza si tu objetivo es la hipertrofia (puede reducir la señal de crecimiento)."
      },
      {
        question: "¿Cuánto tiempo debo estar dentro?",
        answer: "De 2 a 5 minutos a 10-15°C es suficiente para obtener la mayoría de los beneficios."
      },
      {
        question: "¿Puedo empezar solo con duchas frías?",
        answer: "¡Sí! Terminar tu ducha con 30-60 segundos de agua fría es un excelente punto de partida."
      }
    ]
  },
  {
    slug: "fitness",
    title: "Ejercicio Inteligente",
    description: "Entrena menos, gana más. Protocolos de alta eficiencia para fuerza, resistencia y longevidad.",
    icon: Dumbbell,
    seoTitle: "Entrenamiento Inteligente y HIT: Fitness para Longevidad | Biohacking Lab",
    seoDescription: "Menos tiempo, más resultados. Aprende sobre entrenamiento de alta intensidad, fuerza mínima efectiva y biohacking deportivo.",
    intro: {
      heading: "Eficacia sobre Volumen",
      content: "El ejercicio es la droga de longevidad más potente que existe. Sin embargo, más no siempre es mejor. El 'Ejercicio Inteligente' busca la Dosis Mínima Efectiva (MED) para estimular adaptaciones positivas sin causar desgaste excesivo, lesión o estrés crónico. Nos enfocamos en la calidad del movimiento, la intensidad adecuada y la recuperación prioritaria."
    },
    keyBenefits: [
      "Aumento de la masa muscular (órgano de longevidad).",
      "Mejora de la sensibilidad a la insulina y control glucémico.",
      "Salud cardiovascular y VO2 Max optimizado.",
      "Densidad ósea mejorada."
    ],
    scientificBasis: "Utilizamos principios de sobrecarga progresiva, entrenamiento de intervalos de alta intensidad (HIIT) y entrenamiento lento de fuerza (Super Slow) para máxima estimulación de fibras rápidas.",
    faq: [
      {
        question: "¿Es necesario ir al gimnasio todos los días?",
        answer: "No. Protocolos como HIT pueden requerir solo 1 o 2 sesiones intensas por semana."
      },
      {
        question: "¿Cardio o Pesas?",
        answer: "Ambos son cruciales, pero el entrenamiento de fuerza es innegociable para la longevidad a medida que envejecemos."
      },
      {
        question: "¿Qué es el VO2 Max?",
        answer: "Es la cantidad máxima de oxígeno que tu cuerpo puede usar. Es uno de los predictores más fuertes de esperanza de vida."
      }
    ]
  },
  {
    slug: "suplementacion",
    title: "Suplementación",
    description: "Llena los vacíos nutricionales y optimiza tu bioquímica con los micronutrientes correctos.",
    icon: Pill,
    seoTitle: "Guía de Suplementos Esenciales y Avanzados | Biohacking Lab",
    seoDescription: "Vitaminas, minerales y adaptógenos. Aprende qué suplementos realmente funcionan y cuáles son una pérdida de dinero.",
    intro: {
      heading: "Combustible de Precisión",
      content: "En un mundo con suelos empobrecidos y estilos de vida exigentes, la dieta a veces no es suficiente. La suplementación estratégica no reemplaza la comida real, pero asegura que tu cuerpo tenga todos los cofactores necesarios para funcionar al 100%. Desde vitaminas básicas (D3, Magnesio) hasta compuestos avanzados (NAD+, Péptidos), exploramos qué vale la pena tomar."
    },
    keyBenefits: [
      "Corrección de deficiencias nutricionales comunes.",
      "Soporte específico para objetivos (energía, sueño, inmunidad).",
      "Protección contra estresores ambientales.",
      "Optimización de procesos enzimáticos."
    ],
    scientificBasis: "Basado en bioquímica nutricional y estudios clínicos sobre biodisponibilidad y sinergia de nutrientes.",
    faq: [
      {
        question: "¿Son necesarios los suplementos si como bien?",
        answer: "Depende. Incluso dietas perfectas pueden carecer de magnesio o vitamina D debido a la vida moderna y la agricultura actual."
      },
      {
        question: "¿Cuáles son los 3 esenciales?",
        answer: "Para la mayoría: Magnesio, Omega-3 de alta calidad y Vitamina D3 (con K2)."
      },
      {
        question: "¿Los suplementos caducan?",
        answer: "Sí, y su potencia puede degradarse. Almacénalos en lugares frescos y oscuros."
      }
    ]
  },
  {
    slug: "hrv",
    title: "Variabilidad Cardíaca (HRV)",
    description: "Tu tablero de control interno. Entiende tu sistema nervioso y gestiona el estrés con datos reales.",
    icon: Heart,
    seoTitle: "HRV: Qué es la Variabilidad de la Frecuencia Cardíaca | Biohacking Lab",
    seoDescription: "La métrica más importante que no estás midiendo. Aprende a usar el HRV para gestionar el estrés y el entrenamiento.",
    intro: {
      heading: "La Voz de tu Sistema Nervioso",
      content: "La Variabilidad de la Frecuencia Cardíaca (HRV) es la variación de tiempo entre latidos del corazón. Curiosamente, un corazón sano no late como un metrónomo perfecto; tiene variabilidad. Una HRV alta indica un sistema nervioso parasimpático activo (descanso y digestión) y buena resiliencia al estrés. Una HRV baja señala estrés, fatiga o enfermedad inminente."
    },
    keyBenefits: [
      "Detección temprana de enfermedad o sobreentrenamiento.",
      "Gestión objetiva de los niveles de estrés diario.",
      "Biofeedback para entrenar la calma y la coherencia cardíaca.",
      "Decisiones informadas sobre cuándo entrenar duro y cuándo descansar."
    ],
    scientificBasis: "Es una medida directa del equilibrio entre el sistema nervioso simpático (lucha/huida) y parasimpático (descanso/reparación).",
    faq: [
      {
        question: "¿Qué es un buen número de HRV?",
        answer: "Es altamente individual y depende de la edad. Lo importante es tu tendencia personal, no compararte con otros."
      },
      {
        question: "¿Cómo mido mi HRV?",
        answer: "Dispositivos como Oura Ring, Whoop, Apple Watch o bandas pectorales Polar pueden medirlo con precisión."
      },
      {
        question: "¿Cómo aumento mi HRV?",
        answer: "Sueño de calidad, respiración profunda, ejercicio moderado y reducción del alcohol son las formas más efectivas."
      }
    ]
  },
  {
    slug: "ayuno",
    title: "Ayuno Intermitente",
    description: "Activa la farmacia interna de tu cuerpo. Limpieza celular, control de peso y claridad mental.",
    icon: Zap,
    seoTitle: "Guía de Ayuno Intermitente con Protocolos | Biohacking Lab",
    seoDescription: "Beneficios del ayuno, autofagia y protocolos (16/8, OMAD). Mejora tu salud metabólica y longevidad.",
    intro: {
      heading: "Comer menos a menudo, no menos",
      content: "El ayuno no es una dieta, es un patrón de alimentación. Al dar a tu sistema digestivo un descanso prolongado, permites que el cuerpo cambie de 'modo crecimiento' a 'modo reparación'. niveles de insulina bajan, y se activa la autofagia, un proceso donde las células reciclan componentes dañados y viejos, rejuveneciéndote desde dentro."
    },
    keyBenefits: [
      "Pérdida de grasa visceral eficiente.",
      "Mejora drástica de la sensibilidad a la insulina.",
      "Activación de la autofagia (limpieza celular).",
      "Claridad mental estable y liberación de tiempo."
    ],
    scientificBasis: "Se basa en la flexibilidad metabólica: la capacidad del cuerpo de cambiar eficientemente entre quemar glucosa y quemar grasa (cetonas) como combustible.",
    faq: [
      {
        question: "¿Puedo beber agua durante el ayuno?",
        answer: "Sí, agua, café negro y té (sin azúcar ni leche) están permitidos y no rompen el ayuno metabólico significativamente."
      },
      {
        question: "¿Perderé músculo?",
        answer: "No necesariamente. Si mantienes tu ingesta de proteínas y entrenamiento de fuerza, el ayuno preserva el músculo muy bien (hormona de crecimiento)."
      },
      {
        question: "¿Cuál es el mejor protocolo para empezar?",
        answer: "El 16/8 (ayunar 16 horas, comer en una ventana de 8 horas) es el más sostenible y popular."
      }
    ]
  }
]
