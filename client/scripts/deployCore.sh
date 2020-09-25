#!/bin/bash
# ------------------------------------------------------------------
# [jseluy]  SCRIPT PARA SUBIR CAMBIOS DE FRONTEND
#			- Comprueba directorio de ejecución
#			- Construye la aplicación según el "flavor" indicado
#			- Copia y descomprime la app en el servidor indicado
#
# 2019-07-23
# ------------------------------------------------------------------

# ----- configuraciones

servidor=$1
flavor=$2
archivo=$3
directorio=$4

# ----- fin configuraciones


# Compruebo el directorio actual
current=${PWD##*/}

if [ "$current" != "client" ]; then
	printf "\n\tEjecutar el script desde la carpeta 'client'\n\n"
	exit 1
fi

cp -r ./flavor/$flavor/* ./public/

# Construyo la aplicación
REACT_APP_FLAVOR=$flavor yarn run build

# Compruebo ERRORES
return_val=$?

if [ ! "$return_val" -eq 0 ]; then
	printf "\n\tBUILD ERROR\n\n"
	exit 1
fi

cd build/
tar czf $archivo *

# Copio el archivo comprimido al servidor
printf "\nSubiendo archivo al servidor $servidor ...\n\n"
scp $archivo $servidor:/tmp

# Descomprimo los archivos en el servidor
printf "\nDescomprimiendo archivos en el servidor ...\n\n"
ssh -t $servidor \
	"rm -Rf /var/www/webusers/$directorio/webspace/* && \
	cd /var/www/webusers/$directorio/webspace/ && \
	cp /tmp/$archivo . && \
	tar xzf $archivo && \
	rm -f $archivo"

# Compruebo ERRORES
return_val=$?

if [ ! "$return_val" -eq 0 ]; then
	printf "\n\tERROR al copiar archivos\n\n"
	exit 1
else
	printf "\n\tSe actualizó correctamente la versión del Frontend $flavor\n\n"
fi
