#!/bin/bash
# ------------------------------------------------------------------
# [jseluy]  SCRIPT PARA SUBIR CAMBIOS DE FRONTEND
#			- Reseller a Staging
#
# 2019-07-23
# ------------------------------------------------------------------

# ----- configuraciones

servidor="mktinsiders-tst"
flavor="reseller"
archivo="reseller-stg.tar.gz"
directorio="staging.resellerclient.com"

# ----- fin configuraciones

# Compruebo el directorio actual
current=${PWD##*/}

if [ "$current" != "client" ]; then
	printf "\n\tEjecutar el script desde la carpeta 'client'\n\n"
	exit 1
fi

# Ejecuto el script con los parámetros correspondientes
sh ./scripts/deployCore.sh $servidor $flavor $archivo $directorio
