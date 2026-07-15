#!/bin/bash
# limpiar.command — Libera memoria y limpia la caché del proyecto.
# Doble clic desde el Finder para ejecutarlo.

# Ir siempre a la carpeta donde está este script (aunque lo abras con doble clic)
cd "$(dirname "$0")" || exit 1

echo "=========================================="
echo "  Limpieza de Brew & Co"
echo "=========================================="
echo ""

# 1. Matar servidores de Next que hayan quedado colgados (procesos zombi)
echo "1) Cerrando servidores 'next dev' que hayan quedado abiertos..."
if pkill -f "next dev" 2>/dev/null; then
  echo "   -> Cerrados."
else
  echo "   -> No había ninguno. Bien."
fi
echo ""

# 2. Borrar la caché de desarrollo (se regenera sola al arrancar)
echo "2) Borrando la caché .next..."
if [ -d ".next" ]; then
  TAM=$(du -sh .next | cut -f1)
  rm -rf .next
  echo "   -> Liberado: $TAM"
else
  echo "   -> Ya estaba limpia."
fi
echo ""

# 3. Limpiar archivos basura .DS_Store del proyecto
echo "3) Limpiando archivos .DS_Store..."
find . -name ".DS_Store" -not -path "./node_modules/*" -delete 2>/dev/null
echo "   -> Listo."
echo ""

# 4. Mostrar quién está consumiendo más memoria ahora mismo
echo "4) Apps que más memoria usan ahora mismo:"
ps aux | sort -rk4 | head -6 | awk '{printf "   %5.1f%% RAM  %s\n", $4, $11}'
echo ""

echo "=========================================="
echo "  Listo. Ya puedes trabajar."
echo "  Puedes cerrar esta ventana."
echo "=========================================="
