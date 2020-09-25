#!/bin/bash
# ------------------------------------------------------------------
# [jseluy]  SCRIPT PARA SUBIR CAMBIOS DE FRONTEND
#			- Base a Producción
#
# 2020-03-30
# ------------------------------------------------------------------

# ----- configuraciones

servidor="mktinsiders-prd-2"
flavor="base"
archivo="reportes-prod.tar.gz"
directorio="reportes.agildataonline.com"

# ----- fin configuraciones

# Compruebo el directorio actual
current=${PWD##*/}

if [ "$current" != "client" ]; then
	printf "\n\tEjecutar el script desde la carpeta 'client'\n\n"
	exit 1
fi

# Ejecuto el script con los parámetros correspondientes
sh ./scripts/deployCore.sh $servidor $flavor $archivo $directorio
