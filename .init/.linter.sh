#!/bin/bash
cd /home/kavia/workspace/code-generation/arogyasaarthi-90340-90351/arogyamitr_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

