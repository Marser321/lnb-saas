ACTÚA COMO: Arquitecto de Software Senior y Experto en UI/UX especializado en SaaS.

TU OBJETIVO: Vamos a construir una aplicación web progresiva (PWA) utilizando el siguiente stack tecnológico estricto (para asegurar compatibilidad con Antigravity):

Framework: Next.js 14+ (App Router).

Estilos: Tailwind CSS (Mobile-first).

Componentes: Shadcn/UI (usando Radix UI primitivos).

Iconos: Lucide React.

Gestión de Estado: React Hooks / Zustand (si es complejo).

LA MISIÓN (Contexto de Negocio): Estamos validando una idea de SaaS que soluciona un problema específico. El Problema es: [DESCRIBE EL DOLOR AQUÍ - Ej: Los dentistas pierden citas por no confirmar por WhatsApp] La Solución es: [DESCRIBE TU APP AQUÍ - Ej: Un dashboard simple donde cargan un CSV y envía recordatorios automáticos] El Usuario Final es: [Ej: Recepcionistas de clínicas dentales, poco técnicos].

TAREA INICIAL: No escribas código todavía. Primero, genera un "Plan de Arquitectura" que incluya:

Lista de las 3 funcionalidades principales (MVP).

Estructura de carpetas sugerida para Next.js.

Paleta de colores sugerida (moderna, limpia) y tipografía.

Un esquema paso a paso de cómo funcionará el flujo del usuario.

Espero tu confirmación y el plan.

FASE 2: El Constructor Visual (Vibe Coding / Frontend)
Objetivo: Generar la interfaz visual. Como mencionas en el informe, aquí importa la "supervisión".

Una vez que el agente te dé el plan y lo apruebes, usa este prompt:

Excelente plan. APROBADO.

Ahora, actúa como Desarrollador Frontend Especialista en Shadcn/UI. Vamos a construir la interfaz visual.

INSTRUCCIONES DE DISEÑO: Quiero que generes el código para la Página Principal (Dashboard).

Estilo: Minimalista, mucho espacio en blanco (whitespace), bordes redondeados (radius-md), sombras suaves. Que parezca un producto SaaS de alto nivel (tipo Linear o Vercel).

Estructura: Barra lateral de navegación (collapsible), Cabecera con perfil de usuario, y un área principal de contenido.

Mock Data: No conectes backend todavía. Usa datos falsos (hardcoded arrays) para que la UI se vea llena y funcional visualmente.

REQUISITO TÉCNICO:

Usa lucide-react para todos los iconos.

Asegúrate de que sea totalmente responsive (mobile y desktop).

Proporciona el código completo en un solo archivo o bloque si es posible, o indícame qué componentes crear primero.

¡Genera el código ahora!

FASE 3: El Lógico (Funcionalidad y Lógica)
Objetivo: Dar vida a la UI. Aquí aplicamos la sección del informe sobre "Conocimientos Básicos de Código" para conectar las piezas.

Usa este prompt cuando la UI ya se vea bien y quieras que los botones funcionen:

La UI se ve perfecta. Ahora vamos a agregar la lógica (Business Logic).

Necesito que implementes la funcionalidad para: [NOMBRE DE LA FUNCIÓN - Ej: El botón de "Subir CSV"].

REGLAS DE LÓGICA:

Estado: Crea los estados necesarios (useState) para manejar la entrada del usuario.

Validación: Si el usuario comete un error (ej: campo vacío), muestra un mensaje de error usando un componente Toast o Alert.

Simulación: Como no tenemos backend real aún, simula la operación con un setTimeout de 2 segundos y muestra un estado de "Cargando..." (Spinner) mientras procesa.

Feedback: Al finalizar, muestra un mensaje de éxito y actualiza la lista de datos visualmente.

Modifica el código anterior para integrar esta lógica. Dame el componente completo actualizado.

FASE 4: El Refinador (Iteración y Corrección de Errores)
Objetivo: Pulir el producto para el despliegue.

Si ves un error o algo no te gusta, usa este formato de "Corrección Agéntica":

CONTEXTO: He probado el código. ERROR DETECTADO: [Describe qué pasa - Ej: Cuando hago clic en el botón en móvil, el menú no se cierra]. COMPORTAMIENTO ESPERADO: [Describe qué debería pasar].

TAREA: Analiza el código actual, identifica por qué ocurre este conflicto en CSS/JS y reescribe solamente la función o el componente afectado con la solución aplicada. Explícame brevemente qué causaba el error para yo entenderlo.